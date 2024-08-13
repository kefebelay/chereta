import { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/common/Pagination";
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
  return (
    <div>
      <SellerDashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 px-10 ml-64 transition-margin duration-300 p-7">
        <h1 className="text-3xl font-bold text-center text-primary p-3">
          Orders
        </h1>
        <table className="w-full border border-text2">
          <thead>
            <tr className="border-b-2 border-text2">
              <th className="bg-background2 p-3">Id</th>
              <th className="bg-background2 p-3">Product</th>
              <th className="bg-background2 p-3">Quantity</th>
              <th className="bg-background2 p-3">Price</th>
              <th className="bg-background2 p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr
                key={order.id}
                className="border-b border-text2 hover:border-b-primary hover:border-b-4 transition-transform duration-300"
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
