import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { BookValidation } from "@/lib/validations/book";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Rating from "../custom-ui/RatingInput";
import { useState } from "react";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface Props {
  reviewObject?: {
    rating: number;
    review: string;
  };
  onSubmit: (review: any) => void;
  back: () => void;
}

const BookshelfRating = ({ reviewObject, onSubmit, back }: Props) => {
  const [rating, setRating] = useState(
    reviewObject?.rating ? reviewObject.rating : 0
  );
  const [review, setReview] = useState(
    reviewObject?.review ? reviewObject.review : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const [book, setBook] = useState<any>(null);

  const form = useForm<z.infer<typeof BookValidation>>({
    resolver: zodResolver(BookValidation),
    defaultValues: {
      id: book?.id ? book.id : "",
      bookId: book?.book_id ? book?.book_id : "",
      title: book?.title ? book?.title : "",
      subtitle: book?.blurb ? book?.blurb : "",
      authors: book?.author ? book?.author : [],
      cover: book?.cover ? book.cover : "",
      //   bio: user?.bio ? user.bio : "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof BookValidation>) => {
    setIsLoading(true);

    onSubmit({ rating: rating, review: review });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start sm:gap-10 gap-5 max-h-96  sm:max-h-none overflow-y-scroll scrollbar-hide"
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <FormItem className="flex w-full flex-col items-center gap-3">
          <FormLabel className="form-label">{rating}</FormLabel>
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
            <Textarea
              value={review}
              placeholder="Tell us about the book"
              className="resize-none bg-white dark:bg-dark-3 dark:text-white"
              onChange={(event) => setReview(event.target.value)}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.title?.message}</FormMessage>
        </FormItem>
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => back()}
            className="bg-slate-800 dark:bg-slate-800 dark:hover:bg-dark-3 dark:text-white"
          >
            Back
          </Button>
          {form.formState.isSubmitting ||
            (isLoading ? (
              <></>
            ) : (
              <Button
                onClick={() => {
                  setRating(0);
                  form.handleSubmit(onFormSubmit);
                }}
                className="bg-red-800 dark:bg-red-800 dark:hover:bg-dark-3 dark:text-white"
              >
                {form.formState.isSubmitting || isLoading
                  ? "Submitting"
                  : "Skip"}
                {form.formState.isSubmitting ||
                  (isLoading && (
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 ml-2 text-slate-200 animate-spin dark:text-slate-600 fill-red-800"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ))}
              </Button>
            ))}

          <Button
            type="submit"
            className="bg-red-800 dark:bg-red-800 dark:hover:bg-dark-3 dark:text-white"
            disabled={form.formState.isSubmitting || isLoading || !rating}
          >
            {form.formState.isSubmitting || isLoading ? "Submitting" : "Submit"}
            {form.formState.isSubmitting ||
              (isLoading && (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 ml-2 text-slate-200 animate-spin dark:text-slate-600 fill-red-800"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ))}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookshelfRating;
