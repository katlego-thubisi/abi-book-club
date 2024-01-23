"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { JournalValidation } from "@/lib/validations/journal";
import { createEntry } from "@/lib/actions/journal.actions";
import { useContext, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import MyThemeContext from "@/store/ThemeContext";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import Representation from "../custom-ui/Representation";

interface Props {
  user: any;
}

function PostJournal({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const organization = useOrganization();
  const { startUpload } = useUploadThing("media");

  const [representation, setRepresentation] = useState({
    _id: null,
    image: user.image,
    name: user.name,
  });

  const [representationOptions, setRepresentationOptions] = useState([
    { image: user.image, name: user.name },
    ...user.communities,
  ]);

  const [files, setFiles] = useState<File[]>([]);

  const [blocks, setBlocks] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(JournalValidation),
    defaultValues: {
      journal: "",
      accountId: user._id,
    },
  });

  const onSubmit = async (values: z.infer<typeof JournalValidation>) => {
    setIsLoading(true);
    await createEntry({
      text: blocks,
      author: user._id,
      communityId:
        representation && representation._id ? representation._id : null,
      path: pathname,
    });

    router.push("/journal");
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Representation
          options={representationOptions}
          selectedOption={representation}
          onChange={setRepresentation}
        />
        <FormField
          control={form.control}
          name="journal"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Editor
                  apiKey="w4dg63t3nvw0nejcjlzvx5odxzjj84d8hg8oat4i7t6j3353"
                  plugins={["link", "image", "code", "lists"]}
                  toolbar="undo redo | styleselect  | bold italic underline | numlist | bullist"
                  value={blocks}
                  onEditorChange={setBlocks}
                  init={{
                    skin: "oxide",
                    height: 500,
                    images_upload_handler: async (blobInfo) => {
                      return new Promise((resolve, reject) => {
                        const blockFile = new File(
                          [blobInfo.blob()],
                          blobInfo.filename(),
                          { type: blobInfo.blob().type }
                        ); // Convert BlobInfo to File

                        const filesArray = [blockFile]; // Create a file array with the converted File object

                        startUpload(filesArray)
                          .then((data) => {
                            if (data && data[0]) {
                              const url = data[0].fileUrl;
                              resolve(url);
                            } else {
                              resolve(blobInfo.blobUri());
                            }
                          })
                          .catch((e) => {
                            console.log("Error uploading file", e);
                            reject(e);
                          });
                      });
                    },
                  }}

                  // {...field}
                />
              </FormControl>
              {/* <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1"></FormControl> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting || isLoading}
          className="bg-red-800"
        >
          {form.formState.isSubmitting || isLoading
            ? "Submitting"
            : "Post entry"}
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
      </form>
    </Form>
  );
}

export default PostJournal;
