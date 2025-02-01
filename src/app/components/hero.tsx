"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client"; // Adjust the path based on your project structure

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCurtain, setShowCurtain] = useState(true); // State to manage curtain visibility
  const [slides, setSlides] = useState<
    { image: { asset: { url: string } }; text?: string }[] | null
  >(null);

  useEffect(() => {
    // Fetch slides data from Sanity
    client
      .fetch(
        '*[_type == "carousel"][0]{heroSlides[]{image{asset->{url}}, text}}'
      )
      .then(
        (data: {
          heroSlides: { image: { asset: { url: string } }; text?: string }[];
        }) => {
          if (data) {
            setSlides(data.heroSlides || null);
          } else {
            console.error("No data found");
          }
        }
      )
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
      }}
      className=" h-[50vh] lg:h-[100vh]"
    >
      {slides && (
        <Carousel
          transitionTime={activeIndex === 0 ? 0 : 1200}
          autoPlay
          interval={5000}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          swipeable={false}
          stopOnHover={false}
          onChange={(index) => setActiveIndex(index)}
        >
          {slides.map((slide, i) => (
            <div key={i} className="relative w-full h-[50vh] lg:h-[100vh]">
              <Image
                src={slide.image.asset.url}
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
                {slide.text}
              </h1>
            </div>
          ))}
        </Carousel>
      )}
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
          transform: translateY(100%); /* Starts below its final position */
          opacity: 0; /* Initially hidden */
          transition:
            transform 0.5s ease-out,
            opacity 0.5s ease-out; /* Smooth animation */
          transform: translateY(0); /* Final position */
          opacity: 1; /* Becomes fully visible */
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
