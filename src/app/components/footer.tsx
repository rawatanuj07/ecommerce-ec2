import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { MdOutlinePermContactCalendar } from "react-icons/md";

export default function Footer() {
  return (
    <div className="sticky z-5 bottom-0 lg:hidden w-full flex justify-between items-center bg-white text-black h-16 border-t-2">
      <div className="flex-1 flex flex-col justify-center items-center border border-gray-300 h-full">
        <Link href="/">
          <IoHome />
          <span>Home</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center border border-gray-300 h-full">
        <Link href="/register">
          <FaUser />
          <span>Register</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center border border-gray-300 h-full">
        <Link href="/full">
          <HiMiniShoppingBag />
          <span>Products</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center border border-gray-300 h-full">
        <Link href="/contact">
          <MdOutlinePermContactCalendar />
          <span>Contact-Us</span>
        </Link>
      </div>
    </div>
  );
}
