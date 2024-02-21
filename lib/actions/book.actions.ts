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

async function createBook(book: any) {
  try {
    connectToDB();

    const newBook = new Book(book);
    return await newBook.save();
  } catch (error) {
    throw new Error(`Failed to create book: ${error}`);
  }
}
