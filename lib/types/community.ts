import { BookQueue } from "./bookQueue";
import { Entry } from "./entry";
import { IUser } from "./user";

export type ICommunity = {
  _id?: string;
  id?: string | undefined;
  username: string;
  name: string;
  image: string;
  bio: string;
  status: string;
  createdBy: IUser;
  threads: Entry[];
  members: IUser[];
  requests: IUser[];
  queues: BookQueue[];
  createdDate: Date;
  updatedDate: Date;
} | null;

export type ICommunityForm = {
  id?: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  ownerUserId: string;
};
