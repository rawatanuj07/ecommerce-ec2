"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Carousels() {
  return (
    <div style={{ backgroundColor: "#4e423c", color: "white" }}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        showIndicators={false}
        swipeable={false}
      >
        <div>
          <h1>
            Exclusive Art Collections • Hand-Painted Masterpieces • 24/7
            Customer Support
          </h1>
        </div>
        <div>
          <h1>Enhance Your Space with Art • Limited Time Offers • Shop Now</h1>
        </div>
        <div>
          <h1>
            Exclusive Deals on Paintings • Handcrafted Artworks • Shop the
            Collection
          </h1>
        </div>
        <div>
          <h1>
            Free shipping over ₹15000 • Happiness guarantee • Delivery in 7-10
            business days
          </h1>
        </div>
      </Carousel>
    </div>
  );
}
