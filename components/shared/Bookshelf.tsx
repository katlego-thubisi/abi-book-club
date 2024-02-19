"use client";

import React, { useState } from "react";
import BookCard from "../cards/BookCard";
import AddBookCard from "../cards/AddBookCard";
import { Dialog } from "../ui/dialog";
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

  return (
    <div className="mt-9 flex flex-wrap gap-4">
      {shelf.length === 0 ? (
        <AddBookCard />
      ) : (
        <div className="flex flex-wrap gap-2">
          {shelf.map((shelfItem: any) => (
            <BookCard key={shelfItem.id} book={shelfItem.bookId} />
          ))}

          <AddBookCard />
        </div>
      )}
      <BookshelfItem shelfItem={currentShelfItem} userId={userId} />
    </div>
  );
};

export default Bookshelf;
