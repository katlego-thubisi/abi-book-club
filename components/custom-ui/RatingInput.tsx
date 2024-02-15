import React, { useState } from "react";
import Image from "next/image";

interface Props {
  selectedRate: (rating: number) => void;
  defaultRating: number;
}

const Rating = ({ selectedRate, defaultRating }: Props) => {
  const [rating, setRating] = useState(defaultRating);

  const handleClick = (newRating: number) => {
    setRating(newRating);

    selectedRate(newRating);
  };

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index + 1)}
          style={{ cursor: "pointer", color: index < rating ? "gold" : "gray" }}
        >
          {index < rating ? (
            <Image
              src="/assets/rating-filled.svg"
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
