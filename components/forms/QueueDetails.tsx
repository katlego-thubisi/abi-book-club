"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { IBomQueue } from "@/lib/types/bomQueue";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { fetchQueueDetailsByUserId } from "@/lib/actions/community.actions";
import BomQueue from "./BomQueue";
import BoMQueueCard from "../cards/BoMQueueCard";
import { ICommunity } from "@/lib/types/community";

interface Props {
  userId: string;
  _userId: string;
}

const QueueDetails = ({ _userId, userId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [queueList, setQueueList] = useState<IBomQueue[]>([]);
  const [queueModal, setQueueModal] = useState(false);
  const [communitiesFilters, setCommunitiesFilters] = useState([]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const router = useRouter();

  const handleAddQueue = () => {
    setQueueModal(true);
  };

  useEffect(() => {
    fetchQueue();
  }, [currentPage]);

  const fetchQueue = () => {
    setIsLoading(true);
    fetchQueueDetailsByUserId({
      userId: _userId,
      pageNumber: currentPage,
    })
      .then((response) => {
        console.log("Response", response);
        setCommunitiesFilters(response.communities);
        setQueueList(response.queues);
        setTotalPages(response.queuesTotalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user clublist", error);
      });
  };

  return (
    <section
      className="flex max-sm:flex-col gap-10 border border-solid
   border-gray-300-400 rounded-xl p-5 shadow-sm"
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-heading3-bold">Queues</h1>
        <p className="text-small-medium w-48">
          Manage all your book club queues in one place
        </p>
        <div className={`flex flex-col gap-4 `}>
          <p
            className={`${
              !showFilters && "hidden"
            } cursor-pointer text-center sm:hidden`}
            onClick={() => setShowFilters(false)}
          >
            Hide advanced filters
          </p>
          <p
            className={`${
              showFilters && "hidden"
            } cursor-pointer text-center sm:hidden`}
            onClick={() => setShowFilters(true)}
          >
            Show advanced filters
          </p>
          <p className="hidden sm:block text-black dark:text-light-1 text-sm">
            Filters
          </p>
          <div
            className={`${
              !showFilters ? "hidden" : "flex flex-row flex-wrap items-center"
            } sm:flex sm:flex-col sm:items-start gap-4`}
          >
            {communitiesFilters &&
              communitiesFilters.length > 0 &&
              communitiesFilters.map((community: ICommunity) => (
                <div
                  className="flex items-center space-x-2"
                  key={community?._id}
                >
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {community?.name}
                  </label>
                </div>
              ))}

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Draft
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Currently voting
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Closed
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-6">
        <Button className="bg-red-800" onClick={() => handleAddQueue()}>
          Add queue
        </Button>

        {/* Loop through books here */}
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
          queueList &&
          queueList.length > 0 &&
          queueList.map((queue) => (
            <BoMQueueCard
              key={queue.id}
              queue={queue}
              userId={_userId}
              reloadQueue={() => fetchQueue()}
            />
          ))}

        {queueModal && (
          <BomQueue
            open={queueModal}
            userId={_userId}
            handleClose={() => setQueueModal(false)}
          />
        )}

        {!isLoading && queueList && queueList.length > 0 && (
          <div className="flex items-center justify-center">
            <Button className="text-center cursor-pointer w-auto p-6">
              Publish
            </Button>
          </div>
        )}

        {queueList.length !== 0 && (
          <div className="flex items-center justify-between">
            <div className="max-sm:hidden"></div>
            <div className="flex items-center gap-7">
              <Button
                className="cursor-pointer"
                disabled={currentPage - 1 <= 0}
                onClick={() => setPage(currentPage - 1)}
              >
                {"<"}
              </Button>
              <p>
                {currentPage} of {totalPages} page(s)
              </p>
              <Button
                className="cursor-pointer"
                disabled={currentPage == totalPages}
                onClick={() => setPage(currentPage + 1)}
              >
                {">"}
              </Button>
            </div>
            <div className="flex gap-3">
              {pages.map(
                (page, i) =>
                  i < 3 && (
                    <Button
                      key={page}
                      className={`${
                        currentPage === page
                          ? "bg-red-800 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                      onClick={() => setPage(page)}
                    >
                      {page}
                    </Button>
                  )
              )}

              {totalPages > 3 && (
                <div className="flex gap-2">
                  <span>...</span>
                  <Button className="bg-gray-200 text-black">
                    {totalPages}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QueueDetails;
