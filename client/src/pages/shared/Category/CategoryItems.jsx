import { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/common/Navbar";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Footer from "../../../components/common/Footer";
import Api from "../../Auth/Axios";
import SellerProfile from "../../../components/Seller/SellerProfile";
import { UsersContext } from "../../../hooks/Users_Hook";
import RemainingTime from "../../../components/common/Remaining_time";

export default function CategoryItems() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { url } = useContext(UsersContext);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const Response = await Api.get(`/api/category/${id}/listings`);
        setCategory(Response.data.category);
        setItems(Response.data.listings);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      ) : (
        <div className="mt-24">
          {!items ? (
            <h1 className="text-center m-6 text-2xl font-bold text-secondry">
              no items found
            </h1>
          ) : (
            <div>
              <h1 className="text-center m-6 text-4xl font-bold text-primary">
                {category}
              </h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 mt-5 p-4 place-items-center">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className=" p-6 rounded-lg shadow-sm shadow-text2 hover:shadow-xl transition-shadow duration-300"
                  >
                    <Link to={`/seller/info/${item.user.id}`}>
                      <SellerProfile seller={item.user} />
                    </Link>

                    <Link to={`/product/${item.id}`} className="block">
                      <img
                        className="w-full rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                        src={url + item.image}
                        alt="Product"
                      />
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-semibold text-primary">
                          Birr: {item.starting_price}
                        </p>
                        <button className="btn bg-primary text-white px-4 py-2 rounded-lg">
                          Detail
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        <RemainingTime
                          bidEndTime={item.bid_end_time}
                          createdAt={item.created_at}
                        />
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
