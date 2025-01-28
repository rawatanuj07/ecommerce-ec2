"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
  const [categories, setCategories] = useState<
    { id: number; name: string; slug: string; image: { src: string } | null }[]
  >([]);
  console.log("products", products);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/fetchh?type=products");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched products:", data); // Debugging information
        setProducts(data);
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
        console.log("Fetched categories:", data); //    // Filter out the "Uncategorised" category
        const filteredCategories = data.filter(
          (category: { name: string }) => category.name !== "Uncategorized"
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

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

  return (
    <div className="h-1/2" style={{ backgroundColor: "#ede5e2" }}>
      <h1 className="text-center text-4xl mb-4 p-8">Our Categories</h1>
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
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-20-px"
      >
        {categories.map((category) => (
          <div key={category.id} className="category-item">
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
      {/* <h1>Products</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.images[0]?.src} alt={product.name} width={200} />
            <p>{product.price}</p>
            <p>{stripHtml(product.description)}</p>
            <p>{stripHtml(product.short_description)}</p>
          </div>
        ))}
      </div> */}
      <style jsx>{`
        .category-item {
          text-align: center;
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
        }
        .category-item:hover .category-image-wrapper {
          border: 4px solid #000;
          transform: scale(1.1);
        }
        .category-item:hover .category-image {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
