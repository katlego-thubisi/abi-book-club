import PostJournal from "@/components/forms/PostJournal";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();
    if (!user) return null;
    
    // fetch organization list created by user
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    return (
    <>
        <h1 className='head-text'>Create Journal Entry </h1>

        <PostJournal userId={userInfo._id} />
    </>
    );
    }

export default Page;