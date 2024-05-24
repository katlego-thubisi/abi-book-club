import { IAddress } from "./address";
import { IBookshelf } from "./bookshelf";

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: IAddress[];
  bookshelf: IBookshelf[];
  phoneNumber: string;
  role: string;
  image: string;
  bio: string;
  onboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
} | null;
