import * as z from "zod";

export const BookValidation = z.object({
  id: z.any().optional(),
  book_id: z.string(),
  title: z.string(),
  blurb: z.string(),
  author: z.string(),
  cover: z.string(),
});
