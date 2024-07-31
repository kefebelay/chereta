import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Navbar from "../../../components/common/Navbar";

export default function Items() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function get() {
      try {
        setIsLoading(true);
        const response = await Axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        setItems(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    get();
  }, []);
  return (
    <div>
      <Navbar />

      {isLoading ? (
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center mt-28 text-primary">
            Products
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 mt-10 p-4 place-items-center ">
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
                    <button className="py-2 px-4 rounded-xl bg-primary w-16 text-center text-white">
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
