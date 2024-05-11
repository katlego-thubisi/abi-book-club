import { Book } from "./book";
import { User } from "./user";

export interface BookReview {
  id: string;
  createdBy: User;
  book: Book;
  rating: number;
  review: string;
  createdDate: Date;
  updatedDate: Date;
}
