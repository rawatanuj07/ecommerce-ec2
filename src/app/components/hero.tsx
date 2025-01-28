"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client"; // Adjust the path based on your project structure
import { Carousel as CarouselType } from "../../../sanity.types"; // Adjust the path to your types file

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCurtain, setShowCurtain] = useState(true); // State to manage curtain visibility
  const [slides, setSlides] = useState<CarouselType["heroSlides"] | null>(null);

  useEffect(() => {
    // Delay curtain removal by 2 seconds whenever the slide changes
    // Fetch slides data from Sanity
    client
      .fetch<CarouselType>(
        '*[_type == "carousel"][0]{heroSlides[]{image{asset->{url}}, text}}'
      )
      .then((data) => {
        if (data) {
          setSlides(data.heroSlides || null);
        } else {
          console.error("No data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    setShowCurtain(true);
    const timer = setTimeout(() => setShowCurtain(false), 1500);
    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [activeIndex]);

  return (
    <div
      style={{
        backgroundColor: "#4e423c",
        color: "white",
        width: "100vw",
        // height: "50vh",
      }}
      className=" h-[50vh] lg:h-[100vh]"
    >
      <Carousel
        transitionTime={activeIndex === 0 ? 0 : 1200} // No transition time for the first slide
        autoPlay
        interval={5000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        showIndicators={false}
        swipeable={false}
        stopOnHover={false}
        onChange={(index) => setActiveIndex(index)} // Track the active slide index
      >
        {[
          slides && slides[0]?.image?.asset
            ? slides[0].image.asset.url
            : "No URL",
          slides && slides[1]?.image?.asset
            ? slides[1].image.asset.url
            : "No URL",
          slides && slides[2]?.image?.asset
            ? slides[2].image.asset.url
            : "No URL",
        ].map((image, i) => (
          <div key={i} className="relative w-full h-[50vh] lg:h-[100vh]">
            <Image
              src={image.startsWith("http") ? image : `/${image}`}
              alt={`Slide ${i + 1}`}
              layout="fill"
              objectFit="cover"
            />

            {/* Curtain Effect */}
            <div
              className={`curtain ${
                showCurtain && activeIndex === i ? "" : "slide"
              }`}
            />

            {/* Heading */}
            <h1
              style={{
                position: "absolute",
                width: "80%",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className={activeIndex === i && !showCurtain ? "pop-up" : ""}
            >
              {slides && slides[i]?.text}
            </h1>
          </div>
        ))}
      </Carousel>
      <style jsx>{`
        /* General Heading Style */
        h1 {
          font-size: 4rem;
          font-weight: bold;
          text-align: center;
          color: white;
          opacity: 0; /* Initially hidden */
        }

        /* Pop-Up Animation for Heading */
        .pop-up {
          transform: translateY(
            20px
          ); /* Starts slightly below its final position */
          opacity: 1; /* Becomes fully visible */
          transition:
            transform 1s ease-out 0.5s,
            opacity 1s ease-out 0.5s; /* Delayed smooth animation */
          transform: translateY(0); /* Final position */
        }

        /* Curtain Effect */
        .curtain {
          position: absolute;
          top: 0;
          right: 100%; /* Curtain starts from the right */
          width: 100%;
          height: 100%;
          background: rgba(
            0,
            0,
            0,
            0.8
          ); /* Black curtain with constant opacity */
          z-index: 2; /* Above the slide */
          transition: transform 1.5s ease-out; /* Smooth slide-out animation */
        }

        /* Slide Curtain Off-Screen */
        .curtain.slide {
          transform: translateX(300%); /* Move off-screen to the left */
        }
      `}</style>
    </div>
  );
}
