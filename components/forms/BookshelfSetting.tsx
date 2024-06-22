"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { IBookshelf } from "@/lib/types/bookshelf";
import BookCard from "../cards/BookCard";
import { usePathname } from "next/navigation";
import {
  fetchUserBookshelf,
  removeUserBookshelf,
} from "@/lib/actions/user.actions";
import BookshelfItem from "./BookshelfItem";
import BookshelfItemView from "../cards/BookshelfItemView";
import AddBookCard from "../cards/AddBookCard";
import { set } from "mongoose";

interface Props {
  _userId: string;
  userId: string;
  bookshelf: IBookshelf[];
  bookshelfNavigation: {
    bookShelfPageSize: number;
    bookShelfHasNext: boolean;
    bookShelfTotalPages: number;
    bookShelfCurrentPage: number;
  };
}

const BookshelfSetting = ({
  _userId,
  userId,
  bookshelf,
  bookshelfNavigation,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [currentShelfItem, setShelfItem] = useState<IBookshelf | null>();

  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const [searchString, setSearchString] = useState("");

  const pathname = usePathname();

  const handleEditItem = (shelfItem: IBookshelf | null) => {
    setShelfItem(shelfItem);
    setEditOpen(true);
  };

  const handleViewItem = (shelfItem: any) => {
    setShelfItem(shelfItem);
    setViewOpen(true);
  };

  const handleDeleteItem = async (shelfItem: IBookshelf) => {
    // Before deleting, we need to check if the book is in the user's shelf
    await removeUserBookshelf(pathname, shelfItem.id, userId);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setShelfItem(null);
  };

  const pageUp = async () => {
    setIsLoading(true);
    console.log("We paging up now");

    fetchUserBookshelf({
      userId: _userId,
      searchString: searchString,
      pageNumber: bookshelfNavigation.bookShelfCurrentPage + 1,
    })
      .then((pageResponse) => {
        console.log("Zee page response", pageResponse.bookshelf);

        bookshelf = pageResponse.bookshelf;

        bookshelfNavigation.bookShelfCurrentPage =
          pageResponse.bookShelfCurrentPage;
        bookshelfNavigation.bookShelfTotalPages =
          pageResponse.bookShelfTotalPages;
        bookshelfNavigation.bookShelfHasNext = pageResponse.bookShelfHasNext;
        bookshelfNavigation.bookShelfPageSize = pageResponse.bookShelfPageSize;

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error paging up", error);
      });
  };

  const pageDown = async () => {
    setIsLoading(true);

    const pageResponse = await fetchUserBookshelf({
      userId: _userId,
      searchString: searchString,
      pageNumber: bookshelfNavigation.bookShelfCurrentPage - 1,
    });

    bookshelf = pageResponse.bookshelf;

    bookshelfNavigation.bookShelfCurrentPage =
      pageResponse.bookShelfCurrentPage;
    bookshelfNavigation.bookShelfTotalPages = pageResponse.bookShelfTotalPages;
    bookshelfNavigation.bookShelfHasNext = pageResponse.bookShelfHasNext;
    bookshelfNavigation.bookShelfPageSize = pageResponse.bookShelfPageSize;

    setIsLoading(false);
  };

  const selectPage = async (pageNumber: number) => {
    setIsLoading(true);

    const pageResponse = await fetchUserBookshelf({
      userId: _userId,
      searchString: searchString,
      pageNumber: pageNumber,
    });

    bookshelf = pageResponse.bookshelf;
    bookshelfNavigation.bookShelfCurrentPage =
      pageResponse.bookShelfCurrentPage;
    bookshelfNavigation.bookShelfTotalPages = pageResponse.bookShelfTotalPages;
    bookshelfNavigation.bookShelfHasNext = pageResponse.bookShelfHasNext;
    bookshelfNavigation.bookShelfPageSize = pageResponse.bookShelfPageSize;

    setIsLoading(false);

    console.log("Current bookshelf", bookshelf);
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
        <Button className="bg-red-800" onClick={() => handleEditItem(null)}>
          Add book
        </Button>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-2 gap-12">
            {/* Loop through books here */}
            {bookshelf && bookshelf.length > 0 ? (
              bookshelf.map((bookshelfItem) => (
                <BookCard
                  book={bookshelfItem.bookId}
                  review={bookshelfItem.bookReviewId}
                  handleDeleteItem={() => handleDeleteItem(bookshelfItem)}
                  handleSelectItem={() => handleEditItem(bookshelfItem)}
                  handleViewItem={() => handleViewItem(bookshelfItem)}
                  isOwner={true}
                />
              ))
            ) : (
              <p>No books found</p>
            )}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="max-sm:hidden"></div>
          <div className="flex items-center gap-7">
            <Button
              className="cursor-pointer"
              disabled={bookshelfNavigation.bookShelfCurrentPage - 1 <= 0}
              onClick={() => pageDown()}
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
              onClick={() => pageUp()}
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
                    onClick={() => selectPage(page)}
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
      {editOpen && (
        <BookshelfItem
          open={editOpen}
          handleClose={() => handleEditClose()}
          shelfItem={{
            ...currentShelfItem,
            book: currentShelfItem?.bookId,
            review: currentShelfItem?.bookReviewId,
          }}
          userId={userId}
        />
      )}

      {viewOpen && (
        <BookshelfItemView
          open={viewOpen}
          handleClose={() => setViewOpen(false)}
          shelfItem={{
            ...currentShelfItem,
            book: currentShelfItem?.bookId,
            review: currentShelfItem?.bookReviewId,
          }}
        />
      )}
    </section>
  );
};

export default BookshelfSetting;
