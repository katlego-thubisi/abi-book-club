"use client";

import React, { useState } from "react";
import ProfileSidebar from "../shared/ProfileSidebar";
import Profile from "./profile";
import { IUser } from "@/lib/types/user";
import GeneralTab from "./general-tab";
import ProfileDetails from "../forms/ProfileDetails";
import ProfileTab from "./profile-tab";
import BookshelfTab from "./bookshelf-tab";
import BomTab from "./bom-tab";
import ClubsTab from "./clubs-tab";

interface Props {
  id: string;
  userInfo: IUser;
  isOwner: boolean;
  isFollowing: boolean;
  bookshelfNavigation: {
    bookShelfPageSize: number;
    bookShelfHasNext: boolean;
    bookShelfTotalPages: number;
    bookShelfCurrentPage: number;
  };
}

const OwnedProfile = ({
  id,
  userInfo,
  isOwner,
  isFollowing,
  bookshelfNavigation,
}: Props) => {
  const [currentTab, setCurrentTab] = useState("General");

  return (
    <div className="flex flex-col w-full">
      <ProfileSidebar
        defaultValue="General"
        setCurrentTab={(currentTab) => {
          setCurrentTab(currentTab);
        }}
      />
      {currentTab === "General" && <GeneralTab user={userInfo} />}
      {currentTab === "Profile" && <ProfileTab user={userInfo} />}
      {currentTab === "Bookshelf" && (
        <BookshelfTab
          user={userInfo}
          bookshelfNavigation={bookshelfNavigation}
        />
      )}
      {currentTab === "BoM" && <BomTab user={userInfo} />}
      {currentTab === "Clubs" && <ClubsTab />}
    </div>
  );
};

export default OwnedProfile;
