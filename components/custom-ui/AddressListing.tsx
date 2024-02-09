import React, { useContext } from "react";
import Image from "next/image";
import MyThemeContext from "@/store/ThemeContext";
import { usePathname } from "next/navigation";
import { removeUserAddress } from "@/lib/actions/user.actions";

interface Props {
  address: [
    {
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
    },
  ];
  userId: string;
  editAddress: (address: any) => void;
  addAddress: () => void;
}

const AddressListing = ({
  address,
  userId,
  editAddress,
  addAddress,
}: Props) => {
  const { isDarkTheme } = useContext(MyThemeContext);
  const path = usePathname();

  const deleteAddress = async (address: any) => {
    await removeUserAddress(address._id, userId, path);
  };
  return (
    <div className="flex flex-col gap-2">
      {address.map((address, index) => (
        <div
          key={index}
          className="flex
          cursor-pointer  
          justify-between 
          items-center 
          border-gray-500 
          hover:bg-slate-400
          border-2 rounded-lg  dark:text-white
          group"
        >
          <div className="p-2" onClick={() => editAddress(address)}>
            <h3>Home</h3>
            <p>
              {address.streetLine1} {address.streetLine2}, {address.city},{" "}
              {address.province}, {address.postalCode}, {address.country}
            </p>
          </div>
          <div
            className="opacity-0 group-hover:opacity-100 group-hover: bg-red-500 h-full border-gray-500 px-2 relative 
            flex flex-col justify-center items-center"
            onClick={() => deleteAddress(address)}
          >
            <Image
              src={`${
                isDarkTheme ? "/assets/trash-w.svg" : "/assets/trash.svg"
              }`}
              alt={"delete"}
              width={24}
              height={24}
            />
          </div>
        </div>
      ))}

      <p
        onClick={() => addAddress()}
        className="text-center text-small-regular text-blue cursor-pointer  hover:underline"
      >
        Add address
      </p>
    </div>
  );
};

export default AddressListing;
