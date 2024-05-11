import { handleSessionVote } from "@/lib/actions/bom.action";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface Props {
  queueId: string;
  bookSession: any;
  userId: string;
  handleView: (book: any) => void;
}

const BookSessionCard = ({
  bookSession,
  userId,
  queueId,
  handleView,
}: Props) => {
  const hasVoted = bookSession.votes.some((x: any) => x._id == userId);

  const pathname = usePathname();

  const handleVote = async (bookSessionId: string) => {
    await handleSessionVote(queueId, bookSessionId, userId, pathname);
  };

  return (
    <div className="flex flex-col items-center cursor-pointer relative">
      <div className="relative h-40 w-28">
        <img src={bookSession.bookId.cover} alt={bookSession.bookId.title} />
      </div>
      <div className="mt-2 w-40">
        <p
          className="text-center text-small-semibold lg:text-base-semibold 
    h-11 text-black dark:text-light-1 mt-2 
    overflow-hidden text-ellipsis"
        >
          {bookSession.bookId.title}
        </p>
        <p
          className="text-xs text-center 
    text-black dark:text-light-1"
        >
          {bookSession.bookId.authors[0]}
        </p>
        <div className="flex justify-around mt-2">
          <div className="flex gap-1">
            <div
              className="cursor-pointer"
              onClick={() => handleVote(bookSession.id)}
            >
              {hasVoted ? (
                <img src="/assets/heart-filled.svg" alt="heart" />
              ) : (
                <img src="/assets/heart-gray.svg" alt="heart" />
              )}
            </div>
            <p className="text-xs text-black dark:text-light-1">
              {bookSession.votes.length}
            </p>
          </div>
          <div className="flex">
            <div
              className="cursor-pointer"
              onClick={() => handleView(bookSession.bookId)}
            >
              <img src="/assets/eye.svg" alt="eye" width={25} height={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSessionCard;
