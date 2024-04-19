"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import BomQueue from "../forms/BomQueue";
import BoMQueueCard from "../cards/BoMQueueCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  currentUserId: any;
  communityId: any;
  queues: any[];
}

const BoMTab = ({ currentUserId, communityId, queues }: Props) => {
  const [month, setMonth] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  //Current book of the month
  const [currentBoM, setCurrentBoM] = useState<any>(null);
  //Current voting queue
  const [currentQueue, setCurrentQueue] = useState<any>(null);
  //Book of the month modal display
  const [bomModal, setBomModal] = useState(false);
  //Book of the month queue modal display
  const [queueModal, setQueueModal] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = monthNames[new Date().getMonth()];

  //Set current month display
  useEffect(() => {
    setMonth(currentMonth);
  }, [currentMonth]);

  const handleAddQueue = () => {
    setQueueModal(true);
  };

  console.log("Current queues", queues);

  return (
    <section className="mt-2">
      <div className="flex flex-col justify-center items-center  gap-6">
        {queues.map((queue: any, index: number) => (
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <div
                className={`flex flex-col relative py-2
              items-center w-full gap-4 rounded-xl 
              shadow-xl border-solid border-2  bg-transparent `}
              >
                <div className="absolute flex items-center top-1 right-5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-3 w-3 fill-sky-400 text-sky-400"
                  >
                    <path
                      d="M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-black dark:text-light-1">
                    {queue.status}
                  </span>
                </div>
                <h1
                  className="text-heading4-medium mt-2
            text-black dark:text-light-1"
                >
                  Book of {month}
                </h1>
                <div className="flex flex-col">
                  <BoMQueueCard queue={queue} />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={() => {
                  setDropdownOpen(false);
                  // handleViewItem();
                }}
              >
                View
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={() => {
                  setDropdownOpen(false);
                  // handleSelectItem();
                }}
              >
                Edit
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuLabel className="cursor-pointer text-red-600">
                    Delete
                  </DropdownMenuLabel>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete queue?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDropdownOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        // handleDeleteItem();
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
        <div className="flex flex-col justify-center items-center mt-10">
          <Button onClick={handleAddQueue}>Add queue</Button>
        </div>
      </div>

      {queueModal && (
        <BomQueue
          open={queueModal}
          communityId={communityId}
          handleClose={() => setQueueModal(false)}
        />
      )}
    </section>
  );
};

export default BoMTab;
