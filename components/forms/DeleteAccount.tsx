"use client";

import React, { useState } from "react";

import { Button } from "../ui/button";

const DeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleProfileVisibility = async () => {
    setIsLoading(true);
  };

  return (
    <section
      className="flex max-sm:flex-col gap-10 border border-solid
     border-gray-300-400 rounded-xl p-5 shadow-sm"
    >
      <h1 className="text-heading3-bold">Delete profile</h1>

      <div className="flex flex-col flex-1 gap-6">
        <div className="flex flex-col">
          <label className="text-small-semibold">
            Delete your account and all associated data. Be careful, this action
            is irreversible.
          </label>
        </div>
        <Button className="bg-red-800" onClick={toggleProfileVisibility}>
          Delete account
        </Button>
      </div>
    </section>
  );
};

export default DeleteAccount;
