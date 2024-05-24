import { Address } from "./address";

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: Address[];
  phoneNumber: string;
  role: string;
  image: string;
  bio: string;
  onboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
} | null;
