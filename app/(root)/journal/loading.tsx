import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const items = [1, 2, 3, 4];

const Loading = () => {
  return (
    <div className="mt-9 flex flex-col gap-10">
      {items.map((item: any) => (
        <div
          className={`flex w-full flex-col rounded-xl parent-text bg-gray-100 dark:bg-dark-2 p-7 `}
        >
          <div className="flex items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-4">
              <div className="flex flex-col items-center">
                <Skeleton className="relative h-11 w-11 rounded-full" />

                <div className="thread-card_bar" />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-2 w-10" />
                <div className="relative flex gap-3 justify-start w-full">
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
            <Skeleton className="h-2 w-8" />
          </div>
        </div>
      ))}
      ;
    </div>
  );
};

export default Loading;
