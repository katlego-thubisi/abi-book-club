"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import {
  addMemberToCommunity,
  removeUserFromCommunity,
} from "@/lib/actions/community.actions";

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
  userId: string;
}

function CommunityCard({
  id,
  name,
  username,
  imgUrl,
  bio,
  members,
  userId,
}: Props) {
  const memberCheck = members?.some((m: any) => m.id === userId);

  const isMember = memberCheck ? true : false;

  const pathName = usePathname();

  const joinCommunity = async () => {
    await addMemberToCommunity(id, userId, pathName);
  };

  const leaveCommunity = async () => {
    await removeUserFromCommunity(userId, id, pathName);
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

      <p className="mt-4 text-subtle-medium text-gray-1">{bio}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-3">
          <Link href={`/communities/${id}`}>
            <Button size="sm" className="community-card_btn bg-slate-800">
              View
            </Button>
          </Link>
          {!isMember ? (
            <Button
              onClick={() => joinCommunity()}
              size="sm"
              className="community-card_btn bg-slate-800"
            >
              Join
            </Button>
          ) : (
            <Button
              onClick={() => leaveCommunity()}
              size="sm"
              className="community-card_btn bg-slate-800"
            >
              Leave
            </Button>
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
