import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Footer from "../../../components/common/Footer";

export default function CategoriesCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await Axios.get(
          "https://api.escuelajs.co/api/v1/categories"
        );
        setItems(response.data.slice(0, 6)); // Limit to 6 items
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-40 p-9">
          {items.map((item) => (
            <Link
              to={`/categories/${item.id}`}
              key={item.id}
              className="relative group w-full h-60 rounded-md overflow-hidden shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1 className="text-white text-lg font-medium bg-transparent">
                  {item.name}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}
