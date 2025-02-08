import { useContext, useEffect, useState } from "react";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";
import Dashboard from "../../components/DeliveryPersonnel/Dashboard";
import Api from "../Auth/Axios";
import Cookies from "js-cookie";
import { UsersContext } from "../../hooks/Users_Hook";

export default function Orders() {
  const { user } = useContext(UsersContext);
  const [deliveries, setDeliveries] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    async function getDeliveries() {
      try {
        const res = await Api.get(`/api/deliveries/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-xsrf-token": Cookies.get("XSRF-TOKEN"),
          },
        });
        setDeliveries(res.data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    }
    getDeliveries();
  }, [user.id]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await Api.put(
        `/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-xsrf-token": Cookies.get("XSRF-TOKEN"),
          },
        }
      );
      setDeliveries((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const ITEMS_PER_PAGE = 8;
  const filteredOrders = deliveries.filter((order) =>
    order.status.toLowerCase().includes(filter.toLowerCase())
  );
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(filteredOrders, ITEMS_PER_PAGE);

  const handleOrderClick = (order) => {
    setSelectedOrder(selectedOrder?.id === order.id ? null : order);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    setIsDropdownOpen(false);
  };

  const statusColors = {
    Pending: "text-yellow-500",
    Delivered: "text-green-500",
    Cancelled: "text-red-500",
  };

  return (
    <div>
      <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 px-10 ml-64 transition-margin duration-300 p-7">
        <h1 className="text-3xl font-bold text-center text-primary p-5">
          Orders
        </h1>
        <div className="relative mb-4 flex">
          <button onClick={toggleDropdown} className="p-2 rounded-full">
            <i className="fa-solid fa-filter"></i>
            <span className="ml-2">Filter</span>
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
        <table className="w-full border border-text2">
          <thead>
            <tr className="border-b-2 border-text2">
              <th className="bg-background2 p-3">Order ID</th>
              <th className="bg-background2 p-3">Product Name</th>
              <th className="bg-background2 p-3">Total Price</th>
              <th className="bg-background2 p-3">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <>
                <tr
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer border-b border-text2 hover:border-b-primary hover:border-b-4 transition-transform duration-300"
                >
                  <td className="py-2 text-center">{order.id}</td>
                  <td className="py-2 text-center">
                    {order.listing?.title || "Unknown"}
                  </td>
                  <td className="py-2 text-center">
                    {order.listing?.winning_bid_amount || "N/A"}
                  </td>
                  <td
                    className={`py-2 text-center ${statusColors[order.status]}`}
                  >
                    <select
                      value={order.status}
                      className="bg-background2 border border-text2 p-1"
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
                {selectedOrder?.id === order.id && (
                  <tr>
                    <td
                      colSpan="5"
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
                          <span className={statusColors[selectedOrder.status]}>
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
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
