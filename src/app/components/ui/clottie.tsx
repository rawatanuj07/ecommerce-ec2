"use client";
import React, { useEffect, useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { stripHtml } from "../../utils/sttripHtml";
import { client } from "../../../sanity/lib/client"; // Adjust the path based on your project structure
import Link from "next/link";
import dynamic from "next/dynamic";
import "@lottiefiles/lottie-player"; // Import the Lottie player
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Clottie: React.FC = () => {
  const [categories, setCategories] = useState<
    {
      id: number;
      name: string;
      description: string;
      slug: string;
      image: { src: string } | null;
    }[]
  >([]);
  const [sectionStyles, setSectionStyles] = useState({
    footerImage: "",
    backgroundImage: "",
    categoriesBackgroundColor: "#ede5e2",
    textColor: "#000000",
    parallaxImage: "", // Add parallax image state
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/fetchh?type=categories");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const filteredCategories = data.filter(
          (category: { name: string }) => category.name !== "Uncategorized"
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div
      className="relative h-1/2"
      style={{ backgroundColor: sectionStyles.categoriesBackgroundColor }}
    >
      <div
        className="absolute overflow-hidden inset-0 z-0 block md:hidden"
        style={{ transform: "translateY(-10%)" }}
      >
        <DotLottieReact
          src="lotties/pink.json"
          loop
          autoplay
          style={{ width: "400px", height: "450px" }}
        />
      </div>
      <div
        className="absolute inset-0 mt-24 z-0 block md:hidden"
        style={{ transform: "scaleX(-1)" }}
      >
        <DotLottieReact
          src="lotties/pink.json"
          loop
          autoplay
          style={{ width: "410px", height: "450px" }}
        />
      </div>

      <div className="relative text-center mt-18 z-0">
        <h1 className="text-green-950 px-2 bg-white md:bg-transparent bg-opacity-70 border rounded-lg text-5xl mt-6 mb-12  inline-block mx-auto">
          CATEGORIES
        </h1>

        <Carousel
          responsive={responsive}
          showDots={false}
          infinite
          autoPlay={false}
          keyBoardControl
          customTransition="transform 0.5s ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-20-px flex justify-center"
          className="mb-4 sm:mb-8 flex"
        >
          {categories.map((category) => (
            <Link href="/full" key={category.id}>
              <div className="category-item mb-2 sm:mb-8 flex-1">
                <div className="category-image-wrapper">
                  {category.image && category.image.src && (
                    <img
                      src={category.image.src}
                      alt={category.name}
                      className="category-image"
                    />
                  )}
                </div>
                <h1 className="mt-6 px-2 font-bold text-2xl bg-white bg-opacity-70 border rounded-lg">
                  {category.name}
                </h1>
                <h1 className="mt-0 sm:mt-6 px-2 font-sm text-xl md:text-sm text-black italic bg-white md:bg-transparent bg-opacity-70 border rounded-lg">
                  {category.description}
                </h1>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>

      <style jsx>{`
        .category-item {
          text-align: center;
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .category-image-wrapper {
          position: relative;
          width: 245px;
          height: 245px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        @media (min-width: 1024px) {
          .category-image-wrapper {
            width: 300px;
            height: 300px;
          }
        }
        .category-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
          transform-origin: center; /* Ensure scaling from the center */
        }
        .category-item:hover .category-image-wrapper {
          border: 8px solid #0f3a00;
          transform: scale(1.1);
        }
        .category-item:hover .category-image {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Clottie;
