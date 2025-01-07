import { useState } from "react";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";
import Dashboard from "../../components/DeliveryPersonnel/Dashboard";

export default function Orders() {
  const ITEMS_PER_PAGE = 8;

  const dummyOrders = [
    {
      id: 1,
      product: "Product A",
      quantity: 2,
      price: 800.0,
      status: "Pending",
    },
    {
      id: 2,
      product: "Product B",
      quantity: 1,
      price: 798.0,
      status: "Delivered",
    },
    {
      id: 3,
      product: "Product C",
      quantity: 3,
      price: 134.0,
      status: "Cancelled",
    },
    {
      id: 4,
      product: "Product D",
      quantity: 4,
      price: 989.0,
      status: "Delivered",
    },
    {
      id: 5,
      product: "Product E",
      quantity: 5,
      price: 25.0,
      status: "Pending",
    },
  ];

  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(dummyOrders, ITEMS_PER_PAGE);

  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(selectedOrder?.id === order.id ? null : order);
  };

  const filteredOrders = dummyOrders.filter((order) =>
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
    <div className="">
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
              <th className="bg-background2 p-3">Quantity</th>
              <th className="bg-background2 p-3">Total Price</th>
              <th className="bg-background2 p-3">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <>
                <tr
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer border-b border-text2 hover:border-b-primary hover:border-b-4 transition-transform duration-300"
                >
                  <td className="py-2 text-center">{order.id}</td>
                  <td className="py-2 text-center">{order.product}</td>
                  <td className="py-2 text-center">{order.quantity}</td>
                  <td className="py-2 text-center">{order.price}</td>
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
                          <strong>Product:</strong> {selectedOrder.product}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {selectedOrder.quantity}
                        </p>
                        <p>
                          <strong>Price:</strong> {selectedOrder.price}
                        </p>
                        <p>
                          <strong>Status:</strong> {selectedOrder.status}
                        </p>
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
