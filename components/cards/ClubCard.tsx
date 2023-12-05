import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

const ClubCard = ({ id, name, username, imgUrl, bio, members }: Props) => {
  return (
    <article className="bg-slate-900 rounded-md">
      <div className="flex p-2">
        <div className="flex flex-col justify-center">
          <Image
            src={imgUrl}
            alt="community_logo"
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-heading4-medium text-light-1">{name}</p>
          <p className="text-small-regular text-light-2">
            {members.length} members
          </p>
        </div>
      </div>
    </article>
  );
};

export default ClubCard;
