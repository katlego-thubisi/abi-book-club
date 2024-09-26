import * as z from "zod";

export const AddressValidation = z.object({
  _id: z.any().optional(),
  id: z.any().optional(),
  streetLine1: z.string(),
  streetLine2: z.string(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  country: z.string(),
  countryCode: z.string(),
});
