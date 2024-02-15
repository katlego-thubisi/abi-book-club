import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { BookValidation } from "@/lib/validations/book";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import GoogleBookSearch from "../custom-ui/GoogleBookSearch";
import { Input } from "../ui/input";
import Rating from "../custom-ui/RatingInput";
import { useState } from "react";
import Image from "next/image";
interface Props {
  book?: {
    id: string;
    book_id: string;
    title: string;
    blurb: string;
    author: string;
    cover: string;
  };
}

const BookshelfItem = ({ book }: Props) => {
  const [rating, setRating] = useState(0);
  const [currentBook, setCurrentBook] = useState({} as any);

  const form = useForm<z.infer<typeof BookValidation>>({
    resolver: zodResolver(BookValidation),
    defaultValues: {
      id: book?.id ? book.id : "",
      book_id: book?.book_id ? book?.book_id : "",
      title: book?.title ? book?.title : "",
      blurb: book?.blurb ? book?.blurb : "",
      author: book?.author ? book?.author : "",
      cover: book?.cover ? book.cover : "",
      //   bio: user?.bio ? user.bio : "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col justify-start sm:gap-10 gap-5 max-h-96  sm:max-h-none overflow-y-scroll scrollbar-hide">
        <FormItem className="flex w-full flex-col gap-3">
          <FormLabel className="form-label">Enter book name</FormLabel>
          <FormControl>
            <GoogleBookSearch onBookSelected={(book) => setCurrentBook(book)} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <div className="flex flex-col gap-1 items-center justify-center w-full">
          <h3 className="text-center text-heading4-medium text-black dark:text-light-1">
            {currentBook.volumeInfo?.title || "No book selected"}
          </h3>
          <div className="flex flex-col gap-1">
            <div className="relative">
              <Image
                src={currentBook?.volumeInfo?.imageLinks?.large}
                alt={currentBook?.volumeInfo?.title}
                width={96}
                height={96}
                className="cursor-pointer object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
            <div className="flex items-center justify-center relative h-32 w-32">
              <Image
                src={"/assets/want-read.svg"}
                alt="Want to read"
                height={96}
                width={96}
                className="object-cover"
              />
            </div>
            <p className="text-base-semibold text-black dark:text-light-1">
              Want to read
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
            <div className="flex items-center justify-center relative h-32 w-32">
              <Image
                src={"/assets/reading-svg.svg"}
                alt="Want to read"
                height={96}
                width={96}
                className="object-cover"
              />
            </div>
            <p className="text-base-semibold text-black dark:text-light-1">
              Currently reading
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
            <div className="flex items-center justify-center relative h-32 w-32">
              <Image
                src={"/assets/complete-read.svg"}
                alt="Already read"
                height={96}
                width={96}
                className="object-cover"
              />
            </div>
            <p className="text-base-semibold text-black dark:text-light-1">
              Already read
            </p>
          </div>
        </div>

        {/* <FormItem className="flex w-full flex-col items-center gap-3">
          <FormLabel className="form-label">Rating ({rating}/5)</FormLabel>
          <FormControl>
            <Rating
              selectedRate={(rate) => {
                setRating(rate);
              }}
              defaultRating={rating}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.title?.message}</FormMessage>
        </FormItem>
        <FormItem className="flex w-full flex-col gap-3">
          <FormLabel className="form-label">Review</FormLabel>
          <FormControl>
            <Input
              className="form-input"
              // {...form.register("title")}
              placeholder="Title"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.title?.message}</FormMessage>
        </FormItem> */}
      </form>
    </Form>
  );
};

export default BookshelfItem;
