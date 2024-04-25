"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const NavbarButton = (): React.ReactElement => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <p>please wait..</p>;
  return isSignedIn ? (
    <UserButton afterSignOutUrl="/" />
  ) : (
    <Link href="/sign-in">Sign-In</Link>
  );
};

export default NavbarButton;
