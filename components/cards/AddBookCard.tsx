"use client";

import Image from "next/image";

interface Props {
  handleSelectItem: () => void;
}

const AddBookCard = ({ handleSelectItem }: Props) => {
  return (
    <div
      onClick={() => handleSelectItem()}
      className="sticky top-0 right-1 rounded-md p-2 cursor-pointer 
      hover:bg-gray-100 hover:border-white  ease-in-out transition-all 
      duration-300 dark:hover:bg-dark-4"
    >
      <Image
        src={"/assets/add-circle.svg"}
        alt="Add book"
        height={96}
        width={96}
      />
    </div>
  );
};

export default AddBookCard;
