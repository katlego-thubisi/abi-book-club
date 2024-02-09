import * as z from "zod";
import { findDuplicateUserByUsername } from "../actions/user.actions";

export const UserValidation = z
  .object({
    userId: z.string(),
    profile_photo: z.string().url().nonempty(),
    name: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(30, { message: "Maximum 30 caracters." }),
    surname: z.string().optional(),
    occupation: z.string().optional(),
    username: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(30, { message: "Maximum 30 caracters." })
      .regex(/^[^@]*$/, { message: "Username cannot contain '@'." }),
    bio: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(1000, { message: "Maximum 1000 caracters." }),
  })
  .refine(
    async (value) => {
      const response = await findDuplicateUserByUsername(
        value.username,
        value.userId
      );

      if (response) {
        return false;
      }
      return true;
    },
    { path: ["username"], message: "Username already taken." }
  );
