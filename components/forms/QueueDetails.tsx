"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

const QueueDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleProfileVisibility = async () => {
    setIsLoading(true);
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
        <div className="flex flex-col gap-4">
          <p className="text-black dark:text-light-1 text-sm">Filters</p>
          <div className="flex flex-col gap-4">
            {/* <Input
              type="text"
              placeholder="Search for books"
              onChange={(event) => console.log(event.target.value)}
              className="account-form_input"
            /> */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Club1
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Club2
              </label>
            </div>
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
        <Button className="bg-red-800" onClick={toggleProfileVisibility}>
          Add queue
        </Button>
        <div className="grid grid-cols-3 max-sm:hidden gap-12">
          {/* Loop through books here */}
          <div className="flex flex-col items-center cursor-pointer relative">
            <div className="relative h-40 w-28">
              <img src="/assets/no-cover.jpg" alt="book cover" />
            </div>
            <div className="mt-2 w-40">
              <p
                className="text-center text-small-semibold lg:text-base-semibold
               h-11 text-black dark:text-light-1 mt-2 
                overflow-hidden text-ellipsis"
              >
                {" "}
                Book name
              </p>
              <p
                className="text-xs text-center 
    text-black dark:text-light-1"
              >
                Juicy Jefferson
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center cursor-pointer relative">
            <div className="relative h-40 w-28">
              <img src="/assets/no-cover.jpg" alt="book cover" />
            </div>
            <div className="mt-2 w-40">
              <p
                className="text-center text-small-semibold lg:text-base-semibold
               h-11 text-black dark:text-light-1 mt-2 
                overflow-hidden text-ellipsis"
              >
                {" "}
                Book name
              </p>
              <p
                className="text-xs text-center 
    text-black dark:text-light-1"
              >
                Juicy Jefferson
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center cursor-pointer relative">
            <div className="relative h-40 w-28">
              <img src="/assets/no-cover.jpg" alt="book cover" />
            </div>
            <div className="mt-2 w-40">
              <p
                className="text-center text-small-semibold lg:text-base-semibold
               h-11 text-black dark:text-light-1 mt-2 
                overflow-hidden text-ellipsis"
              >
                {" "}
                Book name
              </p>
              <p
                className="text-xs text-center 
    text-black dark:text-light-1"
              >
                Juicy Jefferson
              </p>
            </div>
          </div>
        </div>
        <div className="hidden max-sm:flex flex-col ">
          <div className="flex gap-5">
            <div className="relative overflow-hidden h-28 w-16">
              <img
                src="/assets/no-cover.jpg"
                alt="book cover"
                className="h-36 w-16"
              />
            </div>
            <div>
              <p
                className="text-base-semibold
                 h-11 text-black dark:text-light-1 mt-2 
                    overflow-hidden text-ellipsis"
              >
                {" "}
                Book name
              </p>
              <p className="text-xs">Juicy Jefferson</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="relative overflow-hidden h-28 w-16">
              <img
                src="/assets/no-cover.jpg"
                alt="book cover"
                className="h-36 w-16"
              />
            </div>
            <div>
              <p
                className="text-base-semibold
                 h-11 text-black dark:text-light-1 mt-2 
                    overflow-hidden text-ellipsis"
              >
                {" "}
                Book name
              </p>
              <p className="text-xs">Juicy Jefferson</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="relative overflow-hidden h-28 w-16">
              <img
                src="/assets/no-cover.jpg"
                alt="book cover"
                className="h-36 w-16"
              />
            </div>
            <div>
              <p
                className="text-base-semibold
                 h-11 text-black dark:text-light-1 mt-2 
                    overflow-hidden text-ellipsis"
              >
                {" "}
                Book name
              </p>
              <p className="text-xs">Juicy Jefferson</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div></div>
          <div>
            <p>1 of 5</p>
          </div>
          <div className="flex gap-3">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QueueDetails;
