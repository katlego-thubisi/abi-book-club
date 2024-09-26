import * as z from "zod";

export const BookshelfValidation = z.object({
  id: z.any().optional(),
  createdBy: z.string(),
  bookId: z.string(),
  category: z.string(),
});
