"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  addMemberToCommunity,
  removeUserFromCommunity,
} from "@/lib/actions/community.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  isMember?: boolean;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  isMember,
  type,
}: Props) => {
  const pathName = usePathname();
  const joinCommunity = async () => {
    console.log("joinCommunity");
    await addMemberToCommunity(accountId, authUserId, pathName);
  };

  const leaveCommunity = async () => {
    await removeUserFromCommunity(authUserId, accountId, pathName);
  };
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
        {!isMember ? (
          <div>
            <Button
              onClick={() => joinCommunity()}
              size="sm"
              className="community-card_btn bg-slate-800"
            >
              Join
            </Button>
          </div>
        ) : (
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

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
