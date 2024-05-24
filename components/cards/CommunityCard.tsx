"use client";

import { ICommunity } from "@/lib/types/community";
import Image from "next/image";
import Link from "next/link";
interface Props {
  community: ICommunity;
}
function CommunityCard({ community }: Props) {
  return (
    <article className="w-40 sm:w-48">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/clubs/${community?.id}`}
          className="relative h-60 w-full "
        >
          <Image
            src={
              community?.image
                ? community?.image
                : "/assets/club_placeholder.png"
            }
            alt="community_logo"
            fill
            className="object-cover rounded-lg"
          />
        </Link>
      </div>

      <div className="mt-2">
        <Link href={`/clubs/${community?.id}`}>
          <h4 className="text-base-semibold text-black dark:text-light-1 h-11 overflow-hidden text-ellipsis">
            {community?.name}
          </h4>
        </Link>
        <p className="text-small-medium text-gray-1 overflow-hidden  text-ellipsis">
          @{community?.username}
        </p>
      </div>

      <p className="mt-2 text-subtle-medium text-gray-1 h-16 overflow-hidden text-ellipsis">
        {community?.bio}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
        {community?.members && community.members.length > 0 && (
          <div className="flex items-center">
            {community.members.map(
              (member, index) =>
                index < 4 && (
                  <div
                    key={`c-${index}`}
                    className={`${
                      index !== 0 && "-ml-3"
                    } flex items-center h-7 w-7 relative rounded-full overflow-hidden`}
                  >
                    <Image
                      key={index}
                      src={member?.image ? member.image : "/assets/user.png"}
                      alt={`user_${index}`}
                      width={28}
                      height={28}
                      className="object-cover"
                    />
                  </div>
                )
            )}

            <p className="ml-1 text-subtle-medium text-gray-1">
              {community.members.length}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
