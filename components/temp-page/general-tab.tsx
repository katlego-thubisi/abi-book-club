import React from "react";

import BasicDetails from "../forms/BasicDetails";
import ProfileVisisbility from "../forms/ProfileVisibility";
import DeleteAccount from "../forms/DeleteAccount";

const GeneralTab = () => {
  return (
    <section className="flex flex-col gap-8">
      <BasicDetails />
      <ProfileVisisbility />
      <DeleteAccount />
    </section>
  );
};

export default GeneralTab;
