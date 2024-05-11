import { BookSession } from "./bookSession";
import { Community } from "./community";

export interface Bom {
  id: string;
  bookSession: BookSession;
  community: Community;
  createdDate: Date;
  updatedDate: Date;
}
