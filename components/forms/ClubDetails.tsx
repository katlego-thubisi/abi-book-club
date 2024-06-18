"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

const ClubDetails = () => {
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
        <h1 className="text-heading3-bold">Club list</h1>
        <p className="text-small-medium w-48">
          Your community of book lovers all in one area
        </p>
        <div className="flex flex-col gap-4">
          <p className="text-black dark:text-light-1 text-sm">Filters</p>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Search for books"
              onChange={(event) => console.log(event.target.value)}
              className="account-form_input"
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Has notifications
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lastest
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Oldest
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-6">
        <Button className="bg-red-800" onClick={toggleProfileVisibility}>
          Add club
        </Button>
        <div className="flex flex-wrap gap-4">
          {/* Loop through books here */}
          <div className="flex flex-col cursor-pointer relative">
            <div className="relative h-60 w-40 sm:w-48 overflow-hidden">
              <img
                src="/assets/no-cover.jpg"
                alt="book cover"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="mt-2 w-40">
              <p className="text-base-semibold text-black dark:text-light-1 h-11 overflow-hidden text-ellipsis">
                {" "}
                Club name
              </p>
              <p className="text-small-medium text-gray-1 overflow-hidden  text-ellipsis">
                @clubusername
              </p>
              <p className="mt-2 text-subtle-medium text-gray-1 h-16 overflow-hidden text-ellipsis">
                Short bio about the club
              </p>
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

export default ClubDetails;
