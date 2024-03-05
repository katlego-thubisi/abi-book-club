import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  selectedRate?: (rating: number) => void;
  defaultRating: number;
}

const Rating = ({ selectedRate, defaultRating }: Props) => {
  const [rating, setRating] = useState(defaultRating);

  const handleClick = (newRating: number) => {
    if (selectedRate) {
      setRating(newRating);

      selectedRate(newRating);
    }
  };

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() =>
            rating % 1 === 0 ? handleClick(index + 0.5) : handleClick(index + 1)
          }
          style={{ cursor: "pointer" }}
        >
          {index + 1 <= rating ? (
            <Image
              src="/assets/rating-filled.svg"
              alt="shroom"
              width={30}
              height={30}
              className="cursor-pointer"
            />
          ) : index + 0.5 === rating ? (
            <Image
              src="/assets/rating-half-filled.svg"
              alt="shroom"
              width={30}
              height={30}
              className="cursor-pointer"
            />
          ) : (
            <Image
              src="/assets/rating-blank.svg"
              alt="shroom"
              width={30}
              height={30}
              className="cursor-pointer"
            />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
