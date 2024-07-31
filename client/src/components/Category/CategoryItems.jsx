import { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Loading from "../common/Loading";

export default function CategoryItems() {
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function get() {
      try {
        setIsLoading(true);
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
        <div className=" absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-200">
          <Loading />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-5 p-4">
          {items.map((item) => (
            <div
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
                <p className="text-gray-700 text-base">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
