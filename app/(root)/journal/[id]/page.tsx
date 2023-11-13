import EntryCard from "@/components/cards/EntryCard";
import { fetchEntryById } from "@/lib/actions/journal.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const entry = await fetchEntryById(params.id);

  return (
    <section className="relative">
      <div>
        <EntryCard
          key={entry._id}
          id={entry._id}
          currentUserId={user?.id || ""}
          parentId={entry.parentId}
          content={entry.text}
          author={entry.author}
          community={entry.community}
          createdAt={entry.createdAt}
          comments={entry.children}
        />
      </div>
      <div className="mt-7">
        <Comment
          entryId={entry.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {entry.children.map((comment: any) => (
          <EntryCard
            key={comment._id}
            id={comment._id}
            currentUserId={user?.id || ""}
            parentId={comment.parentId}
            content={comment.text}
            author={comment.author}
            community={comment.community}
            createdAt={comment.createdAt}
            comments={comment.children}
            isComment={true}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
