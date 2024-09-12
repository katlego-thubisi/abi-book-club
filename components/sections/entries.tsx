import { fetchPosts } from "@/lib/actions/journal.actions";
import React from "react";
import EntryCard from "../cards/EntryCard";

const Entries = async () => {
  const result = await fetchPosts(1, 30);

  return (
    <section className="flex flex-col gap-10">
      {result.posts.map((post: any, index) => (
        <EntryCard
          key={post._id}
          id={post._id}
          currentUserId={""}
          content={post.text}
          author={{
            name: post.author.name,
            image: post.author.image,
            id: post.author.id,
            _id: post.author._id,
          }}
          community={
            post.community
              ? {
                  _id: post.community._id,
                  id: post.community.id,
                  name: post.community.name,
                  image: post.community.image,
                }
              : null
          }
          createdAt={post.createdAt}
          comments={JSON.parse(JSON.stringify(post.children))}
          likes={JSON.parse(JSON.stringify(post.likes))}
        />
      ))}
    </section>
  );
};

export default Entries;
