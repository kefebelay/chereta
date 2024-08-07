import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Navbar from "../../../components/common/Navbar";
import Pagination from "../../../components/common/Pagination";
import Footer from "../../../components/common/Footer";
import usePagination from "../../../hooks/usePagination";
import SellerProfile from "../../../components/Seller/SellerProfile";

const ITEMS_PER_PAGE = 6;

export default function Items() {
  const [items, setItems] = useState([]);
  const [sellerInfo, setSellerInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const itemsResponse = await Axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        setItems(itemsResponse.data);

        const sellerResponse = await Axios.get(
          "https://randomuser.me/api/?results=100"
        );
        setSellerInfo(sellerResponse.data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(items, ITEMS_PER_PAGE);

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-9 mt-10 m-3 p-4 place-items-center">
            {currentItems.map((item, index) => (
              <div
                key={item.id}
                className="max-w-sm rounded-md overflow-hidden shadow-sm shadow-text2
                 hover:-translate-y-1 transition-transform duration-700 p-2"
              >
                <Link
                  to={`/seller/info/${
                    sellerInfo[index % sellerInfo.length].id.value
                  }`}
                >
                  <SellerProfile
                    seller={sellerInfo[index % sellerInfo.length]}
                  />
                </Link>
                <Link
                  to={`/product/${item.id}`}
                  className="block overflow-hidden"
                >
                  <img
                    className="w-ful rounded-lg hover:scale-110 transition-transform duration-500"
                    src={item.images}
                    alt="Image description"
                  />
                  <div className="px-6 pt-4">
                    <h2 className="font-bold text-xl mb-2">{item.title}</h2>
                  </div>
                </Link>
                <div className="flex justify-between p-4 bg-transparent">
                  <p className="text-birr text-base">Birr: {item.price * 74}</p>
                  <button className="btn py-2 px-4 rounded-xl bg-primary w-20 text-center text-white">
                    Bid
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}
