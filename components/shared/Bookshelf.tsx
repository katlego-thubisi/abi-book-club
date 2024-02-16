import React from "react";
import BookCard from "../cards/BookCard";
import AddBookCard from "../cards/AddBookCard";

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
  console.log("Zee shelf", shelf);
  return (
    <div className="mt-9 flex flex-wrap gap-4">
      {shelf.length === 0 ? (
        <AddBookCard userId={userId} />
      ) : (
        <div className="flex flex-wrap gap-2">
          {shelf.map((shelfItem: any) => (
            <BookCard key={shelfItem.id} book={shelfItem.bookId} />
          ))}
          <AddBookCard userId={userId} />
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
