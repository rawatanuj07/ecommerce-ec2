export const fetchCategories = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${baseUrl}/api/fetchh?type=categories`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const filteredCategories = data.filter(
      (category: { name: string }) => category.name !== "Uncategorized"
    );
    return filteredCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
