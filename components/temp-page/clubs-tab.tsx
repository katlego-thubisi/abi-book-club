import React from "react";
import ClubDetails from "../forms/ClubDetails";
import PendingRequest from "../forms/PendingRequest";

const ClubsTab = () => {
  return (
    <div className="flex flex-col gap-8">
      <ClubDetails />
      <PendingRequest />
    </div>
  );
};

export default ClubsTab;
