import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function PopularCategories() {
  const [isLoading, setisLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function get() {
      try {
        setisLoading(true);
        const response = await Axios.get(
          "https://api.escuelajs.co/api/v1/categories"
        );
        const limitedItems = response.data.slice(0, 3);
        setItems(limitedItems);
      } catch (err) {
        console.log(err);
      } finally {
        setisLoading(false);
      }
    }
    get();
  }, []);

  return (
    <div className="bg-transparent mb-10">
      {isLoading ? (
        <div className="grid h-screen place-items-center bg-transparent">
          <Loading />
        </div>
      ) : (
        <div className="bg-transparent">
          <h1 className="text-4xl text-center p-8 font-extrabold bg-transparent text-primary">
            Popular Categories
          </h1>
          <p className="text-center text-text2 bg-transparent">
            Here are the most popular categories chosen by our buyers and
            sellers
          </p>
          <div className="grid gap-8 md:grid-cols-3 grid-cols-1 px-20 p-5 bg-transparent m">
            {items.map((item) => (
              <Link
                to={`/categories/${item.id}`}
                key={item.id}
                className="bg-accent shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 m-4 overflow-hidden"
              >
                <div className="h-64 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="p-4 bg-primary text-center">
                  <h1 className="text-xl font-semibold text-white bg-transparent">
                    {item.name}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
