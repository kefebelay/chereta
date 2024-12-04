import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Footer from "../../../components/common/Footer";
import Api from "../../Auth/Axios";
import { UsersContext } from "../../../hooks/Users_Hook";

export default function CategoriesCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { url } = useContext(UsersContext);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await Api.get("/api/categories");
        setItems(response.data);
        console.log(response.data);
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
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-10 p-9">
          {items.map((item) => (
            <Link
              to={`/category/${item.id}/products`}
              key={item.id}
              className="relative group w-full h-60 rounded-md overflow-hidden shadow-sm"
            >
              <img
                src={url + item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center
               md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300`}
              >
                <h1 className="text-white text-lg font-medium bg-black p-3 bg-opacity-50">
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
