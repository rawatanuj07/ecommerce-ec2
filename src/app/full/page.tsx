// import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/getProducts";

import { fetchCategories } from "../utils/getCategories";

// import ProductGrid from "./ProductGrid";
import { CategorySelector } from "../../components/ui/categorySelector";
import ProductGrid from "../components/ui/ProductGrid";
import ProductFilter from "@/components/ui/product-filter";
// import ProductFilter from "./ui/product-filter";
export interface Product {
  id: number;
  name: string;
  images: { src: string }[];
  price: string;
  categories: Category[]; // Ensure categories field is an array of Category objects

  description: string;
  short_description: string;
  stock_status: string;
  slug: string;
}
export interface Category {
  id: number;
  name: string;

  images: { src: string }[];

  description: string;

  slug: string;
}

export default async function AllProducts() {
  //   const [products, setProducts] = useState<
  //     {
  //       id: number;
  //       name: string;
  //       images: { src: string }[];
  //       price: string;
  //       description: string;
  //       short_description: string;
  //     }[]
  //   >([]);
  const products: Product[] = await fetchProducts();
  const categories: Category[] = await fetchCategories();

  //   const [categories, setCategories] = useState<
  //     { id: number; name: string; slug: string; image: { src: string } | null }[]
  //   >([]);

  console.log("products", products);
  console.log("categories", categories);

  return (
    <div className="flex flex-col">
      {/*categories*/}
      <div className="flex flex-col sm:flex-row  w-full">
        <div className="w-full mt-4 sm:w-[200px]">
          <CategorySelector categories={categories} />
        </div>
        <div className="w-full mt-2 sm:mt-0 md:ml-12">
          <ProductFilter />
        </div>
      </div>
      {/*products*/}
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />
          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
}
