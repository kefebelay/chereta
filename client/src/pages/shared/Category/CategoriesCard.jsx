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
        <div className="grid h-screen place-items-center ">
          <Loading />
        </div>
      ) : (
        <div className="grid gap-16 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 m-3 p-9 overflow-hidden place-items-center">
          {items.map((item) => (
            <Link
              to={`/categories/${item.id}`}
              key={item.id}
              className=" h-[30rem] w-[25rem] overflow-hidden shadow-md bg-background2 rounded-md hover:-translate-y-2 duration-700 transition-transform"
            >
              <h1 className="text-center p-3 bg-transparent font-bold">
                {item.name}
              </h1>
              <div className="h-60 p-3 bg-transparent">
                <img
                  src={item.image}
                  className="rounded-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}
