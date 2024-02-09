import PostJournal from "@/components/forms/PostJournal";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import EntriesTab from "@/components/shared/EntriesTab";
import { use } from "react";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const isOwner = user.id === userInfo.id;

  console.log("Page address", userInfo.address);

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        surname={userInfo.surname}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        occupation={userInfo.occupation}
        isOwner={isOwner}
        address={JSON.parse(JSON.stringify(userInfo.address))}
      />

      <div className="mt-9">
        <Tabs defaultValue="entries" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab: any) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />

                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Entries" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            key={`content-enties`}
            value="entries"
            className="w-full text-light-1"
          >
            <EntriesTab
              currentUserId={userInfo._id}
              accountId={userInfo.id}
              accountType="User"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
