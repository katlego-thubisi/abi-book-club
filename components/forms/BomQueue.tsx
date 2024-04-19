"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import BomQueueSelection from "./BomQueueSelection";
import GoogleBookSearch from "../custom-ui/GoogleBookSearch";
import BookshelfBook from "./BookshelfBook";
import BomQueueSchedule from "./BomQueueSchedule";
import { addBookQueueToCommunity } from "@/lib/actions/community.actions";

interface Props {
  open: boolean;
  communityId: any;
  handleClose: () => void;
}

const BomQueue = ({ open, communityId, handleClose }: Props) => {
  //   const [open, setOpen] = useState(false);

  const [currentQueue, setCurrentQueue] = useState<any>([null, null, null]);
  const [votingDate, setVotingDate] = React.useState<any | undefined>({
    from: null,
    to: null,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentView, setCurrentView] = useState<any>("queue");

  const beforeClose = () => {
    handleClose();
  };

  const handleAddToQueue = (index: number) => {
    setSelectedIndex(index);
    setCurrentView("add");
  };

  const handleBookSelection = (book: any) => {
    const newQueue = currentQueue;
    newQueue[selectedIndex] = book;
    setCurrentQueue(newQueue);
    setCurrentView("queue");
  };

  const handleSubmitQueue = () => {
    // create new queue move to next step
    setCurrentView("schedule");
  };

  const handleSubmitSchedule = async (startDate: Date, endDate: Date) => {
    // create new queue or update schedule if existing
    setVotingDate({ from: startDate, to: endDate });

    await addBookQueueToCommunity(
      communityId,
      currentQueue,
      startDate,
      endDate,
      "/"
    );
  };

  return (
    <Dialog open={open} onOpenChange={beforeClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Queue</DialogTitle>
          <DialogDescription>
            Create a queue for members of your club to pick a book of the month
          </DialogDescription>
        </DialogHeader>
        {currentView === "queue" && (
          <BomQueueSelection
            currentQueue={currentQueue}
            handleAddQueue={(index) => handleAddToQueue(index)}
            next={() => handleSubmitQueue()}
          />
        )}

        {currentView === "schedule" && (
          <BomQueueSchedule
            next={async (startDate, endDate) =>
              await handleSubmitSchedule(startDate, endDate)
            }
          />
        )}

        {currentView === "add" && (
          <BookshelfBook
            book={currentQueue[selectedIndex]}
            onSubmit={(book) => {
              handleBookSelection(book);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BomQueue;
