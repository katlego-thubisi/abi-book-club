import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const items = [1, 2, 3, 4];

const loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col justify-start">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="relative h-20 w-20 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-2 w-10" />
              <Skeleton className="h-2 w-10" />
            </div>
          </div>
          <div>
            <Skeleton className="h-6 w-10" />
          </div>
        </div>
        <div className="mt-6 w-full">
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="mt-6">
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="mt-9 flex flex-col gap-10">
        {items.map((item: any) => (
          <div
            className={`flex w-full flex-col rounded-xl parent-text bg-gray-100 dark:bg-dark-2 p-7 `}
          >
            <div className="flex items-start justify-between">
              <div className="flex w-full flex-1 flex-row gap-4">
                <div className="flex flex-col items-center">
                  <Skeleton className="relative h-11 w-11 rounded-full" />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Skeleton className="h-2 w-10" />
                  <div className="relative flex flex-wrap gap-2  justify-start w-full">
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-2 w-8" />
            </div>
          </div>
        ))}
        ;
      </div>
    </section>
  );
};

export default loading;
