"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import BomQu from "../models/bomQueue.model";
import Entry from "../models/entry.model";
import Community from "../models/community.model";
import Like from "../models/like.model";
import BomQueue from "../models/bomQueue.model";
import BookSession from "../models/bookSession.model";

interface BomQueue {
  startDate: Date;
  endDate: Date;
  bookSessions: any[];
  communityId: string;
  path: string;
}

export async function createBomQueue({
  startDate,
  endDate,
  bookSessions,
  communityId,
  path,
}: BomQueue) {
  try {
    connectToDB();

    const savedBookSessions = [];

    //Create all the book sessions
    for (const bookSession of bookSessions) {
      const newEntry = new BookSession({ ...bookSession, votes: [] });
      var response = await newEntry.save();
      savedBookSessions.push(response);
    }

    const newBomQueue = new BomQueue({
      startDate,
      endDate,
      bookSessions: savedBookSessions,
      communityId,
    });

    await newBomQueue.save();
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create queue: ${error.message}`);
  }
}

export async function handleSessionVote(
  queueId: string,
  bookSessionId: string,
  userId: string
) {
  try {
    connectToDB();

    //Get queue
    const queue = await BomQueue.findOne({ id: queueId });

    const bookSession = queue.bookSessions.find(
      (x: any) => x.bookId.id === bookSessionId
    );

    if (!bookSession) {
      throw new Error("Book session not found");
    }

    //Check if the user is already part of that book session
    if (bookSession.votes.includes(userId)) {
      //Remove the vote if the user is already part of the book session
      bookSession.votes = bookSession.votes.filter(
        (vote: any) => vote !== userId
      );
    } else {
      bookSession.votes.push(userId);
    }

    //Check if the user has already voted for a different book session in the same queue
    queue.bookSessions.map((x: any) => {
      if (x.bookId.id !== bookSessionId) {
        x.votes = x.votes.filter((vote: any) => vote !== userId);

        //Save the book session
        x.save();
      }
    });

    await bookSession.save();
  } catch (error: any) {
    throw new Error(`Failed to vote: ${error.message}`);
  }
}
