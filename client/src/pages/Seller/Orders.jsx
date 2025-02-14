import { useState, useEffect, useContext } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../Auth/Axios";

export default function Orders() {
  const ITEMS_PER_PAGE = 8;
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useContext(UsersContext);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Api.get(`/api/seller-orders/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching seller orders:", error);
      }
    };

    fetchOrders();
  }, [user.id]);

  const filteredOrders = orders.filter((order) => {
    if (filter === "Arrived") {
      return order.is_arrived;
    }
    return order.status.toLowerCase().includes(filter.toLowerCase());
  });

  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(filteredOrders, ITEMS_PER_PAGE);

  return (
    <div className="">
      <SellerDashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 px-10 ml-64 transition-margin duration-300 p-7">
        <h1 className="text-3xl font-bold text-center text-primary p-5">
          Orders
        </h1>
        <div className="flex justify-start gap-6 rounded mt-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-text2 font-bold p-2 rounded bg-secondary"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Arrived">Has Arrived</option>
          </select>
        </div>
        <table className="w-full border border-text2 mt-6">
          <thead>
            <tr className="border-b-2 border-text2">
              <th className="bg-background2 p-3">Id</th>
              <th className="bg-background2 p-3">Product</th>
              <th className="bg-background2 p-3">User</th>
              <th className="bg-background2 p-3">Price</th>
              <th className="bg-background2 p-3">Status</th>
              <th className="bg-background2 p-3">Has Arrived</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr
                key={order.id}
                className="border-b border-text2 hover:border-b-primary hover:border-b-4 transition-transform duration-300"
              >
                <td className="py-2 text-center">{order.id}</td>
                <td className="py-2 text-center">{order.listing.title}</td>
                <td className="py-2 text-center">{order.user.name}</td>
                <td className="py-2 text-center">
                  {order.listing.winning_bid_amount}
                </td>
                <td
                  className={`py-2 text-center ${
                    order.status === "Pending"
                      ? "text-yellow-500"
                      : order.status === "Delivered"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className="py-2 text-center">
                  {order.is_arrived ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
