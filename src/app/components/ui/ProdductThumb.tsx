import Link from "next/link";
// import { Product } from "../../sanity.types";
import Image from "next/image";
import { stripHtml } from "../../utils/sttripHtml";
// import { imageUrl } from "@/sanity/lib/image";

import { Product } from "../../full/page"; // Import the Product type

interface ProductThumbProps {
  product: Product;
}
function ProductThumb({ product }: ProductThumbProps) {
  const isOutOfStock = product.stock_status !== "instock";
  return (
    <Link
      href={""}
      className={`group flex flex-col bg-white rounded rounded-xl border
      border-gray-200
      shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-105 overflow-hidden h-full w-full ${
        isOutOfStock ? "opacity-50" : ""
      }`}
    >
      <div className="relative aspect-square w-full h-full overflow-hidden">
        {product.images && (
          <Image
            className="object-contain
            transition-transform duration-300
            group-hover: scale-105"
            src={
              product.images[0]?.src || "https://picsum.photos/805/800/?random"
            }
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className=" text-white font-bold text-g">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {stripHtml(product.description)}
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900">${product.price}</p>
      </div>
    </Link>
  );
}

export default ProductThumb;
