import { useState, useEffect, useContext } from "react";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";
import Dashboard from "../../components/DeliveryPersonnel/Dashboard";
import Cookies from "js-cookie";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../Auth/Axios";
import Loading from "../../components/common/Loading";

export default function History() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(UsersContext);
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await Api.get(`/api/deliveries/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-xsrf-token": Cookies.get("XSRF-TOKEN"),
          },
        });
        setOrderHistory(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch order history");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(selectedOrder?.id === order.id ? null : order);
  };

  const filteredOrders = orderHistory.filter((order) =>
    order.status.toLowerCase().includes(filter.toLowerCase())
  );

  const ITEMS_PER_PAGE = 5;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(filteredOrders, ITEMS_PER_PAGE);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const statusColors = {
    Pending: "text-yellow-500",
    Delivered: "text-green-500",
    Cancelled: "text-red-500",
  };
  const handleFilterChange = (status) => {
    setFilter(status);
    setIsDropdownOpen(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      {loading ? (
        <div>
          {" "}
          <Loading />
        </div>
      ) : (
        <div
          className={`transition-margin duration-200 text-text2 font-bold p-4 ${
            isOpen ? "ml-72" : "ml-3"
          }`}
        >
          <h2 className="text-2xl mb-4">Order History</h2>
          <div className="relative mb-4 flex ">
            <button onClick={toggleDropdown} className="p-2 rounded-full">
              <i className="fa-solid fa-filter"></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-48 bg-background2 border border-text2 rounded mt-1 z-10">
                <button
                  onClick={() => handleFilterChange("")}
                  className="block w-full text-left p-2 hover:bg-primary hover:text-white"
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterChange("Delivered")}
                  className="block w-full text-left p-2 hover:bg-primary hover:text-white"
                >
                  Delivered
                </button>
                <button
                  onClick={() => handleFilterChange("Pending")}
                  className="block w-full text-left p-2 hover:bg-primary hover:text-white"
                >
                  Pending
                </button>
                <button
                  onClick={() => handleFilterChange("Cancelled")}
                  className="block w-full text-left p-2 hover:bg-primary hover:text-white"
                >
                  Cancelled
                </button>
              </div>
            )}
          </div>
          <table className="min-w-full bg-background2 border border-text2">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-text2">Order ID</th>
                <th className="py-2 px-4 border-b border-text2">Date</th>
                <th className="py-2 px-4 border-b border-text2">Status</th>
                <th className="py-2 px-4 border-b border-text2">street</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <>
                  <tr
                    key={order.id}
                    onClick={() => handleOrderClick(order)}
                    className="cursor-pointer text-center "
                  >
                    <td className="py-2 px-4 border-b border-text2">
                      {order.id}
                    </td>
                    <td className="py-2 px-4 border-b border-text2">
                      {order.updated_at.slice(0, 10)}
                    </td>
                    <td
                      className={`py-2 px-4 border-b border-text2 ${
                        order.status === "Delivered"
                          ? "text-green-500"
                          : order.status === "Pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="py-2 px-4 border-b border-text2">
                      {order.street}
                    </td>
                  </tr>
                  {selectedOrder?.id === order.id && (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-2 px-4 border-b border-text2 bg-background2"
                      >
                        <div className="p-4">
                          <h3 className="text-xl mb-2">Order Details</h3>
                          <p>
                            <strong>Order ID:</strong> {selectedOrder.id}
                          </p>
                          <p>
                            <strong>Product:</strong>{" "}
                            {selectedOrder.listing?.title || "Unknown"}
                          </p>
                          <p>
                            <strong>Winning Price:</strong>{" "}
                            {selectedOrder.listing?.winning_bid_amount || "N/A"}
                          </p>
                          <p>
                            <strong>Buyer:</strong> {selectedOrder.full_name}
                          </p>
                          <p>
                            <strong>Phone:</strong> {selectedOrder.phone}
                          </p>
                          <p>
                            <strong>Address:</strong> {selectedOrder.street},{" "}
                            {selectedOrder.city}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            <span
                              className={statusColors[selectedOrder.status]}
                            >
                              {selectedOrder.status}
                            </span>
                          </p>
                          {selectedOrder.additional_info && (
                            <p>
                              <strong>Additional Info:</strong>{" "}
                              {selectedOrder.additional_info}
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
