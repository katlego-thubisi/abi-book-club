import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  if (userInfo && userInfo.onboarded) redirect("/");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  };
  return (
    <main className="w-full bg-white">
      <div className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20 ">
        <h1 className="head-text text-black dark:text-light-2">Onboarding</h1>
        <p className="mt-3 text-base-regular text-black dark:text-light-2 ">
          Complete your profile now to use Abi's Book Club
        </p>
        <section className="mt-9 bg-gray-100 rounded-md dark:bg-dark-2 p-10">
          <AccountProfile user={userData} btnTitle="Continue" />
        </section>
      </div>
    </main>
  );
}

export default Page;
