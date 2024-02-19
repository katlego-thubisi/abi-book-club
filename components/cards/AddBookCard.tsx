"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import BookshelfRating from "../forms/BookShelfRating";
import BookshelfType from "../forms/BookshelfType";
import BookshelfBook from "../forms/BookshelfBook";
import { updateUserBookshelf } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import Image from "next/image";

const AddBookCard = () => {
  return (
    <div
      className="  flex flex-col space-y-2 rounded-md p-2 cursor-pointer
        hover:bg-slate-600 hover:border-white  ease-in-out transition-all duration-300 dark:hover:bg-gray-700 
        dark:hover:border-gray-300 dark:hover:text-gray-300"
    >
      <div className="relative">
        <Image
          src={"/assets/add-circle.svg"}
          alt="Add book"
          height={96}
          width={96}
        />
      </div>
      <p className="text-center text-slate-700 dark:text-gray-300 font-semibold text-sm">
        Add book
      </p>
    </div>
  );
};

export default AddBookCard;
