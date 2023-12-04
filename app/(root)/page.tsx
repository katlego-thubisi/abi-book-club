import EntryCard from "@/components/cards/EntryCard";
import NewCard from "@/components/cards/NewCard";
import { fetchPosts } from "@/lib/actions/journal.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  console.log("Zee result", result.posts);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post: any, index) => (
              <NewCard
                key={post._id}
                id={post._id}
                // currentUserId={user?.id || ""}
                // parentId={post.parentId}
                content={post.text}
                author={{
                  name: post.author.name,
                  image: post.author.image,
                  id: post.author.id,
                }}
                community={
                  post.community
                    ? {
                        id: post.community.id,
                        name: post.community.name,
                        image: post.community.image,
                      }
                    : null
                }
                createdAt={post.createdAt}
                comments={[...post.children]}
                // comments={[]}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
