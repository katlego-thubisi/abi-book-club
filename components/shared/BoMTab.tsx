"use client";
import React, { useEffect, useState } from "react";

const BoMTab = () => {
  const [month, setMonth] = useState("");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  useEffect(() => {
    setMonth(currentMonth);
  }, [currentMonth]);
  return (
    <section className="mt-2">
      <div className="flex justify-center items-center">
        <h1 className="text-black dark:text-light-1">Book of {month}</h1>
      </div>
    </section>
  );
};

export default BoMTab;
