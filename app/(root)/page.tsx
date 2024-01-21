import CommunityCard from "@/components/cards/CommunityCard";

import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  // Fetch communities
  const result = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  const activeCommunities = result.communities.filter(
    (c) => c.status === "active"
  );

  return (
    <section>
      <div className="mt-9 flex flex-wrap gap-4">
        {activeCommunities.length === 0 ? (
          <p className="no-result">No Communities</p>
        ) : (
          <>
            {activeCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={JSON.parse(JSON.stringify(community.members))}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
