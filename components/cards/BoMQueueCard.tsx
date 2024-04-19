import React from "react";
import Rating from "../custom-ui/RatingInput";

interface Props {
  queue: any;
}

const BoMQueueCard = ({ queue }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="hidden sm:grid sm:grid-cols-3 gap-4">
        {queue.bookSessions.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="relative h-40 w-28">
                <img src={item.bookId.cover} alt={item.bookId.title} />
              </div>
              <div className="w-full mt-4">
                <p
                  className="text-center text-small-semibold lg:text-base-semibold 
                h-11 text-black dark:text-light-1 mt-2 
                overflow-hidden text-ellipsis"
                >
                  {item.bookId.title}
                </p>
                {/* <p>{item.book.author}</p> */}
                <div className="flex justify-center gap-1">
                  <Rating
                    defaultRating={
                      item.bookId?.reviews?.reduce(
                        (totalRating: number, review: any) => {
                          return totalRating + review.rating;
                        },
                        0
                      ) / item.bookId?.reviews?.length
                    }
                  />
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
