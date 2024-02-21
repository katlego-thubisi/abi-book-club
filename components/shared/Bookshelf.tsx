"use client";

import React, { useState } from "react";
import BookCard from "../cards/BookCard";
import AddBookCard from "../cards/AddBookCard";
import BookshelfItem from "../forms/BookshelfItem";

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
}

const Bookshelf = ({ shelf, userId }: Props) => {
  const [currentShelfItem, setShelfItem] = useState<any>(null);

  const [open, setOpen] = useState(false);

  const handleSelectItem = (shelfItem: any) => {
    setShelfItem(shelfItem);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShelfItem(null);
  };
  return (
    <div className="mt-9 flex flex-wrap gap-4">
      {shelf.length === 0 ? (
        <AddBookCard handleSelectItem={() => handleSelectItem(null)} />
      ) : (
        <div className="flex flex-wrap gap-2">
          {shelf.map((shelfItem: any) => (
            <BookCard
              handleSelectItem={() => handleSelectItem(shelfItem)}
              key={shelfItem.id}
              book={shelfItem.bookId}
            />
          ))}

          <AddBookCard handleSelectItem={() => handleSelectItem(null)} />
        </div>
      )}
      {open && (
        <BookshelfItem
          open={open}
          handleClose={() => handleClose()}
          shelfItem={{ ...currentShelfItem, book: currentShelfItem?.bookId }}
          userId={userId}
        />
      )}
    </div>
  );
};

export default Bookshelf;
