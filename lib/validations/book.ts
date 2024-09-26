import * as z from "zod";

export const BookValidation = z.object({
  id: z.any().optional(),
  bookId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  authors: z.array(z.string()),
  cover: z.string(),
});
