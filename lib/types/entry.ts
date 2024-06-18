import { ICommunity } from "./community";
import { Like } from "./like";
import { IUser } from "./user";

export interface IEntry {
  text: string;
  author: IUser;
  community: ICommunity;
  createdAt: Date;
  parentId: string;
  likes: Like[];
  children: IEntry[];
}
