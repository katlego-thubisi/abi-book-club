"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  memberRequestToCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
} from "@/lib/actions/community.actions";
import { usePathname } from "next/navigation";
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
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "../ui/dialog";

import AccountProfile from "../forms/AccountProfile";
import { useState } from "react";
import Community from "../forms/Community";
import EditProfileModal from "../custom-ui/EditProfileModal";
import AddressModal from "../custom-ui/AddressModal";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  surname?: string;
  username: string;
  imgUrl: string;
  bio: string;
  address?: any[];
  occupation?: string;
  isMember?: boolean;
  isRequester?: boolean;
  isOwner?: boolean;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  surname,
  username,
  address,
  imgUrl,
  bio,
  occupation,
  isMember,
  isRequester,
  isOwner,
  type,
}: Props) => {
  const pathName = usePathname();

  const joinCommunity = async () => {
    await memberRequestToCommunity(accountId, authUserId, pathName);
  };

  const leaveCommunity = async () => {
    await removeUserFromCommunity(authUserId, accountId, pathName);
  };

  const confirmDeleteCommunity = async () => {
    await updateCommunityInfo(accountId, name, username, imgUrl, "delete", bio);
  };

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        {isOwner ? (
          <div className="flex flex-col gap-1">
            <EditProfileModal
              accountId={accountId}
              authUserId={authUserId}
              name={name}
              surname={surname}
              occupation={occupation}
              username={username}
              imgUrl={imgUrl}
              bio={bio}
              type={type}
            />
            <AddressModal
              address={
                address
                  ? address[0]
                  : {
                      streetLine1: "",
                      streetLine2: "",
                      city: "",
                      province: "",
                      postalCode: "",
                      country: "",
                      countryCode: "",
                    }
              }
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={imgUrl}
                alt="Profile image"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-left text-heading3-bold text-black dark:text-light-1">
                {name}
              </h2>
              <p className="text-base-medium text-gray-1">@{username}</p>
            </div>
          </div>
        )}

        {!isOwner && !isMember && type === "Community" && (
          <div>
            <Button
              onClick={() => joinCommunity()}
              size="sm"
              className="community-card_btn"
              disabled={isRequester}
            >
              {isRequester ? "Pending" : "Join"}
            </Button>
          </div>
        )}
        {isOwner && isMember && type === "Community" && (
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  className="community-card_btn bg-red-800 dark:bg-red-800"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your club, remove all your club's entries and members.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => confirmDeleteCommunity()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
        {!isOwner && isMember && type === "Community" && (
          <div>
            <Button
              onClick={() => leaveCommunity()}
              size="sm"
              className="community-card_btn bg-slate-800"
            >
              Leave
            </Button>
          </div>
        )}
      </div>

      {/* TODO: Community */}

      <p className="mt-6 text-base-regular text-black dark:text-light-2">
        {bio}
      </p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
