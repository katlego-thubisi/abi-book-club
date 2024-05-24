import { ICommunity } from "./community";
import { Like } from "./like";
import { IUser } from "./user";

export interface Entry {
  text: string;
  author: IUser;
  community: ICommunity;
  createdAt: Date;
  parentId: string;
  likes: Like[];
  children: Entry[];
}
