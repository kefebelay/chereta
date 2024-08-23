import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Footer from "../../../components/common/Footer";

export default function CategoriesCard() {
  const [isLoading, setisLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function get() {
      try {
        setisLoading(true);
        const items = await Axios.get(
          "https://api.escuelajs.co/api/v1/categories"
        );
        const filteredItems = items.data.slice(0, 6);
        setItems(filteredItems);
      } catch (err) {
        console.log(err);
      } finally {
        setisLoading(false);
      }
    }
    get();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      ) : (
        <div className="bg-transparent">
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto p-9 overflow-hidden place-items-center">
            {items.map((item) => (
              <Link
                to={`/categories/${item.id}`}
                key={item.id}
                className="bg-accent shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 m-4 overflow-hidden"
              >
                <div className="h-80 w-full overflow-hidden">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover transition-transform duration-300"
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
      <Footer />
    </div>
  );
}
