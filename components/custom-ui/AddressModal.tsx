"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Address from "../forms/Address";
import AddressListing from "./AddressListing";

interface Props {
  address?: [
    {
      _id?: string;
      id?: string;
      streetLine1: string;
      streetLine2: string;
      city: string;
      province: string;
      postalCode: string;
      country: string;
      countryCode: string;
      isPrimary: boolean;
    },
  ];
  userId: string;
}

const AddressModal = ({ address, userId }: Props) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState(
    address && address.length > 0 ? false : true
  );
  const [currentAddress, setCurrentAddress] = useState<any>(
    address && address.length > 0
      ? address.find((address) => address.isPrimary)
        ? address.find((address) => address.isPrimary)
        : address[0]
      : null
  );

  useEffect(() => {
    if (!formState)
      setCurrentAddress(
        address && address.length > 0
          ? address.find((address) => address.isPrimary)
            ? address.find((address) => address.isPrimary)
            : address[0]
          : null
      );
  }, [formState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {currentAddress ? (
          <p className="dark:text-white">
            {currentAddress?.streetLine1} {currentAddress?.streetLine2}{" "}
            {currentAddress?.city} {currentAddress?.country}
            <span className="ml-1 text-small-regular text-blue cursor-pointer  hover:underline ">
              Edit address
            </span>
          </p>
        ) : (
          <p>
            <span className="text-small-regular text-blue cursor-pointer  hover:underline">
              Add address
            </span>
          </p>
        )}
      </DialogTrigger>
      <DialogContent className="content-center sm:max-w-md max-h-screen overflow-y-scroll scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-base-semibold  text-slate-700 dark:text-gray-300">
            {currentAddress ? `Edit` : `Add`} address
          </DialogTitle>
          <DialogDescription className="text-base-semibold  text-slate-600 dark:text-gray-400">
            {currentAddress ? `Edit` : `Add`} your address. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>
        {formState ? (
          <Address
            address={currentAddress}
            userId={userId}
            btnTitle="Save"
            handleClose={() => setFormState(false)}
          />
        ) : (
          address &&
          address.length > 0 && (
            <AddressListing
              address={address}
              userId={userId}
              addAddress={() => {
                setCurrentAddress(null);
                setFormState(true);
              }}
              editAddress={(address: any) => {
                setCurrentAddress(address);
                setFormState(true);
              }}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
