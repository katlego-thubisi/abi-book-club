"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

import { AddressValidation } from "@/lib/validations/address";
import { updateUserAddress } from "@/lib/actions/user.actions";
import GoogleAddressInput from "../custom-ui/GoogleAddressInput";

interface Props {
  address: {
    _id?: string;
    id?: string;
    streetLine1: string;
    streetLine2: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    countryCode: string;
    isPrimary: boolean;
  };
  userId: string;
  btnTitle: string;
  handleClose?: () => void;
}

const Address = ({ address, btnTitle, handleClose, userId }: Props) => {
  const pathname = usePathname();

  const [place, setPlace] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof AddressValidation>>({
    resolver: zodResolver(AddressValidation),
    defaultValues: {
      _id: address?._id ? address._id : undefined,
      id: address?.id ? address.id : undefined,
      streetLine1: address?.streetLine1 ? address.streetLine1 : "",
      streetLine2: address?.streetLine2 ? address.streetLine2 : "",
      city: address?.city ? address.city : "",
      province: address?.province ? address.province : "",
      postalCode: address?.postalCode ? address.postalCode : "",
      country: address?.country ? address.country : "",
      countryCode: address?.countryCode ? address.countryCode : "",
    },
  });

  const handleSelectPlace = (place: any) => {
    if (place) {
      setPlace(place.formatted_address);

      form.setValue(
        "streetLine1",
        place.address_components?.find((component: any) =>
          component.types.includes("street_number")
        )?.long_name
      );
      form.setValue(
        "streetLine2",
        place.address_components?.find((component: any) =>
          component.types.includes("route")
        )?.long_name
      );
      form.setValue(
        "city",
        place.address_components?.find((component: any) =>
          component.types.includes("locality")
        )?.long_name
      );

      form.setValue(
        "province",
        place.address_components?.find((component: any) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name
      );
      form.setValue(
        "country",
        place.address_components?.find((component: any) =>
          component.types.includes("country")
        )?.long_name
      );
      form.setValue(
        "postalCode",
        place.address_components?.find((component: any) =>
          component.types.includes("postal_code")
        )?.long_name
      );
      form.setValue(
        "countryCode",
        place.address_components?.find((component: any) =>
          component.types.includes("country")
        )?.short_name
      );
    }
  };

  const onSubmit = async (values: z.infer<typeof AddressValidation>) => {
    setIsLoading(true);

    await updateUserAddress(
      {
        id: values.id,
        streetLine1: values.streetLine1,
        streetLine2: values.streetLine2,
        city: values.city,
        province: values.province,
        postalCode: values.postalCode,
        country: values.country,
        countryCode: values.countryCode,
      },
      userId,
      pathname
    );
    handleClose && handleClose();
    setIsLoading(false);
  };

  const ref = useRef();

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start sm:gap-5 gap-5 max-h-96  sm:max-h-none overflow-y-scroll scrollbar-hide"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormItem className="flex w-full flex-col gap-3">
          <FormLabel className="form-label">Enter address</FormLabel>
          <FormControl>
            <GoogleAddressInput
              onPlaceSelected={(place: any) => handleSelectPlace(place)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="streetLine1"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="form-label">Street line 1</FormLabel>
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
          name="streetLine2"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="form-label">Street line 2</FormLabel>
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
          name="city"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="form-label">City</FormLabel>
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
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="form-label">Province</FormLabel>
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
            name="postalCode"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="form-label">Postal code</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="form-label">Country </FormLabel>
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

        <Button
          type="submit"
          className="bg-red-800 dark:bg-red-800 dark:text-white"
          disabled={form.formState.isSubmitting || isLoading}
        >
          {form.formState.isSubmitting || isLoading ? "Submitting" : btnTitle}
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
};

export default Address;
