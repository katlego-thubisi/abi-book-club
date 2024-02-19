import React, { useEffect, useState } from "react";
import BookshelfBook from "./BookshelfBook";
import BookshelfType from "./BookshelfType";
import BookshelfRating from "./BookShelfRating";
import { usePathname } from "next/navigation";
import { updateUserBookshelf } from "@/lib/actions/user.actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Props {
  shelfItem: {
    id: string;
    title: string;
    subtitle: string;
    authors: string[];
    cover: string;
  } | null;
  userId: string;
}

const BookshelfItem = ({ shelfItem, userId }: Props) => {
  const [bookshelfItem, setBookshelfItem] = useState<any>(
    shelfItem ? shelfItem : null
  );

  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
  };

  const handleReviewCreation = (reviewObject: any) => {
    setBookshelfItem({
      ...bookshelfItem,
      review: reviewObject,
    });

    handleDataSubmit();
  };

  useEffect(() => {
    if (!open) {
      setBookshelfItem(null);
      setStep(1);
    }
  }, [open]);

  const handleDataSubmit = async () => {
    //Save the object accordingly.
    await updateUserBookshelf(bookshelfItem, userId, pathname);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handClose}>
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

export default BookshelfItem;
