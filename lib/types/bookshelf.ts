import { IBook } from "./book";
import { IBookReview } from "./bookReview";

export type IBookshelf = {
  id: string;

  book: IBook;
  category: string;
  bookReview: IBookReview;

  createdDate: Date;
  updatedDate: Date;
};
