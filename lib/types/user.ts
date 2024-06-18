import { IAddress } from "./address";
import { IBookshelf } from "./bookshelf";
import { IEntry } from "./entry";

export type IUser = {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  address: IAddress[];
  followers: IUser[];
  following: IUser[];
  occupation: string;
  threads: IEntry[];
  bookshelf: IBookshelf[];
  phoneNumber: string;
  role: string;
  image: string;
  bio: string;
  onboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
};
