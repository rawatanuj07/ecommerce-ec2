"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { stripHtml } from "../utils/sttripHtml";
import { client } from "../../sanity/lib/client"; // Adjust the path based on your project structure
// import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import dynamic from "next/dynamic";
// Dynamically import the LottieComponent with no SSR
const LottieComponent = dynamic(() => import("../components/ui/reactlottie"), {
  ssr: false,
});

// import Image from "next/image";

export default function Products() {
  const [products, setProducts] = useState<
    {
      id: number;
      name: string;
      images: { src: string }[];
      price: string;
      description: string;
      short_description: string;
      slug: string;
      categories: [{ name: string }];
      regular_price: string;
    }[]
  >([]);
  const [testimonials, setTestimonials] = useState<
    {
      name: string;
      location: string;
      description: string;
      image: { asset: { url: string } };
    }[]
  >([]);

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
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/fetchh?type=products&tag=trending");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
        console.log("tag products is", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

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

    const fetchSectionStyles = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "bodyTop"][0]{
footerImage{
                asset->{
                  url
                }
              },
            backgroundImage{
              asset->{
                url
              }
            },
            categoriesBackgroundColor,
            textColor,
              parallaxImage{
              asset->{
                url
              }
            }
          }`
        );
        setSectionStyles({
          backgroundImage: data.backgroundImage.asset.url,
          categoriesBackgroundColor: data.categoriesBackgroundColor,
          textColor: data.textColor,
          parallaxImage: data.parallaxImage.asset.url, // Set parallax image
          footerImage: data.footerImage.asset.url,
        });
      } catch (error) {
        console.error("Error fetching section styles:", error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "bodyTop"][0]{
           
            testimonials[]{
              name,
              location,
              description,
              image{
                asset->{
                  url
                }
              }
            }
          }`
        );
        setTestimonials(data.testimonials);
        console.log("testimonials data is", data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchTestimonials();

    fetchSectionStyles();
  }, []);

  const responsives = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
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
  const responsivet = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  console.log("text clor", sectionStyles.footerImage);
  return (
    <>
      <div
        className="flex flex-col justify-center"
        style={{
          // backgroundImage: `url(${sectionStyles.backgroundImage})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          color: sectionStyles.textColor,
        }}
      >
        <div
          className="relative h-1/2"
          style={{ backgroundColor: sectionStyles.categoriesBackgroundColor }}
        >
          <div className="absolute inset-0 z-0 block md:hidden ">
            <LottieComponent
              url="lotties/pink.json"
              name="Pink Animation"
              height={400}
              width={300}
            />
          </div>
          <div
            className="absolute inset-0 mt-24  z-0 block md:hidden "
            style={{ transform: "scaleX(-1)" }}
          >
            <LottieComponent
              url="lotties/pink.json"
              name="Pink Animation"
              height={370}
              width={400}
            />
          </div>

          <div className="relative text-center mt-18 z-0">
            <h1 className=" text-green-950 px-2  bg-white md:bg-transparent bg-opacity-70 border rounded-lg text-5xl my-6 mb-12 z-1 inline-block mx-auto">
              CATEGORIES
            </h1>

            <Carousel
              responsive={responsive}
              showDots={false}
              infinite
              autoPlay={false}
              // autoPlaySpeed={3000}
              keyBoardControl
              customTransition="transform 0.5s ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-20-px flex justify-center"
              className="mb-4 sm:mb-8 flex "
            >
              {categories.map((category) => (
                <Link href="/full" key={category.id}>
                  <div className="category-item mb-2 sm:mb-8 flex-1 ">
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
                    <h1 className=" mt-0 sm:mt-6 px-2 font-sm text-xl md:text-sm text-black italic bg-white md:bg-transparent bg-opacity-70 border rounded-lg">
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
              border: 2px solid white;
            }
               @media (min-width: 1024px) {
    .category-image-wrapper {
      width: 300px;
      height: 300px;
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
        {/* TREDNDING-TODAY SECTION*/}
        <div
          style={{
            backgroundImage: `url(${sectionStyles.backgroundImage})`,
          }}
        >
          <h1 className="text-center text-4xl sm:my-12 p-8">
            TRENDING TODAY!!!
          </h1>
          <Carousel
            responsive={responsives}
            showDots={false}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            keyBoardControl
            customTransition="transform 0.5s ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="flex justify-center"
            className="z-0 sm:mb-8 flex"
          >
            {products.map((product) => (
              <Link key={product.id} href={"product/" + product.slug}>
                <div className="product-item align-center md:mb-8 flex-1">
                  <h2 className="font-bold text-lg mb-2">
                    {product.categories[0].name}
                  </h2>
                  <p className="text-green-950 text-md mb-2 px-4">
                    {stripHtml(product.description)}
                  </p>
                  <div className="trending-image-wrapper mb-1">
                    {product.images[0]?.src && (
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="product-image"
                      />
                    )}
                  </div>
                  <h1 className="text-green-950 text-2xl ">{product.name}</h1>

                  <div className="flex flex-row italic text-black justify-between items-center w-full px-8">
                    <div className="flex font-md  flex-col">
                      <p className="text-red-700">
                        <del>{product.regular_price}</del>
                      </p>{" "}
                      <p>₹{product.price}</p>
                    </div>

                    <p>{stripHtml(product.short_description)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>

          <style jsx>{`
            .product-item {
              text-align: center;
              margin-top: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              flex: 1;
              height: 100%; /* Ensure all product items have the same height */
            }
            .product-image-wrapper {
              position: relative;
              width: 200px;
              height: 200px;
              margin: 0 auto;
              overflow: hidden;
              border-radius: 50%;
              transition: all 0.3s ease;
            }
            .trending-image-wrapper {
              position: relative;
              width: 85%;
              height: 400px; /* Set a fixed height for the images */
              margin: 0 auto;
              overflow: hidden;
              border-radius: 5%;
              transition: all 0.3s ease;
            }
            .product-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: all 0.3s ease;
              transform-origin: center; /* Ensure scaling from the center */
            }
            .product-item:hover .product-image-wrapper {
              border: 8px solid #ffffff;
              transform: scale(1.1);
            }
            .product-item:hover .product-image {
              transform: scale(1.1);
            }
          `}</style>
        </div>

        <div className="h-auto bg-white z-1 flex flex-wrap justify-center items-center p-4 overflow-hidden">
          {categories.slice(0, 4).map((category) => (
            <Link
              className="category-item mb-8 flex-col lg:flex-1 max-w-sm mx-2 p-4 relative group"
              key={category.id}
              href={"/full"}
            >
              <div>
                <div className="category-image-wrapper rounded-lg overflow-hidden shadow-lg relative">
                  {category.image && category.image.src && (
                    <img
                      src={category.image.src}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                  )}
                  <h1 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold  w-full text-center py-2 transition-all duration-500 ease-out group-hover:bottom-14">
                    {category.name}
                  </h1>
                  <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out bg-blue-500 text-white px-4 pb-2 rounded-full opacity-0 group-hover:opacity-100">
                    Shop Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="parallax h-auto z-1 bg-fixed bg-center bg-no-repeat bg-cover relative"
          style={{
            backgroundImage: `url(${sectionStyles.parallaxImage})`,
          }}
        >
          <div className="flex flex-col pt-48 items-center justify-center h-full">
            <h1 className="text-2xl font-bold">Wall Art Painting</h1>

            <button className="text-center text-4xl mb-72 border border-white rounded-full px-8 p-2 my-4 text-white font-bold bg-transparent">
              Shop Now!
            </button>
          </div>
          <div
            style={{ backgroundColor: sectionStyles.categoriesBackgroundColor }}
            className="h-1/2 flex  items-center justify-center flex-col bottom-0 w-full"
          >
            <div className=" relative">
              <div className="absolute inset-0 z-0 block mt-8">
                {/* <Player
                  src="lotties/bgm.json"
                  autoplay
                  loop
                  speed={1}
                  style={{ width: "100%", height: "100%" }}
                /> */}
              </div>
              <h1 className=" text-center text-green-950 px-2  bg-white md:bg-transparent bg-opacity-70 border rounded-lg text-5xl my-6 mb-12 z-1 ">
                Exclusive Handpicked!
              </h1>
              <div className="w-full  px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                  {categories.slice(0, 4).map((category) => (
                    <div
                      key={category.id}
                      className="category-item flex flex-col max-w-md mx-auto p-4"
                    >
                      <div className="rounded-lg overflow-hidden shadow-lg">
                        {category.image && category.image.src && (
                          <img
                            src={category.image.src}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                          />
                        )}
                      </div>
                      <h2 className="text-center mt-4 text-lg font-semibold">
                        {category.name}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-0">
        <div className="hidden md:block absolute inset-0 z-0 block mt-8">
          {/* <Player
            src="lotties/pink.json"
            autoplay
            loop
            speed={1}
            style={{ width: "100%", height: "100%" }}
          /> */}
        </div>
        <div className="absolute inset-0  hidden z-0 block md:block ">
          <LottieComponent
            url="lotties/pink.json"
            name="Pink Animation"
            height={1040}
            width={1500}
          />
        </div>
        <div className="h-auto z-0 bg-black bg-opacity-60  bottom-0 w-full">
          <div className="flex justify-center  items-center">
            <Carousel
              responsive={responsivet}
              showDots={false}
              infinite
              autoPlay
              autoPlaySpeed={3000}
              keyBoardControl
              customTransition="transform 0.5s ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-20-px flex justify-center"
              className="mb-8 w-full sm:w-1/2  flex items-center justify-center "
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white bg-opacity-80 mt-12 sm:mt-24 border rounded-xl space-y-8  items-center justify-center text-center p-4"
                >
                  <h1 className="text-6xl underline font-bold mb-4">
                    Testimonials
                  </h1>
                  <h1 className="text-4xl my-16 font-bold mb-4">
                    What Our Customers Are Saying
                  </h1>
                  <p className="mb-4">{testimonial.description}</p>
                  {testimonial.image && testimonial.image.asset && (
                    <img
                      src={testimonial.image.asset.url}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full mb-4"
                    />
                  )}
                  <h2 className="text-lg font-semibold">{testimonial.name}</h2>
                  <p className="text-sm text-gray-600">
                    {testimonial.location}
                  </p>
                  <button className="mt-4 px-4 py-2 border border-gray-800 rounded-full text-gray-800">
                    Review
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
          {/* Feedback Section */}
          <div className="flex justify-center items-center mt-8">
            {/* <h1>Leave a Feedback</h1> */}
            <input
              type="text"
              placeholder="Your feedback is important!"
              className="w-full max-w-lg p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
              Submit
            </button>
          </div>
          {/* Footer Image */}

          <div className="relative w-full">
            <div
              style={{
                backgroundImage: `url(https://vikkaso.com/public/asset/images/background_footer_img.png)`,
                paddingBottom: "280px",
                backgroundRepeat: "repeat-x ",
                backgroundPosition: "center-bottom",
              }}
            ></div>
            {/* <Image
            src={sectionStyles.footerImage}
            alt="footer"
            layout="fill"
            objectFit="cover"
          /> */}
          </div>
          <div
            className=" text-white text-center p-8"
            style={{ backgroundColor: "#8a8d78" }}
          >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 flex justify-center items-center">
              <div className="col-span-1">
                <h2 className="text-xl font-bold mb-4">Visit Us</h2>
                <p>
                  C-XX, Lorem Ipsum APARTMENT, GROUND FLOOR, Diemet Ozgur, C -
                  DREAM - 405601, ( hac. ), Ut
                </p>
              </div>
              <div className="col-span-1">
                <h2 className="text-xl font-bold mb-4">Need Support</h2>
                <p>Call +91 982xxxxxxx</p>
                <p>Call +91 141xxxxxxx</p>
                <p>Mon - Sat : 10.00 am - 7.00 pm</p>
              </div>
              <div className="col-span-1">
                <h2 className="text-xl font-bold mb-4">Contact via Email</h2>
                <p>artist@gmail.com</p>
                <p>theartist@gmail.com</p>
                <p>We&apos;ll get back to you.</p>
              </div>
              <div className="col-span-1">
                <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                <p>Instagram</p>
              </div>
              <div className="col-span-1">
                <h2 className="text-xl font-bold mb-4">Help Desk</h2>
                <p>Privacy policy</p>
                <p>Cancellation policy</p>
                <p>Terms & Condition</p>
                <p>Refund policy</p>
                <p>Shipping policy</p>
                <p>FAQ’s</p>
                <p>Customizing Policy</p>
              </div>
              <div className="col-span-1 md:col-span-3 lg:col-span-6 text-center mt-8">
                <hr className="bg-white mb-4"></hr>
                <p>Copyright © 2024 The Artist. All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
