import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const items = [1, 2, 3, 4, 5, 6, 7, 8];

const Loading = () => {
  return (
    <div className="flex flex-col">
      <h1 className="head-text text-black dark:text-white leading-none mb-1">
        Search For
        <br />
        Your Favorite
      </h1>
      <h1 className="head-text cursive">Creators</h1>
      <img
        src="\assets\underline.png"
        alt="Text Underline"
        width="150px"
        height="10px"
        className="underline"
      ></img>
      <div className="mt-10 flex flex-col gap-5">
        {items.map((item: any) => (
          <article className="activity-card justify-between items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-72" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="relative h-8 w-20" />
          </article>
        ))}
      </div>
    </div>
  );
};

export default Loading;
