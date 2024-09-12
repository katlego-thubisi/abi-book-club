import CommunityCard from "@/components/cards/CommunityCard";
import Communities from "@/components/sections/communities";
import Entries from "@/components/sections/entries";

import { fetchCommunities } from "@/lib/actions/community.actions";

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

  return (
    <section>
      <Entries />
      <Communities />
    </section>
  );
}

export default Page;
