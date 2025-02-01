export const fetchProducts = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/fetchh?type=products`);
    if (!res.ok) {
      console.log("THROWWW is");
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("tag products is", data);

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
