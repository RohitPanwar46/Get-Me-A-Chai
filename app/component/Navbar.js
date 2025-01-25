"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Dropdown } from "flowbite-react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex bg-gray-900 text-white px-4 py-2 justify-between items-center flex-wrap">
      {/* Logo */}
      <Link href={"/"} className="logo font-bold relative md:pl-10 text-lg md:text-xl">
        <span className="absolute hidden md:block left-[2px] bottom-[-5px]">
          <img width={40} src="/tea.gif" alt="tea" />
        </span>
        GetMeAChai
      </Link>

      {/* Menu for Authenticated Users */}
      {session && (
        <div className="flex items-center justify-center gap-3  md:mt-0">
          <Link href={`/${session.user.name}`} className=" md:mt-0">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 md:font-medium rounded-lg text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5"
          >
            Your page
          </button>
          </Link>
          <Link href={"/dashboard"} className=" md:mt-0">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 md:font-medium rounded-lg text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5"
          >
            Dashboard
          </button>
          </Link>
          
          <button
            type="button"
            onClick={()=>{signOut()}}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 md:font-medium rounded-lg text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5"
          >
            Logout
          </button>
          
        </div>
      )}

      {/* Menu for Unauthenticated Users */}
      {!session && (
        <Link href={"/login"} className="mt-3 md:mt-0">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5"
          >
            Login
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
