"use client";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import MyThemeContext from "@/store/ThemeContext";
import { Switch } from "@/components/ui/switch";

function Topbar() {
  const themeCtx: { isDarkMode?: boolean; toggleThemeHandler: () => void } =
    useContext(MyThemeContext);
  const { isDarkTheme } = useContext(MyThemeContext);

  function toggleThemeHandler(): void {
    themeCtx.toggleThemeHandler();
  }

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src={isDarkTheme ? "/assets/logo-white.png" : "/assets/logo.png"}
          alt="=Abi logo"
          width={48}
          height={48}
        />
        <p className="text-heading3-bold text-black dark:text-light-1 max-xs:hidden ">
          Abi's Book Club
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer mx-10">
                <Image
                  src={
                    isDarkTheme ? "/assets/logout-w.svg" : "/assets/logout.svg"
                  }
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <Switch onClick={toggleThemeHandler} />
        <p className="font-bold text-black dark:text-light-1 max-xl:hidden">
          Toggle Theme
        </p>
      </div>
    </nav>
  );
}

export default Topbar;
