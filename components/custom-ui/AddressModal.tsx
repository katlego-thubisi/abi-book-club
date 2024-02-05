"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Address from "../forms/Address";

interface Props {
  address: {
    streetLine1: string;
    streetLine2: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };
}

const AddressModal = ({ address }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p>
          {address.streetLine1} {address.streetLine2} {address.city}{" "}
          {address.country}{" "}
          <span className="text-small-regular text-blue cursor-pointer  hover:underline">
            Edit address
          </span>
        </p>
      </DialogTrigger>
      <DialogContent className="content-center sm:max-w-md max-h-screen overflow-y-scroll scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-base-semibold  text-slate-700 dark:text-gray-300">
            Edit address
          </DialogTitle>
          <DialogDescription className="text-base-semibold  text-slate-600 dark:text-gray-400">
            Edit your address. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Address
          address={address}
          btnTitle="Save"
          handleClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
