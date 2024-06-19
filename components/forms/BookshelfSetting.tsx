"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { IBookshelf } from "@/lib/types/bookshelf";
import BookCard from "../cards/BookCard";

interface Props {
  bookshelf: IBookshelf[];
  bookshelfNavigation: {
    bookShelfPageSize: number;
    bookShelfHasNext: boolean;
    bookShelfTotalPages: number;
    bookShelfCurrentPage: number;
  };
}

const BookshelfSetting = ({ bookshelf, bookshelfNavigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleProfileVisibility = async () => {
    setIsLoading(true);
  };

  const pages = Array.from(
    { length: bookshelfNavigation.bookShelfTotalPages },
    (_, i) => i + 1
  );

  return (
    <section
      className="flex max-sm:flex-col gap-10 border border-solid
                 border-gray-300-400 rounded-xl p-5 shadow-sm"
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-heading3-bold">Bookshelf</h1>
        <p className="text-small-medium w-48">
          Tell us more about your interest by curating and awesome bookshelf
        </p>
        <div className="flex flex-col gap-4">
          <p className="text-black dark:text-light-1 text-sm">Filters</p>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Search for books"
              onChange={(event) => console.log(event.target.value)}
              className="account-form_input"
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Have reads
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Currently reading
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Want to read
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-6">
        <Button className="bg-red-800" onClick={toggleProfileVisibility}>
          Add book
        </Button>
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-12">
          {/* Loop through books here */}
          {bookshelf && bookshelf.length > 0 ? (
            bookshelf.map((bookshelfItem) => (
              <BookCard
                book={bookshelfItem.bookId}
                review={bookshelfItem.bookReviewId}
                handleDeleteItem={() => {}}
                handleSelectItem={() => {}}
                handleViewItem={() => {}}
                isOwner={true}
              />
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="max-sm:hidden"></div>
          <div className="flex items-center gap-7">
            <Button
              className="cursor-pointer"
              disabled={bookshelfNavigation.bookShelfCurrentPage - 1 <= 0}
            >
              {"<"}
            </Button>
            <p>
              {bookshelfNavigation.bookShelfCurrentPage} of{" "}
              {bookshelfNavigation.bookShelfTotalPages} page(s)
            </p>
            <Button
              className="cursor-pointer"
              disabled={
                bookshelfNavigation.bookShelfCurrentPage ==
                bookshelfNavigation.bookShelfTotalPages
              }
            >
              {">"}
            </Button>
          </div>
          <div className="flex gap-3">
            {/* //Create a loop to loop over the number of pages */}
            {pages.map(
              (page, i) =>
                i < 3 && (
                  <Button
                    key={page}
                    className={`${
                      bookshelfNavigation.bookShelfCurrentPage === page
                        ? "bg-red-800 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => {}}
                  >
                    {page}
                  </Button>
                )
            )}

            {bookshelfNavigation.bookShelfTotalPages > 3 && (
              <div className="flex gap-2">
                <span>...</span>
                <Button className="bg-gray-200 text-black">
                  {bookshelfNavigation.bookShelfTotalPages}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookshelfSetting;
