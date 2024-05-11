import { Book } from "./book";
import { User } from "./user";

export interface BookSession {
  id: string;
  book: Book;
  startData: Date;
  endDate: Date;
  votes: User[];
  status: string;
  createdDate: Date;
  updatedDate: Date;
}
