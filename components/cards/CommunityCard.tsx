"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import {
  memberRequestToCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
} from "@/lib/actions/community.actions";
import { Dialog, DialogTrigger } from "../ui/dialog";
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
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    id: string;
    image: string;
  }[];
  requests: {
    id: string;
  }[];
  userId: string;
  userBaseId: string;
  createdBy: string;
}

function CommunityCard({
  id,
  name,
  username,
  imgUrl,
  bio,
  members,
  requests,
  userId,
  userBaseId,
  createdBy,
}: Props) {
  const requesterCheck = requests?.some((r: any) => r.id === userId);
  const memberCheck = members?.some((m: any) => m.id === userId);

  const isRequesting = requesterCheck ? true : false;
  const isMember = memberCheck ? true : false;

  const isOwner = userBaseId === createdBy;

  const pathName = usePathname();

  const joinCommunity = async () => {
    await memberRequestToCommunity(id, userId, pathName);
  };

  const leaveCommunity = async () => {
    await removeUserFromCommunity(userId, id, pathName);
  };

  const confirmDeleteCommunity = async () => {
    await updateCommunityInfo(id, name, username, imgUrl, "delete");
  };
  return (
    <article className="community-card">
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/communities/${id}`} className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="community_logo"
            fill
            className="rounded-full object-cover"
          />
        </Link>

        <div>
          <Link href={`/communities/${id}`}>
            <h4 className="text-base-semibold text-light-1">{name}</h4>
          </Link>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <p className="mt-4 text-subtle-medium text-gray-1 h-8 overflow-hidden text-ellipsis">
        {bio}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-3">
          <Link href={`/communities/${id}`}>
            <Button size="sm" className="community-card_btn bg-slate-800">
              View
            </Button>
          </Link>
          {!isOwner && !isMember && (
            <Button
              onClick={() => joinCommunity()}
              disabled={isRequesting}
              size="sm"
              className="community-card_btn bg-slate-800"
            >
              {isRequesting ? "Pending" : "Join"}
            </Button>
          )}
          {!isOwner && isMember && (
            <Button
              onClick={() => leaveCommunity()}
              size="sm"
              className="community-card_btn bg-slate-800"
            >
              Leave
            </Button>
          )}
          {isOwner && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  // onClick={() => leaveCommunity()}
                  size="sm"
                  className="community-card_btn bg-red-800"
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
          )}
        </div>

        {members.length > 0 && (
          <div className="flex items-center">
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && "-ml-2"
                } rounded-full object-cover`}
              />
            ))}
            {members.length > 3 && (
              <p className="ml-1 text-subtle-medium text-gray-1">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
