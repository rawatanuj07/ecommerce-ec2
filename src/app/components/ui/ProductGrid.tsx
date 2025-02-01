"use client";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProdductThumb";
import { useFilterStore } from "@/app/priceFilterStore";
import { Product } from "../../full/page"; // Import the Product type
import { useValueStore } from "@/app/valueStore";

interface ProductGridProps {
  products: Product[];
}
function ProductGrid({ products }: ProductGridProps) {
  const priceRange = useFilterStore((state) => state.priceRange); // Get price range from store
  const categoryRange = useValueStore((state) => state.value); // Get category range from store
  // Filter products based on the price range and category
  const filteredProducts = products.filter((product) => {
    const price = parseInt(product.price) ?? 0; // Fallback if price is undefined
    const matchesPriceRange = price >= priceRange[0] && price <= priceRange[1];
    const matchesCategory = categoryRange
      ? product.categories.some(
          (category) => category.id.toString() === categoryRange
        )
      : true; // If categoryRange is empty, match all categories

    return matchesPriceRange && matchesCategory;
  });
  console.log("filetred are ", filteredProducts);
  if (filteredProducts.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p>No products found in this price range.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {filteredProducts?.map((product) => {
        return (
          <AnimatePresence key={product.id}>
            <motion.div
              layout
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <ProductThumb key={product.id} product={product} />
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}

export default ProductGrid;
