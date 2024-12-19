import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTruck } from "react-icons/fa"; // Import delivery car icon
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { FilterSidebar } from "../../components/Buyer/FilterSidebar";
// import NewNav from '../../components/common/NewNav';
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../Auth/Axios";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";

export default function BidPage() {
  const [bids, setBids] = useState([]);
  const { user, url } = useContext(UsersContext);
  useEffect(() => {
    const getBids = async () => {
      try {
        if (!user) {
          setTimeout(() => {
            getBids();
          }, 3000);
          return;
        }
        const response = await Api.get(
          `http://localhost:8000/api/my-bids/${user.id}`
        );
        setBids(response.data.bids);
        console.log(response.data.bids);
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };
    getBids();
  }, []);
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 5;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(bids, ITEMS_PER_PAGE);

  return (
    <div className="mt-20 relative">
      {/* Delivery Car Icon Button in the Top-Right Corner */}
      <button
        onClick={() => navigate("/orderlist")} // Navigate to OrderList page
        className="absolute top-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
      >
        <FaTruck className="text-xl" /> {/* Delivery Car Icon */}
      </button>

      <Navbar />
      <div className="flex gap-5">
        <FilterSidebar />
        <div className="w-4/5 mx-auto">
          <div className="p-5 m-4 shadow rounded">
            <h2 className="font-bold text-lg mb-4">My Bids</h2>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Listing ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Starting Bid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Your Bid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Highest Bid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((bid) => (
                      <tr
                        key={bid.id}
                        className="bg-white border-b hover:bg-gray-50 text-gray-900"
                      >
                        <td className="px-6 py-4">
                          <img
                            src={url + bid.listing.image}
                            alt={bid.listing.title}
                            className="w-12 h-12 rounded"
                          />
                        </td>
                        <td className="px-6 py-4">{bid.listing.title}</td>
                        <td className="px-6 py-4">{bid.listing_id}</td>
                        <td className="px-6 py-4">
                          {bid.listing.starting_price}
                        </td>
                        <td className="px-6 py-4">{bid.bid_amount}</td>
                        <td className="px-6 py-4">
                          {bid.listing.winning_bid_amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              bid.listing.status === "active"
                                ? "bg-green-100 text-green-700"
                                : bid.status === "ended"
                                ? "bg-yellow-100  text-red-700 "
                                : "bg-red-100 text-yellow-700"
                            }`}
                          >
                            {bid.listing.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-6 text-gray-500 italic"
                      >
                        No bids match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
