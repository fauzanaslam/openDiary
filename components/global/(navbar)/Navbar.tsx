"use client";

import React from "react";
import Link from "next/link";
import NavbarButton from "./NavbarButton";
import { useUser } from "@clerk/nextjs";

const Navbar = (): React.ReactElement => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <p>please wait..</p>;
  return (
    <div className="w-full flex justify-center">
      <div className="container">
        <div className="navbar bg-base-100 flex justify-center">
          {isSignedIn ? (
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href="/dashboard">Create Diary</Link>
                  </li>
                  <li>
                    <Link href="/dashboard/my-diary">My Diary</Link>
                  </li>
                  <li>
                    <Link href="/dashboard/my-comments">My Comments</Link>
                  </li>
                </ul>
              </div>
              <Link href="/" className="text-xl font-bold px-4">
                OpenDiary
              </Link>
            </div>
          ) : (
            <Link href="/" className="text-xl font-bold px-4">
              OpenDiary
            </Link>
          )}

          {isSignedIn ? (
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal gap-2">
                <li>
                  <Link href="/dashboard" className="font-bold">
                    Create Diary
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/my-diary" className="font-bold">
                    My Diary
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/my-comments" className="font-bold">
                    My Comments
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}

          <div className="navbar-end">
            <NavbarButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
