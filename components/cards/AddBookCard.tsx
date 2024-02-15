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
import BookshelfRating from "../forms/BookShelfRating";
import BookshelfType from "../forms/BookshelfType";
import BookshelfBook from "../forms/BookshelfBook";
import { set } from "mongoose";

const AddBookCard = () => {
  const [open, setOpen] = useState(false);

  const [bookshelfItem, setBookshelfItem] = useState<any>(null);

  const [step, setStep] = useState(1);

  const handClose = (value: any) => {
    setOpen(value);
    !value && setStep(1);
  };

  const handleBookSelection = (book: any) => {
    setBookshelfItem({
      ...bookshelfItem,
      book: book,
    });

    setStep(2);
  };

  const handleCategorySelection = (category: any) => {
    setBookshelfItem({
      ...bookshelfItem,
      category: category,
    });

    if (category === "toRead") {
      handleDataSubmit();

      return;
    }

    setStep(3);
  };

  const handleReviewCreation = (reviewObject: any) => {
    setBookshelfItem({
      ...bookshelfItem,
      review: reviewObject,
    });

    handleDataSubmit();
  };

  const handleDataSubmit = () => {
    //Save the object accordingly.
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handClose}>
      <DialogTrigger asChild>
        <p>AddBookCard</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base-semibold  text-slate-700 dark:text-gray-300">
            {step === 1 && "Add book"}
            {step === 2 && "Add category"}
            {step === 3 && "Add rating"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 &&
              `Enter book details. Click save when you're done to add book to your
            shelf.`}
            {step === 2 && `Select the category for the book.`}
            {step === 3 && `Rate the book and add a review.`}
          </DialogDescription>
        </DialogHeader>
        {step === 1 && (
          <BookshelfBook book={bookshelfItem} onSubmit={handleBookSelection} />
        )}
        {step === 2 && (
          <BookshelfType
            back={() => setStep(1)}
            onSubmit={handleCategorySelection}
          />
        )}
        {step === 3 && (
          <BookshelfRating
            back={() => setStep(2)}
            onSubmit={handleReviewCreation}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddBookCard;
