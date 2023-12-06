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
    <article
      className="bg-transparent rounded-lg cursor-pointer 
    transform hover:-translate-y-1 hover:bg-dark-4 duration-150 ease-in-out "
    >
      <div className="flex gap-5 p-2">
        <div className="flex flex-col justify-center">
          <Image
            src={imgUrl}
            alt="community_logo"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-heading2-medium text-light-2">{name}</p>
          <p className="text-small-regular text-light-3">
            {abbreviateMembers(members.length)} member(s)
          </p>
        </div>
      </div>
    </article>
  );
};
const abbreviateMembers = (members: number): string => {
  if (members >= 1000) {
    const abbreviated = (members / 1000).toFixed(2);
    return `${abbreviated}k`;
  } else {
    return members.toString();
  }
};

export default ClubCard;
