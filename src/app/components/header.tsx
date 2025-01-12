"use client";
import React, { useState } from "react";
import { Divide as Hamburger } from "hamburger-react";
import { BsCart4 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { RiShoppingCart2Fill } from "react-icons/ri";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="relative bg-white text-black p-4">
      {/* Header Content */}
      <div className="flex items-center lg:hidden justify-between">
        {/* Hamburger Menu (Mobile & Tablet) */}
        {/* <button
          onClick={toggleSidebar}
          className="bg-gray-800 p-2 rounded lg:hidden"
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button> */}
        <div
          className={`lg:hidden transform bg-white rounded rounded-lg transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-72 -translate-y-12 z-50" : ""
          }`}
        >
          <Hamburger
            toggled={isSidebarOpen}
            toggle={toggleSidebar}
            size={24}
            duration={1.4}
            color="black"
            distance="md"
          />
        </div>
        <h1 className="text-xl">LOGO</h1>
        <RiShoppingCart2Fill size={28} />
      </div>
      <div className="hidden lg:flex flex-row justify-between p-3 items-center w-full">
        <div
          className="flex flex-row justify-between items-center "
          style={{ width: "85%" }}
        >
          <h1>Home</h1>
          <h1>ABOUT ME</h1>
          <h1>MY PROJECTS</h1>
          <h1>COLLECTIONS</h1>
          <h1>Logo</h1>
          <h1>ACHIEVEMENTS</h1>
          <h1>TESTIMONIALS</h1>
          <h1>CONTACT</h1>
        </div>

        <div className="flex space-x-3" style={{ width: "10%" }}>
          <FaRegUserCircle />

          <BsCart4 size={24} />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-black w-3/4 max-w-sm transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-40`}
      >
        <div className="p-4 mt-16 ml-4">
          <h2 className="text-4xl text-center font-semibold mb-8">LOGO</h2>
          <ul className="space-y-6">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Me
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                My Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Collections
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Achievements
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-30 lg:hidden z-30"
        ></div>
      )}
    </header>
  );
};

export default Header;
