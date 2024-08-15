"use client";

import React, { useState } from "react";
import BookSessionCard from "./BookSessionCard";
import BookView from "./BookView";
import { IBomQueue } from "@/lib/types/bomQueue";
import BookshelfBook from "../forms/BookshelfBook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Props {
  queue: IBomQueue;
  userId: string;
}

const BoMQueueCard = ({ queue, userId }: Props) => {
  //Check if the current user has voted for the book session
  const [showView, setShowView] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [currentBook, setBook] = useState(undefined);

  const handleBookChangeView = (book: any) => {
    setBook(book);
    setShowAdd(true);
  };

  const handleCloseBookChange = () => {
    setShowAdd(false);
    setBook(undefined);
  };

  const handleSetView = (book: any) => {
    setBook(book);
    setShowView(true);
  };

  const handleCloseView = () => {
    setShowView(false);
    setBook(undefined);
  };

  const onSubmitChangeBook = (book: any) => {
    console.log("We are changing book from!");
    console.log(currentBook);
    console.log("TO!");
    console.log(book);
    //update the bomQueue with the new book.
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 justify-center">
        <p>
          {queue.startDate
            ? new Date(queue.startDate).toDateString()
            : "Select start date"}
        </p>
        <p> to </p>
        <p>
          {queue.endDate
            ? new Date(queue.endDate).toDateString()
            : "Select end date"}
        </p>
      </div>
      <div
        className="flex flex-col overflow-hidden relative 
      sm:grid sm:grid-cols-3 gap-12 p-8"
      >
        <div
          className="absolute flex shadow-md items-center top-4 -right-4
         bg-purple-300 h-4 w-20 z-50 m-auto rotate-45"
        >
          <p className="text-white text-subtle-medium  text-center w-full">
            {queue.status}
          </p>
        </div>
        <div
          className="absolute top-0 left-0 z-50 
        rounded-full h-14 w-14  bg-white"
        >
          <img
            src={queue.communityId?.image}
            alt={queue.communityId?.id}
            className="object-cover rounded-full h-14 w-14"
          />
        </div>
        {queue.bookSessions.map((item: any, index: number) => {
          return (
            <BookSessionCard
              key={index}
              bookSession={item}
              userId={userId}
              queueId={queue.id}
              handleView={handleSetView}
              handleAdd={(book: any) => handleBookChangeView(book)}
            />
          );
        })}

        <BookView
          open={showView}
          book={currentBook}
          handleClose={handleCloseView}
        />

        <Dialog open={showAdd} onOpenChange={handleCloseBookChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Queue</DialogTitle>
              <DialogDescription>
                Create a queue for members of your club to pick a book of the
                month
              </DialogDescription>
            </DialogHeader>
            <BookshelfBook
              book={currentBook}
              back={() => setShowAdd(false)}
              onSubmit={(book) => onSubmitChangeBook(book)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BoMQueueCard;
