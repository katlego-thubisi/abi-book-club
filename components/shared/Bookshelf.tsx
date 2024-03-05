"use client";

import React, { useState } from "react";
import BookCard from "../cards/BookCard";
import AddBookCard from "../cards/AddBookCard";
import BookshelfItem from "../forms/BookshelfItem";
import { removeUserBookshelf } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import BookshelfItemView from "../cards/BookshelfItemView";

interface Props {
  shelf:
    | [
        {
          id: string;
          title: string;
          subtitle: string;
          authors: string[];
          cover: string;
        },
      ]
    | [];
  userId: string;
  isOwner: boolean;
}

const Bookshelf = ({ shelf, userId, isOwner }: Props) => {
  const [currentShelfItem, setShelfItem] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  // const isShelfOwner = userId === "user.id";

  const pathname = usePathname();

  const handleSelectItem = (shelfItem: any) => {
    setShelfItem(shelfItem);
    setOpen(true);
  };

  const handleViewItem = (shelfItem: any) => {
    setShelfItem(shelfItem);
    setViewOpen(true);
  };

  const handleDeleteItem = async (shelfItem: any) => {
    // Before deleting, we need to check if the book is in the user's shelf
    await removeUserBookshelf(pathname, shelfItem.id, userId);
  };

  const handleClose = () => {
    setOpen(false);
    setShelfItem(null);
  };
  return (
    <div className="mt-9">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-7">
        {shelf.map((shelfItem: any) => (
          <BookCard
            handleSelectItem={() => handleSelectItem(shelfItem)}
            handleDeleteItem={() => handleDeleteItem(shelfItem)}
            handleViewItem={() => handleViewItem(shelfItem)}
            key={shelfItem.id}
            book={shelfItem.bookId}
            review={shelfItem.bookReviewId}
            isOwner={isOwner}
          />
        ))}
      </div>

      {open && (
        <BookshelfItem
          open={open}
          handleClose={() => handleClose()}
          shelfItem={{
            ...currentShelfItem,
            book: currentShelfItem?.bookId,
            review: currentShelfItem?.bookReviewId,
          }}
          userId={userId}
        />
      )}

      {viewOpen && (
        <BookshelfItemView
          open={viewOpen}
          handleClose={() => setViewOpen(false)}
          shelfItem={{
            ...currentShelfItem,
            book: currentShelfItem?.bookId,
            review: currentShelfItem?.bookReviewId,
          }}
        />
      )}
      {isOwner && (
        <AddBookCard handleSelectItem={() => handleSelectItem(null)} />
      )}
    </div>
  );
};

export default Bookshelf;
