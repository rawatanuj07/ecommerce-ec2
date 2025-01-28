"use client";
import React, { useState, useEffect } from "react";
import { Divide as Hamburger } from "hamburger-react";
import { BsCart4 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { client } from "../../sanity/lib/client"; // Adjust the path based on your project structure
import { Carousel } from "../../../sanity.types"; // Adjust the path to your types file

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
}

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navigationItems, setNavigationItems] = useState<
    Carousel["navigationItems"]
  >([]);
  const [woocommerceCategories, setWooCommerceCategories] = useState<
    WooCommerceCategory[]
  >([]);
  const [exclusiveTag, setExclusiveTag] = useState<string>("Exclusive");
  const [headerColor, setHeaderColor] = useState<string>("#ffffff");

  useEffect(() => {
    // Fetch navigation items and header color from Sanity
    client
      .fetch<Carousel>(
        '*[_type == "carousel"][0]{navigationItems, exclusiveTag, headerColor}'
      )
      .then((data) => {
        if (data) {
          setNavigationItems(data.navigationItems || []);
          setExclusiveTag(data.exclusiveTag || "Exclusive");
          console.log("header color is", data.headerColor?.hex);
          setHeaderColor(data.headerColor?.hex || "#ffffff");
        }
      });

    // Fetch WooCommerce categories
    fetchWooCommerceCategories()
      .then((categories) => {
        setWooCommerceCategories(categories.slice(0, 8)); // Limit to 8 categories
      })
      .catch((error) => {
        console.error("Error fetching WooCommerce categories:", error);
        setWooCommerceCategories([]); // Set to empty array if there's an error
      });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Example function to fetch WooCommerce categories
  const fetchWooCommerceCategories = async (): Promise<
    WooCommerceCategory[]
  > => {
    // Implement your WooCommerce API call here
    // This is just a placeholder
    try {
      const response = await fetch(
        "YOUR_WOOCOMMERCE_API_URL/products/categories"
      );
      const data = await response.json();
      return data.map((category: any) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
      }));
    } catch (error) {
      console.error("Error fetching WooCommerce categories:", error);
      return [];
    }
  };

  return (
    <header
      className="relative text-black p-4"
      style={{ backgroundColor: headerColor }}
    >
      {/* Header Content */}
      <div className="flex items-center lg:hidden justify-between">
        {/* Hamburger Menu (Mobile & Tablet) */}
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
      <div className="hidden lg:flex flex-row justify-between p-2 items-center w-full">
        <div
          className="flex flex-row justify-between items-center"
          style={{ width: "90%" }}
        >
          {navigationItems?.map((item, index) => (
            <React.Fragment key={index}>
              {item.label?.toLowerCase() === "collections" ? (
                <>
                  <Dropdown
                    isSidebarOpen={isSidebarOpen}
                    headerColor={headerColor}
                    label="Collections"
                    items={woocommerceCategories}
                    exclusiveTag={exclusiveTag}
                  />
                  <h1 className="text-xl mx-4">LOGO</h1>
                </>
              ) : (
                <a href={item.link} className="px-4 text-lg">
                  {item.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex space-x-8 pl-8" style={{ width: "8%" }}>
          <FaRegUserCircle size={24} />
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
            {navigationItems?.map((item, index) => (
              <li key={index}>
                {item.label?.toLowerCase() === "collections" ? (
                  <Dropdown
                    isSidebarOpen={isSidebarOpen}
                    label="Collections"
                    headerColor={headerColor}
                    items={woocommerceCategories}
                    exclusiveTag={exclusiveTag}
                  />
                ) : (
                  <a href={item.link} className="hover:underline text-lg">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
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

// Updated Dropdown component
const Dropdown = ({
  isSidebarOpen,

  label,
  items,
  exclusiveTag,
  headerColor,
}: {
  label: string;
  items: WooCommerceCategory[];
  exclusiveTag: string;
  headerColor: string;
  isSidebarOpen: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        style={{
          backgroundColor: !isSidebarOpen ? headerColor : "white",
        }}
        className={`inline-flex justify-center w-full py-2 text-lg font-medium text-gray-900 `}
      >
        {label}
        <svg
          className={`-mr-1 ml-2 h-5 w-5 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute left-0 lg:right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {items.map((item, idx) => (
              <a
                key={idx}
                href={`/${item.slug}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {item.name}
              </a>
            ))}
            <a
              href="/exclusive"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {exclusiveTag}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
