"use client";

import { likeEntry } from "@/lib/actions/journal.actions";
import { formatDateString } from "@/lib/utils";
import { timeDifferenceForDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./EntryCard.css";
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
  content: string;
  currentUserId: string;
  parentId?: string;
  author: {
    name: string;
    image: string;
    id: string;
    _id: string;
  };
  community: {
    _id: string;
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
      name: string;
    };
  }[];
  likes: [];
  isComment?: boolean;
}

const EntryCard = ({
  id,
  content,
  author,
  community,
  createdAt,
  comments,
  likes,
  isComment,
  currentUserId,
}: Props) => {
  const pathname = usePathname();
  const handleLike = async () => {
    await likeEntry(id, currentUserId, pathname);
  };

  const isOwner = author._id === currentUserId;

  const isLiked = likes.find((l: any) => l.user === currentUserId);

  const handleDelete = () => {};

  return (
    <article
      className={`group relative overflow-hidden flex w-full flex-col rounded-xl parent-text  ${
        isComment ? "px-0 xs:px-7" : "bg-white dark:bg-dark-2 p-2"
      } `}
    >
      <div className="flex w-full flex-1 flex-row gap-4">
        <p className=" meta-info !text-small-regular absolute right-0">
          {timeDifferenceForDate(new Date(createdAt))} ago
        </p>
        <div className="flex flex-col items-center">
          <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
            <Image
              src={author.image}
              alt="Profile image"
              fill
              className="cursor-pointer rounded-full"
            />
          </Link>

          <div className="thread-card_bar" />
        </div>
        <div className="flex w-full flex-col">
          <Link href={`/profile/${author.id}`} className="w-fit">
            <h4 className="cursor-pointer text-base-semibold text-black dark:text-light-1">
              {author.name}
            </h4>
          </Link>

          <div
            className={`${
              isComment && "mb-5"
            } mt-2 text-small-regular text-black dark:text-light-2 w-full text-justify text-wrap`}
          >
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>

          <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
            <div className="flex items-center gap-3.5">
              <div className="flex items-center gap-1">
                <Image
                  onClick={() => handleLike()}
                  src={`${
                    isLiked
                      ? "/assets/heart-filled.svg"
                      : "/assets/heart-gray.svg"
                  }`}
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <p className="text-subtle-medium meta-info items-center">
                  {likes.length}
                </p>
              </div>
              <Link href={`/journal/${id}`}>
                <Image
                  src="/assets/reply.svg"
                  alt="reply"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </Link>
            </div>

            {comments.length > 0 && (
              <div className="flex gap-2">
                <div className="flex relative ml-2.5">
                  {comments.map((comment, index) => {
                    return (
                      index < 4 && (
                        <Image
                          key={index}
                          src={comment.author.image}
                          alt={`${comment.author.name} profile image`}
                          width={24}
                          height={24}
                          className="cursor-pointer object-contain -ml-2.5 bg-dark-2 rounded-full border-2 border-dark-2"
                        />
                      )
                    );
                  })}
                </div>

                <Link href={`/journal/${id}`}>
                  <p className="mt-1 text-subtle-medium text-black dark:text-white">
                    {comments.length} comments
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TODO: Delete thread */}

      {}

      {!isComment && community && (
        <Link
          href={`/clubs/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Club
          </p>
          <div className="relative h-4 w-4">
            <Image
              src={community.image}
              alt={community.name}
              fill
              className="ml-2 rounded-full"
            />
          </div>
        </Link>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div
            className={`cursor-pointer translate-x-20 ${
              isOwner && "group-hover:translate-x-0"
            } duration-500 ease-in-out absolute right-0 bottom-0 h-10 bg-red-600`}
          >
            <p className="text-white text-base-semibold text-center p-2">
              {isOwner && "Delete"}
            </p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              entry, all related comments and likes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  );
};

export default EntryCard;
