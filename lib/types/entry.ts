import { Community } from "./community";
import { Like } from "./like";
import { User } from "./user";

export interface Entry {
  text: string;
  author: User;
  community: Community;
  createdAt: Date;
  parentId: string;
  likes: Like[];
  children: Entry[];
}
