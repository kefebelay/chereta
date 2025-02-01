import Api from "../../pages/Auth/Axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { UsersContext } from "../../hooks/Users_Hook";

export default function PopularCategories() {
  const [isLoading, setisLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { url } = useContext(UsersContext);

  useEffect(() => {
    async function get() {
      try {
        setisLoading(true);
        const response = await Api.get("/api/categories");
        const limitedItems = response.data.slice(0, 3);
        setItems(limitedItems);
        console.log(response.data);
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
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 px-10 p-5 bg-transparent place-items-center">
            {items.map((item) => (
              <Link
                to={`/categories/${item.id}`}
                key={item.id}
                className="bg-primary shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 m-4 overflow-hidden"
              >
                <div className="h-72 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300"
                    src={url + item.image}
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
