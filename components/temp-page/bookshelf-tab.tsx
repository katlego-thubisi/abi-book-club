import React from "react";
import BookshelfSetting from "../forms/BookshelfSetting";

import { IUser } from "@/lib/types/user";

interface Props {
  user: IUser;
  bookshelfNavigation: {
    bookShelfPageSize: number;
    bookShelfHasNext: boolean;
    bookShelfTotalPages: number;
    bookShelfCurrentPage: number;
  };
}

const BookshelfTab = ({ user, bookshelfNavigation }: Props) => {
  return (
    <section className="flex flex-col gap-8">
      <BookshelfSetting
        _userId={user._id}
        userId={user.id}
        bookshelf={user.bookshelf}
        bookshelfNavigation={bookshelfNavigation}
      />
    </section>
  );
};

export default BookshelfTab;
