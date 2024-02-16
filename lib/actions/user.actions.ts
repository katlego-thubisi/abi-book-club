"use server";

import { FilterQuery, SortOrder, Schema } from "mongoose";
import { revalidatePath } from "next/cache";

import Community from "../models/community.model";
import Entry from "../models/entry.model";
import User from "../models/user.model";
import Like from "../models/like.model";
import { connectToDB } from "../mongoose";
import Address from "../models/address.model";
import Bookshelf from "../models/bookshelf.model";
import Book from "../models/book.model";
import BookReview from "../models/bookReview.model";

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId })
      .populate({
        path: "communities",
        model: Community,
      })
      .populate({
        path: "address",
        model: Address,
      })
      .populate({
        path: "bookshelf",
        model: Bookshelf,
        populate: {
          path: "bookId",
          model: Book,
        },
      });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  surname: string | undefined;
  bio: string;
  image: string;
  path: string;
  occupation: string | undefined;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
  occupation,
  surname,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        occupation,
        surname,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function removeUserAddress(
  addressId: string,
  userId: string,
  path: string
) {
  try {
    connectToDB();

    const user = await User.findOne({ id: userId });

    user.address.pull(addressId);

    await user.save();

    await Address.findOneAndDelete({ id: addressId });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to remove user address: ${error.message}`);
  }
}

export async function updateUserAddress(
  address: any,
  userId: string,
  path: string
) {
  try {
    connectToDB();

    //Check if we need to update the address of create the address

    if (address.id) {
      await Address.findOneAndUpdate({ id: address.id }, address, {
        upsert: true,
      });
    } else {
      const newAddress = new Address(address);
      await newAddress.save();

      const user = await User.findOne({ id: userId });

      user.address.push(newAddress._id);

      user.save();
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user address: ${error.message}`);
  }
}

export async function updateUserBookshelf(
  bookshelfItem: any,
  userId: string,
  path: string
) {
  try {
    connectToDB();

    //Check if we need to update the address of create the address

    if (bookshelfItem.id) {
      //Check if the book already exists in the db
      const response = await Book.findOne({ id: bookshelfItem.book.bookId });

      if (!response) {
        //If it doesn't exist, create it
        const newBook = new Book(bookshelfItem.book);
        const bookResponse = await newBook.save();

        //Check if the book review already exists in the db
        const bookReviewResponse = await BookReview.findOne({
          id: bookshelfItem?.bookReviewId,
        });

        //If it doesn't exist, create it
        if (!bookReviewResponse) {
          const newReview = new BookReview(bookshelfItem.bookReview);
          const reviewResponse = await newReview.save();

          //Upadte the bookshelf item
          await Bookshelf.findOneAndUpdate(
            { id: bookshelfItem.id },
            {
              bookId: bookResponse,
              bookReviewId: reviewResponse,
              ...bookshelfItem,
            },
            {
              upsert: true,
            }
          );
        }
      }
    } else {
      //Check if the book already exists in the db
      const response = await Book.findOne({
        bookId: bookshelfItem.book.bookId,
      });

      if (!response) {
        //If it doesn't exist, create it
        const newBook = new Book(bookshelfItem.book);
        const bookResponse = await newBook.save();

        const newBookshelf = new Bookshelf({
          bookId: bookResponse._id,
          ...bookshelfItem,
        });

        await newBookshelf.save();

        const user = await User.findOne({ id: userId });

        user.bookshelf.push(newBookshelf._id);
        user.save();
      } else {
        const newBookshelf = new Bookshelf({
          bookId: response._id,
          ...bookshelfItem,
        });

        await newBookshelf.save();

        const user = await User.findOne({ id: userId });

        user.bookshelf.push(newBookshelf._id);
        await user.save();
      }
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user bookshelf: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      options: { sort: { createdAt: -1 } }, // Sort threads by createdAt field in descending order
      model: Entry,
      populate: [
        {
          path: "likes", // Populate the likes field
          model: Like,
        },
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "children",
          model: Entry,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

export async function fetchUserCommunities(userId: string) {
  try {
    connectToDB();

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Entry,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "children",
          model: Entry,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching user communitties:", error);
    throw error;
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, // Exclude the current user from the results.
    };

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();

    // Find all threads created by the user
    const userThreads = await Entry.find({ author: userId }).populate({
      path: "likes",
      model: Like,
      populate: {
        path: "user",
        model: User,
        select: "name image _id",
      },
    });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies = await Entry.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    const likes = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.likes);
    }, []);

    const repliesWithType = replies.map((reply) => ({
      ...reply.toObject(),
      type: "reply",
    }));
    const likesWithType = likes.map((like: any) => ({
      ...like.toObject(),
      type: "like",
    }));

    return [...repliesWithType, ...likesWithType];
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}

//Write a function to find a user by their username
export async function findDuplicateUserByUsername(
  username: string,
  userId: any
) {
  try {
    connectToDB();

    // Create an initial query object to filter users.
    let query: FilterQuery<typeof User> = {
      username: username,
    };

    userId && userId.trim() !== "" ? (query.id = { $ne: userId }) : null;

    const userDuplicate = await User.findOne(query);
    const communityDuplicate = await Community.findOne({ username: username });

    return userDuplicate || communityDuplicate;
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}
