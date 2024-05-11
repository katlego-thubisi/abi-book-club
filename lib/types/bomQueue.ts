import { BookSession } from "./bookSession";
import { Community } from "./community";

export interface BomQueue {
  id: string;
  community: Community;
  startDate: Date;
  endDate: Date;
  bookSessions: BookSession[];
  status: string;
  createdDate: Date;
  updatedDate: Date;
}
