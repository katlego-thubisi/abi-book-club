import { Address } from "./address";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: Address[];
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  isSuspended: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
