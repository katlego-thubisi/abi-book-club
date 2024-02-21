"use client";

import Image from "next/image";

interface Props {
  handleSelectItem: () => void;
}

const AddBookCard = ({ handleSelectItem }: Props) => {
  return (
    <div
      onClick={() => handleSelectItem()}
      className="flex flex-col space-y-2 rounded-md p-2 cursor-pointer
        hover:bg-slate-600 hover:border-white  ease-in-out transition-all duration-300 dark:hover:bg-gray-700 
        dark:hover:border-gray-300 dark:hover:text-gray-300"
    >
      <div className="relative">
        <Image
          src={"/assets/add-circle.svg"}
          alt="Add book"
          height={96}
          width={96}
        />
      </div>
      <p className="text-center text-slate-700 dark:text-gray-300 font-semibold text-sm">
        Add book
      </p>
    </div>
  );
};

export default AddBookCard;
