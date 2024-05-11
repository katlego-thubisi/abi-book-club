import { BookQueue } from "./bookQueue";
import { Entry } from "./entry";
import { User } from "./user";

export interface Community {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  status: string;
  createdBy: User;
  threads: Entry[];
  members: User[];
  requests: User[];
  queues: BookQueue[];
  createdDate: Date;
  updatedDate: Date;
}
