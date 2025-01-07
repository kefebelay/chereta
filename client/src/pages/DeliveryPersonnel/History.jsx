import { useState } from "react";
import Dashboard from "../../components/DeliveryPersonnel/Dashboard";

export default function History() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const orderHistory = [
    {
      id: 1,
      date: "2023-10-01",
      status: "Delivered",
      details: "Order #1 details",
    },
    {
      id: 2,
      date: "2023-10-02",
      status: "Pending",
      details: "Order #2 details",
    },
    // Add more orders as needed
  ];

  const handleOrderClick = (order) => {
    setSelectedOrder(selectedOrder?.id === order.id ? null : order);
  };

  const filteredOrders = orderHistory.filter((order) =>
    order.status.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />
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
              <th className="py-2 px-4 border-b border-text2">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <>
                <tr
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer"
                >
                  <td className="py-2 px-4 border-b border-text2">
                    {order.id}
                  </td>
                  <td className="py-2 px-4 border-b border-text2">
                    {order.date}
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
                    {order.details}
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
                          <strong>Date:</strong> {selectedOrder.date}
                        </p>
                        <p>
                          <strong>Status:</strong> {selectedOrder.status}
                        </p>
                        <p>
                          <strong>Details:</strong> {selectedOrder.details}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
