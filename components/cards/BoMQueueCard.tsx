"use client";

import React, { useState } from "react";
import Rating from "../custom-ui/RatingInput";
import { handleSessionVote } from "@/lib/actions/bom.action";

interface Props {
  queue: any;
  userId: string;
}

const BoMQueueCard = ({ queue, userId }: Props) => {
  const [showView, setShowView] = useState(false);

  const handleVote = async (bookSessionId: string) => {
    await handleSessionVote(queue.id, bookSessionId, userId);
  };

  const handleView = () => {
    console.log("Viewing book session");
  };

  return (
    <div className="flex flex-col">
      <div className="hidden sm:grid sm:grid-cols-3 gap-12">
        {queue.bookSessions.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer relative"
            >
              <div className="relative h-40 w-28">
                <img src={item.bookId.cover} alt={item.bookId.title} />
              </div>
              <div className="mt-2 w-40">
                <p
                  className="text-center text-small-semibold lg:text-base-semibold 
                h-11 text-black dark:text-light-1 mt-2 
                overflow-hidden text-ellipsis"
                >
                  {item.bookId.title}
                </p>
                <p
                  className="text-xs text-center 
                text-black dark:text-light-1"
                >
                  {item.bookId.authors[0]}
                </p>
                <div className="flex justify-around mt-2">
                  <div className="flex gap-1">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleVote(item.id)}
                    >
                      <img src="/assets/heart-gray.svg" alt="heart" />
                    </div>
                    <p className="text-xs text-black dark:text-light-1">
                      {item.votes.length}
                    </p>
                  </div>
                  <div className="flex">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleView()}
                    >
                      <img
                        src="/assets/eye.svg"
                        alt="eye"
                        width={25}
                        height={25}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div></div>
      </div>
    </div>
  );
};

export default BoMQueueCard;
