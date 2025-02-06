import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { MdOutlinePermContactCalendar } from "react-icons/md";

export default function Footer() {
  return (
    <div className="sticky z-5 bottom-0 lg:hidden w-full flex justify-between items-center bg-white text-black h-16 border-t-2">
      <Link
        href="/"
        className="flex-1 flex flex-col justify-center items-center border border-gray-300 h-full"
      >
        <IoHome />
        <span>Home</span>
      </Link>
      <Link
        href="/register"
        className="flex-1 flex flex-col justify-center items-center border border-gray-300 h-full"
      >
        <FaUser />
        <span>Register</span>
      </Link>
      <Link
        href="/full"
        className="flex-1 flex flex-col justify-center items-center border border-gray-300 h-full"
      >
        <HiMiniShoppingBag />
        <span>Products</span>
      </Link>
      <Link
        href="/contact"
        className="flex-1 flex flex-col justify-center items-center border border-gray-300 h-full"
      >
        <MdOutlinePermContactCalendar />
        <span>Contact-Us</span>
      </Link>
    </div>
  );
}
