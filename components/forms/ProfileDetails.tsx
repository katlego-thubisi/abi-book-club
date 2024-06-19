"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import {
  ProfileDetailsValidation,
  UserValidation,
} from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  user: {
    id: string;
    backgroundImage: string;
    bio: string;
    occupation: string;
    phoneNumber: string;
  };
}

const ProfileDetails = ({ user }: Props) => {
  const { startUpload } = useUploadThing("media");

  const [files, setFiles] = useState<File[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ProfileDetailsValidation>>({
    resolver: zodResolver(ProfileDetailsValidation),
    defaultValues: {
      id: user.id,
      backgroundImage: user.backgroundImage ? user.backgroundImage : "",
      bio: user.bio ? user.bio : "",
      occupation: user.occupation ? user.occupation : "",
      phoneNumber: user.phoneNumber ? user.phoneNumber : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProfileDetailsValidation>) => {
    setIsLoading(true);

    if (values.backgroundImage) {
      const blob = values.backgroundImage;

      const hasImageChanged = isBase64Image(blob);
      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].fileUrl) {
          values.backgroundImage = imgRes[0].fileUrl;
        }
      }
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <section
      className="flex max-sm:flex-col gap-10 border border-solid
     border-gray-300-400 rounded-xl p-5 shadow-sm"
    >
      <h1 className="text-heading3-bold">Profile details</h1>
      <Form {...form}>
        <form className="flex flex-1 flex-col gap-2">
          <FormField
            control={form.control}
            name="backgroundImage"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="account-form_image-label overflow-hidden">
                  {field.value ? (
                    <img
                      src={field.value}
                      alt="profile_icon"
                      className="rounded-full object-contain"
                    />
                  ) : (
                    <img
                      src="/assets/profile.svg"
                      alt="profile_icon"
                      className="object-contain"
                    />
                  )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold dark:text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Add profile photo"
                    className="account-form_image-input form-label"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="form-label">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="account-form_input form-input resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="form-label">
                  Occupation (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input form-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="form-label">
                  Contact number (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input form-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
};

export default ProfileDetails;
