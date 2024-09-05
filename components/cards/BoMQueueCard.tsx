"use client";

import React, { useEffect, useState } from "react";
import BookSessionCard from "./BookSessionCard";
import BookView from "./BookView";
import { IBomQueue } from "@/lib/types/bomQueue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  deleteQueue,
  publishBookQueue,
  updateBookInQueue,
  updateQueueSchedule,
} from "@/lib/actions/community.actions";
import { IBookSession } from "@/lib/types/bookSession";
import BomQueueSchedule from "../forms/BomQueueSchedule";
import BookAdd from "../forms/BookAdd";
import { Button } from "../ui/button";
import ValidationModal from "../modals/validation-modal/validation-modal";

interface Props {
  queue: IBomQueue;
  userId: string;
  reloadQueue: () => void;
}

const BoMQueueCard = ({ queue, userId, reloadQueue }: Props) => {
  //Check if the current user has voted for the book session
  const [showView, setShowView] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [publishConfirm, setPublishConfirm] = useState(false);
  const [publishError, setPublishError] = useState(false);
  const [publishErrorMessage, setPublishErrorMessage] = useState("");
  const [publishErrorTitle, setPublishErrorTitle] = useState("");
  const [startReadingConfirm, setStartReadingConfirm] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [currentBook, setBook] = useState<IBookSession>();
  const [isLoading, setIsLoading] = useState(false);

  const handleBookChangeView = (book: any) => {
    setBook(book);
    setShowAdd(true);
  };

  const handleCloseBookChange = () => {
    setShowAdd(false);
  };

  const handleCloseDateView = () => {
    setShowDate(false);
  };

  const handleSetView = (book: any) => {
    console.log("Book to view", book);
    setBook(book);
    setShowView(true);
  };

  const handleCloseView = () => {
    setShowView(false);
  };

  const onSubmitChangeBook = async (book: any) => {
    //update the bomQueue with the new book.
    await updateBookInQueue(queue.id, currentBook?._id, book);

    //Close the dialog
    handleCloseBookChange();

    //Reload the shelf
    reloadQueue();
  };

  const onSubmitChangeSchedule = async (startDate: Date, endDate: Date) => {
    //update the bomQueue with the new book.
    await updateQueueSchedule(queue.id, startDate, endDate);

    //Close the dialog
    handleCloseDateView();

    //Reload the shelf
    reloadQueue();
  };

  const publishQueue = async () => {
    setIsLoading(true);

    await publishBookQueue(queue.id);

    reloadQueue();

    setIsLoading(false);
  };

  const publishValidation = () => {
    if (queue.startDate === null || queue.endDate === null) {
      //They have not set the dates
      setPublishError(true);
      setPublishErrorTitle("Please set the dates");
      setPublishErrorMessage(
        "You must set the start and end dates for the queue before publishing."
      );
      return;
    }

    if (queue.bookSessions.length !== 3) {
      //They have not selected all the books
      setPublishError(true);
      setPublishErrorTitle("Please select all the books");
      setPublishErrorMessage(
        "You must select all the books for the queue before publishing."
      );
      return;
    }

    if (queue.endDate < new Date()) {
      //They have no time to vote
      setPublishError(true);
      setPublishErrorTitle("Invalid voting period");
      setPublishErrorMessage(
        "Your club members will not have enough time to vote. Please select a valid date range."
      );
      return;
    }

    if (queue.startDate < new Date()) {
      queue.status = "Voting";
    }

    setPublishConfirm(true);
  };

  const startReadingValidation = () => {
    if (queue.startDate < new Date()) {
      queue.status = "Voting";
    }

    setPublishConfirm(true);
  };

  const handleStartReading = async () => {
    setIsLoading(true);

    await publishBookQueue(queue.id);

    reloadQueue();

    setIsLoading(false);
  };

  const handleDeleteQueue = async () => {
    setIsLoading(true);

    await deleteQueue(queue.id);

    reloadQueue();

    setIsLoading(false);
  };

  const deleteValidation = () => {
    if (queue.status != "Completed") {
      setDeleteConfirm(true);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center gap-1 justify-center"
        onClick={() => setShowDate(true)}
      >
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
        {showView && (
          <BookView
            open={showView}
            book={currentBook}
            handleClose={handleCloseView}
          />
        )}

        <Dialog open={showDate} onOpenChange={handleCloseDateView}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Queue</DialogTitle>
              <DialogDescription>
                Create a queue for members of your club to pick a book of the
                month
              </DialogDescription>
            </DialogHeader>
            <BomQueueSchedule
              schedule={{ from: queue.startDate, to: queue.endDate }}
              back={() => handleCloseBookChange()}
              next={async (startDate, endDate) =>
                await onSubmitChangeSchedule(startDate, endDate)
              }
            />
          </DialogContent>
        </Dialog>

        {showAdd && (
          <BookAdd
            open={showAdd}
            close={() => setShowAdd(false)}
            currentBook={currentBook?.bookId}
            onSubmitBook={(book: any) => onSubmitChangeBook(book)}
          />
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        {queue.status === "Voting" && (
          <Button
            onClick={() => startReadingValidation()}
            className="text-center cursor-pointer w-auto p-6"
          >
            Start reading
          </Button>
        )}
        {queue.status === "Draft" && (
          <Button
            onClick={() => publishValidation()}
            className="text-center cursor-pointer w-auto p-6"
          >
            Publish
          </Button>
        )}
        <Button
          onClick={() => deleteValidation()}
          className="text-center cursor-pointer w-auto p-6"
        >
          Delete
        </Button>
      </div>

      <ValidationModal
        open={startReadingConfirm}
        close={() => setStartReadingConfirm(false)}
        handleSubmit={() => handleStartReading()}
        validationDescription="This will start the reading period for the queue and end the voting period today"
        validationTitle="Are you absolutely sure?"
        cancellationText="Cancel"
        submitText="Start reading"
      />

      <ValidationModal
        open={deleteConfirm}
        close={() => setDeleteConfirm(false)}
        handleSubmit={() => handleDeleteQueue()}
        validationDescription="This will delete the queue and all its contents."
        validationTitle="Are you absolutely sure?"
        cancellationText="Cancel"
        submitText="Delete"
      />

      <ValidationModal
        open={publishConfirm}
        close={() => setPublishConfirm(false)}
        handleSubmit={() => publishQueue()}
        validationDescription={`This will publish the queue and notify all members of the voting period.`}
        validationTitle={`Are you absolutely sure?`}
        cancellationText={`Cancel`}
        submitText={`Continue`}
      />
      <ValidationModal
        open={publishError}
        close={() => setPublishError(false)}
        handleSubmit={() => setPublishError(false)}
        validationDescription={publishErrorMessage}
        validationTitle={publishErrorTitle}
        cancellationText={`Close`}
        submitText={`Ok`}
      />
    </div>
  );
};

export default BoMQueueCard;
