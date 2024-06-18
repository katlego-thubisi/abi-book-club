"use client";

import React, { ChangeEvent, useState } from "react";

import { Switch } from "../ui/switch";

const AddressDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleProfileVisibility = async () => {
    setIsLoading(true);
  };

  return (
    <section
      className="flex max-sm:flex-col gap-10 border border-solid
     border-gray-300-400 rounded-xl p-5 shadow-sm"
    >
      <h1 className="text-heading3-bold">Address details</h1>

      <div className="flex flex-1 gap-6 justify-between items-center">
        <div className="flex flex-col">
          <label className="text-body1-bold">Make profile private</label>
          <label className="text-small-regular">
            Only allow followers to access content you share. (This does not
            apply to content shared in public groups)
          </label>
        </div>
        <Switch onClick={toggleProfileVisibility} />
      </div>
    </section>
  );
};

export default AddressDetails;
