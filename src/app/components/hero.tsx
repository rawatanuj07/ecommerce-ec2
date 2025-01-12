"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log("curent index", activeIndex);
  return (
    <div
      style={{
        backgroundColor: "#4e423c",
        color: "white",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Carousel
        transitionTime={activeIndex === 0 ? 0 : 700} // No transition time for third slide
        autoPlay
        interval={5000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        showIndicators={false}
        swipeable={false}
        stopOnHover={false}
        onChange={
          (index) => setActiveIndex(index) // Log the
        } // Track the active slide index
      >
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
          <Image src="/c1.jpg" alt="hero" layout="fill" objectFit="cover" />
          <h1
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className={activeIndex === 0 ? "pop-up" : ""}
          >
            Slide 1
          </h1>
        </div>
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
          <Image src="/c2.jpg" alt="hero" layout="fill" objectFit="cover" />
          <h1
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className={activeIndex === 1 ? "pop-up" : ""}
          >
            Slide 2
          </h1>
        </div>
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
          <Image src="/c3.jpeg" alt="hero" layout="fill" objectFit="cover" />
          <h1
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className={activeIndex === 2 ? "pop-up" : ""}
          >
            Slide 3
          </h1>
        </div>
      </Carousel>
      <style jsx>{`
        h1 {
          font-size: 4rem; /* Increased font size for prominence */
          font-weight: bold; /* Bold text for emphasis */
          text-align: center;
          color: white;
          opacity: 0; /* Initially hidden */
        }

        .pop-up {
          transform: translateY(
            20px
          ); /* Starts slightly below its final position */
          opacity: 1; /* Becomes fully visible */
          transition: transform 1s ease-out 0.5s, opacity 1s ease-out 0.5s; /* Delayed smooth animation */
          transform: translateY(0); /* Final position */
        }
      `}</style>
    </div>
  );
}
