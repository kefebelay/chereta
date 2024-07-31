import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";

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
        setItems(items.data);
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
        <div className="grid gap-12 md:grid-cols-3  grid-cols-1 m-3 p-3 overflow-hidden place-items-center">
          {items.map((item) => (
            <Link
              to={`/categories/${item.id}`}
              key={item.id}
              className=" h-96 w-80 "
            >
              <h1 className="text-center p-3">{item.name}</h1>
              <div className="h-60 ">
                <img src={item.image} className="tounded-md hover:scale-105 " />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
