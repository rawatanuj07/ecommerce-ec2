"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { stripHtml } from "../utils/sttripHtml";
import { client } from "../../sanity/lib/client"; // Adjust the path based on your project structure
import Image from "next/image";

export default function Products() {
  const [products, setProducts] = useState<
    {
      id: number;
      name: string;
      images: { src: string }[];
      price: string;
      description: string;
      short_description: string;
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
    { id: number; name: string; slug: string; image: { src: string } | null }[]
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
      items: 6,
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
          className="h-1/2 "
          style={{ backgroundColor: sectionStyles.categoriesBackgroundColor }}
        >
          <h1 className="text-center text-4xl p-8">Our-Categories</h1>
          <Carousel
            responsive={responsive}
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
            className="mb-8 flex"
          >
            {categories.map((category) => (
              <div key={category.id} className="category-item mb-8 flex-1">
                <div className="category-image-wrapper">
                  {category.image && category.image.src && (
                    <img
                      src={category.image.src}
                      alt={category.name}
                      className="category-image"
                    />
                  )}
                </div>
                <h2>{category.name}</h2>
              </div>
            ))}
          </Carousel>

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
              width: 200px;
              height: 200px;
              margin: 0 auto;
              overflow: hidden;
              border-radius: 50%;
              transition: all 0.3s ease;
            }
            .category-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: all 0.3s ease;
              transform-origin: center; /* Ensure scaling from the center */
            }
            .category-item:hover .category-image-wrapper {
              border: 8px solid #ffffff;
              transform: scale(1.1);
            }
            .category-item:hover .category-image {
              transform: scale(1.1);
            }
          `}</style>
        </div>

        <div
          style={{
            backgroundImage: `url(${sectionStyles.backgroundImage})`,
          }}
        >
          <h1 className="text-center text-4xl my-12 p-8">TRENDING-TODAY!!!</h1>
          <Carousel
            responsive={responsives}
            showDots={false}
            infinite
            // autoPlay
            autoPlaySpeed={3000}
            keyBoardControl
            customTransition="transform 0.5s ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-20-px flex  justify-center"
            className="mb-8 flex"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="product-item align-center mb-8 flex-1"
              >
                <div className="trending-image-wrapper mb-4">
                  {product.images[0]?.src && (
                    <img
                      src={product.images[0].src}
                      alt={product.name}
                      className="product-image"
                    />
                  )}
                </div>
                <h2>{product.name}</h2>
                <p>₹{product.price}</p>
                <p>{stripHtml(product.description)}</p>
                {/* <p>{stripHtml(product.short_description)}</p> */}
              </div>
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
              width: 80%;
              height: 80%;
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

        <div className="h-auto bg-white z-3 flex flex-wrap justify-center items-center p-4 overflow-hidden">
          {categories.slice(0, 4).map((category) => (
            <div
              key={category.id}
              className="category-item mb-8 flex-1 max-w-sm mx-2 p-4"
            >
              <div className="category-image-wrapper rounded-lg overflow-hidden shadow-lg">
                {category.image && category.image.src && (
                  <img
                    src={category.image.src}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          className="parallax h-auto z-2 bg-fixed bg-center bg-no-repeat bg-cover relative"
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
          <div className="h-1/2 flex bg-white items-center justify-center flex-col bottom-0 w-full">
            <h1 className="text-center">Exclusive Handpicked!</h1>
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <div className="h-auto  bg-white bottom-0 w-full">
        <Carousel
          responsive={responsivet}
          showDots={true}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
          customTransition="transform 0.5s ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-20-px flex justify-center"
          className="mb-8 flex"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col space-y-8 items-center justify-center text-center p-4"
            >
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
              <p className="text-sm text-gray-600">{testimonial.location}</p>
              <button className="mt-4 px-4 py-2 border border-gray-800 rounded-full text-gray-800">
                Review
              </button>
            </div>
          ))}
        </Carousel>
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
        <div className="relative w-full h-96">
          <Image
            src={sectionStyles.footerImage}
            alt="footer"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="bg-gray-800 text-white text-center p-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Visit Us</h2>
              <p>
                C-XX, Lorem Ipsum APARTMENT, GROUND FLOOR, Diemet Ozgur, C -
                DREAM - 405601, ( hac. ), Ut
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Need Support</h2>
              <p>Call +91 982xxxxxxx</p>
              <p>Call +91 141xxxxxxx</p>
              <p>Mon - Sat : 10.00 am - 7.00 pm</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Contact via Email</h2>
              <p>artist@gmail.com</p>
              <p>theartist@gmail.com</p>
              <p>We'll get back to you.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Follow Us</h2>
              <p>Instagram</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Help Desk</h2>
              <p>Privacy policy</p>
              <p>Cancellation policy</p>
              <p>Terms & Condition</p>
              <p>Refund policy</p>
              <p>Shipping policy</p>
              <p>FAQ`&apos;`s</p>
              <p>Customizing Policy</p>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center mt-8">
              <p>Copyright © 2024 The Artist. All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
