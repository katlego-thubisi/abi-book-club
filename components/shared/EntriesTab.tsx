import { fetchUserPosts } from "@/lib/actions/user.actions";
import React from "react";
import { redirect } from "next/navigation";
import EntryCard from "../cards/EntryCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const EntriesTab = async ({ currentUserId, accountId, accountType }: Props) => {
  //TODO: Fetch profile threads
  let result = await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((entry: any) => (
        <EntryCard
          key={entry._id}
          id={entry._id}
          currentUserId={currentUserId}
          parentId={entry.parentId}
          content={entry.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: entry.name,
                  image: entry.author.image,
                  id: entry.author.id,
                }
          } //TODO: Update
          community={entry.community} //TODO: Update
          createdAt={entry.createdAt}
          comments={entry.children}
        />
      ))}
    </section>
  );
};

export default EntriesTab;
