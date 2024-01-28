import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="mt-10 flex flex-col justify-start gap-10">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
};

export default Loading;
