export interface Book {
  id: string;
  bookId: string;
  title: string;
  subtitle?: string;
  description?: string;
  categories: string[];
  authors: string[];
  cover?: string;
  createdDate: Date;
  updatedDate: Date;
}
