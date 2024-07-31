import { useEffect, useState } from "react";
import Navbar from "../../../components/common/Navbar";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import Loading from "../../../components/common/Loading";

export default function CategoryItems() {
  const [items, setItems] = useState([]);
  const [catName, setcatName] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function get() {
      try {
        setIsLoading(true);
        const category = await Axios.get(
          `https://api.escuelajs.co/api/v1/categories/${id}`
        );
        setcatName(category.data.name);
        const response = await Axios.get(
          `https://api.escuelajs.co/api/v1/categories/${id}/products`
        );
        setItems(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    get();
  }, [id]);

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      ) : (
        <div className="mt-10">
          <h1 className="text-center m-6 text-4xl font-bold">{catName}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 mt-5 p-4 place-items-center">
            {items.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <img
                  className="w-full rounded-lg"
                  src={item.images}
                  alt="Image description"
                />
                <div className="px-6 py-4">
                  <h2 className="font-bold text-xl mb-2">{item.title}</h2>
                  <div className="flex justify-between">
                    <p className="text-accent text-base">
                      Birr: {item.price * 74}
                    </p>
                    <button className="btn bg-primary w-16 text-center">
                      Bid
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
