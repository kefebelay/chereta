import usePagination from "../../hooks/usePagination";
import Pagination from "../common/Pagination";

export default function LiveProducts() {
  const ITEMS_PER_PAGE = 7;

  const dummyOrders = [
    {
      id: 1,
      product: "Product A",
      quantity: 2,
      price: 800.0,
      status: "Live",
    },
    {
      id: 2,
      product: "Product B",
      quantity: 1,
      price: 798.0,
      status: "Live",
    },
    {
      id: 3,
      product: "Product C",
      quantity: 3,
      price: 134.0,
      status: "Ended",
    },
    {
      id: 4,
      product: "Product D",
      quantity: 4,
      price: 989.0,
      status: "Ended",
    },
    {
      id: 5,
      product: "Product E",
      quantity: 5,
      price: 25.0,
      status: "Live",
    },
    {
      id: 6,
      product: "Product F",
      quantity: 5,
      price: 25.0,
      status: "Ended",
    },
    {
      id: 7,
      product: "Product G",
      quantity: 5,
      price: 25.0,
      status: "Live",
    },
    {
      id: 8,
      product: "Product H",
      quantity: 5,
      price: 25.0,
      status: "Ended",
    },
  ];
  const liveOrders = dummyOrders.filter((order) => order.status === "Live");
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination(liveOrders, ITEMS_PER_PAGE);
  return (
    <div>
      <h1>Products</h1>
      <table className="w-full border border-text2">
        <thead>
          <tr className="border-b-2 border-text2">
            <th className="bg-background2 p-3">Id</th>
            <th className="bg-background2 p-3">Product</th>
            <th className="bg-background2 p-3">Quantity</th>
            <th className="bg-background2 p-3">Price</th>
            <th className="bg-background2 p-3">Status</th>
            <th className="bg-background2 p-3">Time Left</th>
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
              <td className={`py-2 text-center ${"text-red-500"}`}>
                {order.status}
              </td>
              <td className="py-2 text-center text-primary">2D 3H</td>
            </tr>
          ))}
        </tbody>
      </table>{" "}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
