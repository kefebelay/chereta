import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import SellerProfile from "../../../components/Seller/SellerProfile";
import Api from "../../Auth/Axios";
import { UsersContext } from "../../../hooks/Users_Hook";
import RemainingTime from "../../../components/common/Remaining_time";

export default function Items() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState([]);
  const { url } = useContext(UsersContext);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const itemsResponse = await Api.get("/api/listings");
        setItems(itemsResponse.data.data);
        console.log(itemsResponse.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />

      <h1 className="text-3xl font-bold text-center mt-28 text-primary">
        Products
      </h1>
      {isLoading ? (
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      ) : (
        <div>
          {items == [] ? (
            <h1>No Items</h1>
          ) : (
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-9 mt-10 m-3 p-4 place-items-center">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="max-w-sm rounded-md overflow-hidden shadow-sm shadow-text2
                 hover:-translate-y-1 transition-transform duration-700 p-2"
                  >
                    <Link to={`/seller/info/${item.user.id}`}>
                      <SellerProfile seller={item.user} />
                    </Link>
                    <Link
                      to={`/product/${item.id}`}
                      className="block overflow-hidden"
                    >
                      <img
                        className="w-ful rounded-lg hover:scale-110 transition-transform duration-500"
                        src={url + item.image}
                        alt="Image description"
                      />
                      <div className="px-6 pt-4">
                        <h2 className="font-bold text-xl mb-2">{item.title}</h2>
                      </div>
                      <div className="flex justify-between p-4 bg-transparent">
                        <div>
                          <p className="text-birr text-base">
                            Birr: {item.starting_price}
                          </p>
                          <p className="my-1">
                            {" "}
                            <RemainingTime
                              bidEndTime={item.bid_end_time}
                              createdAt={item.created_at}
                            />
                          </p>
                        </div>
                        <button className="btn py-2 px-4 rounded-xl bg-primary w-20 text-center text-white">
                          Detail
                        </button>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <h1>{}</h1>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
