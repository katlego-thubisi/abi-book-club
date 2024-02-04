"use client";

import { fetchUsers } from "@/lib/actions/user.actions";
import React, { useEffect, useState } from "react";
import UserCard from "../cards/UserCard";
import { Input } from "../ui/input";

interface Props {
  userId: string;
}

const UserSearch = ({ userId }: Props) => {
  // Fetch users

  const [result, setResult] = useState<any>({ users: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [searchString, setSearchString] = useState("");

  let typingTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (searchString.trim() === "") {
        const response = await fetchUsers({
          userId: userId,
          searchString,
          pageNumber: 1,
          pageSize: 25,
        });

        setResult(response);
        setIsLoading(false);
      } else {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        typingTimeout = setTimeout(async () => {
          const response = await fetchUsers({
            userId: userId,
            searchString,
            pageNumber: 1,
            pageSize: 25,
          });

          setResult(response);
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, [searchString]);

  return (
    <>
      <div className="flex">
        <Input
          type="text"
          placeholder="Search for creators"
          onChange={(event) => setSearchString(event.target.value)}
          className="account-form_input"
        />
      </div>

      <div className="mt-14 flex flex-col gap-9">
        {isLoading ? (
          <>
            <p className="no-result">Fetching users...</p>
          </>
        ) : result.users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {result.users.map((person: any) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default UserSearch;
