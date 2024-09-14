import CommunityCard from "@/components/cards/CommunityCard";
import Communities from "@/components/sections/communities";
import Entries from "@/components/sections/entries";

import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchPosts } from "@/lib/actions/journal.actions";

async function Page() {
  // Fetch communities
  // const result = await fetchCommunities({
  //   searchString: "",
  //   pageNumber: 1,
  //   pageSize: 4,
  // });

  // const activeCommunities = result.communities
  //   ? result.communities.filter((c) => c?.status === "active")
  //   : [];

  const result = await fetchPosts(1, 5);

  return (
    <section>
      <Entries initialPosts={result.posts} />
      {/* <Communities /> */}
    </section>
  );
}

export default Page;
