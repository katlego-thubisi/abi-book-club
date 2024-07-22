import { IBook } from "./book";
import { IUser } from "./user";

export interface IBookSession {
  id: string;
  book: IBook;
  startData: Date;
  endDate: Date;
  votes: IUser[];
  status: string;
  createdDate: Date;
  updatedDate: Date;
}
