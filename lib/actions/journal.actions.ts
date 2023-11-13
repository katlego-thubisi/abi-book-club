"use server"

import { revalidatePath } from "next/cache";
import Entry from "../models/entry.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string,
    author: string,
    //Remeber to change communityId to type string;
    communityId: null,
    path: string,
}

export async function createEntry ({ text, author, communityId, path}: Params) {

    try {
        connectToDB();

        const createdEntry = await Entry.create({
            text,
            author,
            community: null,
        });
    
        // Update User model
        await User.findByIdAndUpdate(author, {
            $push: { entry: createdEntry._id }
          })
    
          revalidatePath(path);    
        
    } catch (error: any) {
        throw new Error(`Error creating entry: ${error.message}`)  
    }
   
}