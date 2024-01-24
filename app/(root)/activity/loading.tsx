import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const items = [1, 2, 3, 4, 5, 6, 7, 8];

const Loading = () => {
  return (
    <div>
      <h1 className="head-text mb-10 text-black dark:text-white">Activity</h1>
      <div className="mt-10 flex flex-col gap-5">
        {items.map((item: any) => (
          <article className="activity-card justify-between items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-80" />
            </div>
            <Skeleton className="relative h-4 w-10" />
          </article>
        ))}
      </div>
    </div>
  );
};

export default Loading;
