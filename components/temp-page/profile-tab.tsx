import React from "react";
import ProfileDetails from "../forms/ProfileDetails";
import AddressDetails from "../forms/AddressDetails";

const ProfileTab = () => {
  return (
    <section className="flex flex-col gap-8">
      <ProfileDetails />
      <AddressDetails />
    </section>
  );
};

export default ProfileTab;
