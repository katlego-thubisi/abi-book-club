"use client";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import BookshelfItem from "../forms/BookshelfItem";

const AddBookCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p>AddBookCard</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base-semibold  text-slate-700 dark:text-gray-300">
            Add book
          </DialogTitle>
          <DialogDescription>
            Enter book details. Click save when you're done to add book to your
            shelf.
          </DialogDescription>
        </DialogHeader>
        <BookshelfItem book={undefined} />
      </DialogContent>
    </Dialog>
  );
};

export default AddBookCard;
