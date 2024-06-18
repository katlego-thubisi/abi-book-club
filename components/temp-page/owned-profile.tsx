"use client";

import React, { useState } from "react";
import ProfileSidebar from "../shared/ProfileSidebar";
import Profile from "./profile";
import { IUser } from "@/lib/types/user";

interface Props {
  id: string;
  userInfo: IUser;
  isOwner: boolean;
  isFollowing: boolean;
}

const OwnedProfile = ({ id, userInfo, isOwner, isFollowing }: Props) => {
  const [currentTab, setCurrentTab] = useState("General");

  return (
    <div className="flex flex-col w-full">
      <ProfileSidebar
        defaultValue="General"
        setCurrentTab={(currentTab) => {
          setCurrentTab(currentTab);
        }}
      />
      {currentTab === "General" && (
        <Profile
          id={id}
          isFollowing={isFollowing}
          userInfo={userInfo}
          isOwner={isOwner}
        />
      )}
    </div>
  );
};

export default OwnedProfile;
