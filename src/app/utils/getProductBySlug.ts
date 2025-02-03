export const getProductBySlug = async (slug: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/fetchh?type=product&slug=${slug}`);
    if (!res.ok) {
      console.log("THROWWW is");
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Product data is", data);

    return data;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
  }
};
