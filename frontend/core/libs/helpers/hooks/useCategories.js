import CategoriesContext from "context/CategoriesContext";
import { useContext, useState } from "react";
import http from "utils/http";

const useCategories = () => {
  // Initial state
  const [state, setState] = useState(null);

  // Store object(<{state, setState}>) returned from the context
  const contextStore = useContext(CategoriesContext);

  const handleFetch = async () => {
    try {
      const {
        data: {
          data: { docs },
        },
      } = await http.get("/product-categories");

      const categories = docs.map((category) => {
        const subCategories = category.subCategories.map((subCategory) => ({
          ...subCategory,
          queryString: `category=${category.slug}&subCategory=${subCategory.slug}`,
        }));

        category.subCategories = subCategories;
        category.queryString = `category=${category.slug}`;

        return category;
      });

      contextStore?.setState(categories);
    } catch (err) {
      contextStore?.setState(0);
    }
  };

  const loading = contextStore?.state === null,
    error = contextStore?.state === 0;

  return {
    store: { state, setState },
    data: contextStore?.state,
    loading,
    error,
    handleFetch,
  };
};

export default useCategories;
