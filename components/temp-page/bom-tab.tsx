import React from "react";
import QueueDetails from "../forms/QueueDetails";
import BomDetails from "../forms/BomDetails";
import { IUser } from "@/lib/types/user";

interface Props {
  user: IUser;
}

const BomTab = ({ user }: Props) => {
  return (
    <section className="flex flex-col gap-8">
      <QueueDetails />

      <BomDetails />
    </section>
  );
};

export default BomTab;
