import * as z from "zod";

export const QueueValidation = z.object({
  id: z.any().optional(),
  bookQueue: z.array(z.any()),
});
