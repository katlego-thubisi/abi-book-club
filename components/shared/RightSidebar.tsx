import { fetchCommunities } from "@/lib/actions/community.actions";
import CollapsableSidebar from "../custom-ui/CollapsableSidebar";

async function RightSidebar() {
  const commuminutyResult = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 5,
  });

  // const userResult = await fetchUsers({
  //   userId: "",
  //   searchString: "",
  //   pageNumber: 1,
  //   pageSize: 5,
  // });

  return (
    <CollapsableSidebar
      communities={JSON.parse(JSON.stringify(commuminutyResult.communities))}
      // users={JSON.parse(JSON.stringify(userResult.users))}
    />
  );
}

export default RightSidebar;
