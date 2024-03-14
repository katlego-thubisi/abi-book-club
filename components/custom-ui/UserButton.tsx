"use client";

import { fetchUser } from "@/lib/actions/user.actions";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

const UserButton = () => {
  const { userId, isSignedIn } = useAuth();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const user: any = userId ? await fetchUser(userId) : null;
        setCurrentUser(user);
        console.log("Zee user", user);
        setLoadingUser(false);
      } catch (error) {
        console.log("Error fetching user", error);
        setLoadingUser(false);
      }
    }

    isSignedIn && !currentUser && loadUser();
  }, []);

  return (
    <div className="flex">
      {loadingUser && !isSignedIn ? (
        <p>Loading...</p>
      ) : (
        <div className="flex h-10 w-10 rounded-full justify-center relative">
          <Image
            src={currentUser ? currentUser.image : "/assets/placeholder.png"}
            alt="community_logo"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default UserButton;
