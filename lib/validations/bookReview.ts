import * as z from "zod";

export const BookReviewValidation = z.object({
  id: z.any().optional(),
  createdBy: z.string(),
  bookId: z.string(),
  rating: z.string(),
  review: z.string(),
});
