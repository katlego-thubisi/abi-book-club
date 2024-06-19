"use client";

import React, { useState } from "react";

import { Button } from "../ui/button";

interface Props {
  user: {
    id: string;
  };
}

const DeleteAccount = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccountDeletion = async () => {
    setIsLoading(true);

    //Handle account deletion and log the user out
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
        <Button className="bg-red-800" onClick={handleAccountDeletion}>
          Delete account
        </Button>
      </div>
    </section>
  );
};

export default DeleteAccount;
