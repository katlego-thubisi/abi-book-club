import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  userId: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  bio: string;
}

const ProfileCard = ({
  id,
  userId,
  name,
  username,
  imgUrl,
  personType,
  bio,
}: Props) => {
  return (
    <div
      id={`slide-${id}`}
      className="flex flex-col gap-1 px-5 py-2 bg-zinc-100 dark:bg-zinc-900"
    >
      <Link href={`/profile/${userId}`} className="h-full w-full">
        <div className="flex gap-2">
          <div className="flex h-14 w-14 rounded-full justify-center relative overflow-hidden">
            <Image
              src={imgUrl}
              alt="community_logo"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col text-black dark:text-white">
            <p className="text-heading3-bold">{name}</p>
            <p className="text-small-medium text-zinc-800 dark:text-gray-1">
              @{username}
            </p>
          </div>
        </div>
        <div className="text-black dark:text-white mt-2">{bio}</div>
      </Link>
    </div>
  );
};

export default ProfileCard;
