"use server";

import { revalidatePath } from "next/cache";
import Entry from "../models/entry.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  //Remeber to change communityId to type string;
  communityId: null;
  path: string;
}

export async function createEntry({ text, author, communityId, path }: Params) {
  try {
    connectToDB();

    const createdEntry = await Entry.create({
      text,
      author,
      community: null,
    });

    // Update journal model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdEntry._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating entry: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
  const postsQuery = Entry.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    //.populate({
    //  path: "community",
    // model: Community,
    //})
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  const totalPostsCount = await Entry.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

export async function fetchEntryById(id: string) {
  connectToDB();

  try {
    //TODO: Populate community
    const entry = await Entry.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Entry,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentID image",
            },
          },
        ],
      })
      .exec();

    return entry;
  } catch (error: any) {
    throw new Error(`Error fetching entry: ${error.message}`);
  }
}

export async function addCommentToEntry(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  try {
    //Find the original thread by id

    const originalEntry = await Entry.findById(threadId);

    if (!originalEntry) {
      throw new Error(`Entry not found`);
    }

    //Create a new entry with comment

    const commentEntry = new Entry({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    //Save new entry

    const savedCommentEntry = await commentEntry.save();

    originalEntry.children.push(savedCommentEntry._id);

    //Save original thread
    await originalEntry.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to entry: ${error.message}`);
  }
}
