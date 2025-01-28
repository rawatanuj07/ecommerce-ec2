"use client";
import { useEffect, useState } from "react";
import { client as sanityClient } from "../../sanity/lib/client"; // Adjust the path based on your project structure
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as CarouselComponent } from "react-responsive-carousel";
import { Carousel, Slide } from "../../../sanity.types"; // Adjust the path to your types file
export const dynamic = "force-static";
export const revalidate = 60;
export default function Carousels() {
  const [carouselData, setCarouselData] = useState<Carousel | null>(null);

  useEffect(() => {
    // Fetch carousel data from Sanity
    const fetchCarousel = async () => {
      const data = await sanityClient.fetch(
        `*[_type == "carousel"]{
          title,
          backgroundColor,
          autoPlay,
          infiniteLoop,
          showArrows,
          swipeable,
          interval,
          transitionTime,
          slides[]{
            text,
            backgroundColor
          }
        }`
      );
      console.log("Fetched carousel data:", data); // Debugging information
      setCarouselData(data[0]); // Assuming you're fetching only one carousel document
    };

    fetchCarousel();
  }, []);

  if (!carouselData) {
    console.log("data groq", carouselData);
    // console.log("data groq", carouselData[0]);
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: carouselData.backgroundColor?.hex,
        color: "white",
      }}
    >
      <CarouselComponent
        autoPlay={carouselData.autoPlay}
        infiniteLoop={carouselData.infiniteLoop}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        showIndicators={false}
        swipeable={carouselData.swipeable}
        interval={carouselData.interval || 3000}
        transitionTime={carouselData.transitionTime || 500}
      >
        {carouselData.slides?.map((slide: Slide, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
            }}
          >
            <h1>{slide.text}</h1>
          </div>
        ))}
      </CarouselComponent>
    </div>
  );
}
