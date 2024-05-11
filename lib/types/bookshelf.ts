import { Book } from "./book";
import { BookReview } from "./bookReview";

export interface BookshelfItem {
  id: string;
  book: Book;
  category: string;
  bookReview: BookReview;
  createdDate: Date;
  updatedDate: Date;
}
