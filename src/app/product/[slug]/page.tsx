import { stripHtml } from "@/app/utils/sttripHtml";
import { getProductBySlug } from "../../utils/getProductBySlug";
// import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import Pricestock from "@/components/ui/pricestock";
// import AddToBasketButton from "@/components/AddToBasketButton";

export const dynamic = "force-static";
export const revalidate = 3600;
interface SizeOption {
  size: string;
  price: number;
}
async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const { params } = props; // Destructure params from props
  const { slug } = await params; // Resolve the promise to extract slug

  const product = await getProductBySlug(slug);
  console.log("productPriZEEEEE", product[0].price);
  if (!product) {
    return notFound();
  }
  console.log("product iz", product[0].images[0]?.src);

  const isOutOfStock = product[0].stock_status !== "instock";
  const sizes: SizeOption[] = [
    { size: "Small", price: 9000 },
    { size: "Medium", price: 15000 },
    { size: "Large", price: 12000 },
  ];
  return (
    <div className="container mx-auto  px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {" "}
        <div
          className={`relative aspect-square  overflow-hidden rounded-1g shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {product[0].images && (
            <Image
              src={
                product[0].images[0]?.src ||
                "https://picsum.photos/805/800/?random"
              }
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300
                        hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div
              className="absolute inset-0 flex items-center justify-center
                        bg-black bg-opacity-50"
            >
              <span className="text-white font-bold text-lg">Out Of Stock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product[0].name}</h1>
            <h4 className="font-semibold">
              Stock: <span>{product[0].stock_status}</span>
            </h4>
            {/* <select className="mb-4 p-2 border rounded">
              <option value="">Select a size</option>
              {sizes.map((sizeOption) => (
                <option key={sizeOption.size} value={sizeOption.size}>
                  {sizeOption.size} - £{sizeOption.price}
                </option>
              ))}
            </select>
            <div className="text-xl font-semibold mb-4">
              £{product[0].price}
            </div> */}
            <Pricestock data={product[0].price} />
            <div className="prose max-w-none mb-6">
              {/* {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )} */}
              {stripHtml(product[0].description)}
            </div>
          </div>

          {/* <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
