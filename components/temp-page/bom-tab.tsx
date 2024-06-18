import React from "react";
import QueueDetails from "../forms/QueueDetails";
import BomDetails from "../forms/BomDetails";

const BomTab = () => {
  return (
    <section className="flex flex-col gap-8">
      <QueueDetails />
      <BomDetails />
    </section>
  );
};

export default BomTab;
