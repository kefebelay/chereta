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
        <div className="bg-transparent ">
          <h1 className="text-4xl text-center p-10 font-extrabold bg-transparent text-primary">
            Popular Categories
          </h1>
          <div className="grid gap-6 md:grid-cols-3 place-items-center grid-cols-1 m-3 p-3 bg-transparent">
            {items.map((item) => (
              <Link
                to={`/categories/${item.id}`}
                key={item.id}
                className=" shadow-md rounded-lg hover:-translate-y-1 transition-transform duration-700 m-12 bg-accent"
              >
                <h1 className="text-center p-3 font-bold text-lg bg-transparent text-white">
                  {item.name}
                </h1>
                <div className="h-auto p-3 bg-transparent">
                  <img
                    className="rounded-lg hover:scale-105 transition-transform duration-500 overflow-hidden"
                    src={item.image}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
