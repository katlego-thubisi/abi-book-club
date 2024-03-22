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
