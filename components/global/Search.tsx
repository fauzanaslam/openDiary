"use client";

import { supabase } from "@/utils/supabase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";

const Search = () => {
  const [query, setQuery] = useState("");
  const [emails, setEmails] = useState<any>([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const fetchEmails = async () => {
      const { data, error }: any = await supabase.from("user").select("*");
      if (error) {
        console.error("Error fetching emails:", error);
      } else {
        setEmails(data);
      }
    };

    fetchEmails();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      setFilteredEmails(
        emails.filter((email: any) =>
          email.email.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      );
    } else {
      setFilteredEmails(emails);
    }
  }, [debouncedQuery, emails]);

  return (
    <div className="mb-10">
      <div className="relative flex flex-1 w-1/2 md:w-1/3 mx-auto">
        <input
          type="text"
          className="w-full border border-gray-200 py-2 pl-10 text-sm outline-2 rounded-md"
          placeholder="search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IoSearch size={24} className="absolute top-2 left-3 text-gray-500" />
      </div>
      <div className="flex flex-col w-1/2 md:w-1/3 mx-auto bg-black text-gray-500 items-center">
        {debouncedQuery && filteredEmails.length === 0 && (
          <div className="py-2 px-4 w-full text-center">User not found</div>
        )}
        {debouncedQuery &&
          filteredEmails.map((user: any, index) => (
            <Link
              href={user.email}
              key={index}
              className="py-2 px-4 border-b w-full flex items-center gap-2 overflow-auto"
            >
              <Image
                src={user.avatar}
                alt={user.email}
                width={25}
                height={25}
                className="bg-primary rounded-full p-1"
              />
              <p className="text-sm">{user.email}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Search;
