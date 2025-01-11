"use client";
import React, { useState } from "react";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="relative bg-gray-900 text-white p-4">
      {/* Header Content */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">MyApp</h1>

        {/* Hamburger Menu (Mobile & Tablet) */}
        <button
          onClick={toggleSidebar}
          className="bg-gray-800 p-2 rounded lg:hidden"
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 w-3/4 max-w-sm transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Sidebar</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Services
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
          className="fixed inset-0 bg-black opacity-30 lg:hidden z-40"
        ></div>
      )}
    </header>
  );
};

export default Header;
