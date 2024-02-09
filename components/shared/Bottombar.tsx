"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";
import { useContext, useEffect, useState } from "react";
import MyThemeContext from "@/store/ThemeContext";

function Bottombar() {
  const pathname = usePathname();
  const { isDarkTheme } = useContext(MyThemeContext);

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-red-800"}`}
            >
              <Image
                src={isDarkTheme ? link.dimgURL : link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className="object-contain"
              />

              <p className="text-subtle-medium text-black dark:text-light-1 max-sm:hidden">
                {link.label === "Book Clubs"
                  ? "Clubs"
                  : link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
