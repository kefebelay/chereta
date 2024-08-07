import { useEffect, useState } from "react";
import Navbar from "../../../components/common/Navbar";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import Loading from "../../../components/common/Loading";
import Pagination from "../../../components/common/Pagination";
import usePagination from "../../../hooks/usePagination";
import Footer from "../../../components/common/Footer";

const ITEMS_PER_PAGE = 6;

const SellerInfo = ({ seller }) => (
  <div className="flex gap-3 p-1">
    <div className="h-14 w-14 rounded-full border-2">
      <img className="rounded-full" src={seller.picture.medium} alt="Seller" />
    </div>
    <div>
      <h2 className="text-lg font-semibold">
        {seller.name.first} {seller.name.last}
      </h2>
      <p className="text-sm text-gray-600">{seller.email}</p>
    </div>
  </div>
);

export default function CategoryItems() {
  const [items, setItems] = useState([]);
  const [catName, setcatName] = useState("");
  const [sellerInfo, setSellerInfo] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        // Fetch category name
        const categoryResponse = await Axios.get(
          `https://api.escuelajs.co/api/v1/categories/${id}`
        );
        setcatName(categoryResponse.data.name);

        // Fetch category items
        const itemsResponse = await Axios.get(
          `https://api.escuelajs.co/api/v1/categories/${id}/products`
        );
        setItems(itemsResponse.data);

        // Fetch seller info
        const sellerResponse = await Axios.get(
          "https://randomuser.me/api/?results=100"
        );
        setSellerInfo(sellerResponse.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

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
        <div className="mt-24">
          <h1 className="text-center m-6 text-4xl font-bold text-primary">
            {catName}
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 mt-5 p-4 place-items-center">
            {currentItems.map((item, index) => (
              <div
                key={item.id}
                className=" p-6 rounded-lg shadow-sm shadow-text2 hover:shadow-xl transition-shadow duration-300"
              >
                <Link
                  to={`/seller/info/${
                    sellerInfo[index % sellerInfo.length].id.value
                  }`}
                >
                  <SellerInfo seller={sellerInfo[index % sellerInfo.length]} />
                </Link>

                <Link to={`/product/${item.id}`} className="block">
                  <img
                    className="w-full rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                    src={item.images}
                    alt="Product"
                  />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-primary">
                      Birr: {item.price * 74}
                    </p>
                    <button className="btn bg-primary text-white px-4 py-2 rounded-lg">
                      Bid
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    {item.id} Days 12 Hours left
                  </p>
                </Link>
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
