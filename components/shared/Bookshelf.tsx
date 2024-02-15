import React from "react";
import BookCard from "../cards/BookCard";
import AddBookCard from "../cards/AddBookCard";

interface Props {
  shelf:
    | [
        {
          id: string;
          title: string;
          blurb: string;
          author: string;
          cover: string;
        },
      ]
    | [];
}

const Bookshelf = ({ shelf }: Props) => {
  return (
    <div className="mt-9 flex flex-wrap gap-4">
      {shelf.length === 0 ? (
        <AddBookCard />
      ) : (
        shelf.map((book: any) => <BookCard key={book.id} book={book} />)
      )}
    </div>
  );
};

export default Bookshelf;
