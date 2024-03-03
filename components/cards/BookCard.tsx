import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";

interface Props {
  book: {
    id?: string;
    title: string;
    blurb: string;
    authors: string[];
    cover: string;
  };
  review: any;

  handleSelectItem: () => void;
  handleDeleteItem: () => void;
}

const BookCard = ({
  book,
  review,
  handleSelectItem,
  handleDeleteItem,
}: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <article className="w-40 sm:w-40">
      <div
        onClick={() => handleSelectItem()}
        className="relative w-full h-60 overflow-hidden cursor-pointer"
      >
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-contain"
        />
      </div>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-between items-center gap-2 cursor-pointer">
            <div className="flex flex-col">
              <h3 className="text-base-semibold h-11 text-black dark:text-light-1 mt-2 overflow-hidden text-ellipsis">
                {book.title}
              </h3>
              <p className="text-black dark:text-light-1 h-6 overflow-hidden">
                {book.authors.map((a) => a)}
              </p>
            </div>
            <div className="relative flex w-12 h-12 justify-end">
              <Image
                src={"/assets/more.svg"}
                alt="options"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel
            className="cursor-pointer"
            onClick={() => {
              setDropdownOpen(false);
              handleSelectItem();
            }}
          >
            Edit
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuLabel className="cursor-pointer text-red-600">
                Delete
              </DropdownMenuLabel>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this book from your shelf?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDropdownOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDeleteItem();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
      {review && <div>{review?.rating}/5</div>}
    </article>
  );
};

export default BookCard;
