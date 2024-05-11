"use client";

import React, { useState } from "react";
import BookSessionCard from "./BookSessionCard";
import BookView from "./BookView";

interface Props {
  queue: any;
  userId: string;
}

const BoMQueueCard = ({ queue, userId }: Props) => {
  //Check if the current user has voted for the book session
  const [showView, setShowView] = useState(false);
  const [currentBook, setBook] = useState(null);

  const handleSetView = (book: any) => {
    setBook(book);
    setShowView(true);
  };

  const handleCloseView = () => {
    setShowView(false);
    setBook(null);
  };

  return (
    <div className="flex flex-col">
      <div className="hidden sm:grid sm:grid-cols-3 gap-12">
        {queue.bookSessions.map((item: any, index: number) => {
          return (
            <BookSessionCard
              key={index}
              bookSession={item}
              userId={userId}
              queueId={queue.id}
              handleView={handleSetView}
            />
          );
        })}
        <BookView
          open={showView}
          book={currentBook}
          handleClose={handleCloseView}
        />
      </div>
    </div>
  );
};

export default BoMQueueCard;
