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

interface Props {
  userId: string;
}

const AddBookCard = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);

  const [bookshelfItem, setBookshelfItem] = useState<any>(null);

  const [step, setStep] = useState(1);

  const pathname = usePathname();

  const handClose = (value: any) => {
    setOpen(value);
    !value && setStep(1);
  };

  const handleBookSelection = (book: any) => {
    console.log("Set Book", book);
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
  };

  const handleReviewCreation = (reviewObject: any) => {
    setBookshelfItem({
      ...bookshelfItem,
      review: reviewObject,
    });

    handleDataSubmit();
  };

  const handleDataSubmit = async () => {
    //Save the object accordingly.
    await updateUserBookshelf(bookshelfItem, userId, pathname);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setBookshelfItem(null);
      setStep(1);
    }
  }, [open]);

  useEffect(() => {
    if (bookshelfItem?.category === "toRead") {
      handleDataSubmit();
    } else if (step === 2) {
      setStep(3);
    }
  }, [bookshelfItem?.category]);

  return (
    <Dialog open={open} onOpenChange={handClose}>
      <DialogTrigger asChild>
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
          <BookshelfBook
            book={bookshelfItem?.book}
            onSubmit={handleBookSelection}
          />
        )}
        {step === 2 && (
          <BookshelfType
            back={() => setStep(1)}
            category={bookshelfItem?.category}
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
