import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import Navbar from "../../components/common/Navbar";
import Api from "../Auth/Axios";
import Cookies from "js-cookie";
import { UsersContext } from "../../hooks/Users_Hook";
export default function OrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { user, url } = useContext(UsersContext);
  useEffect(() => {
    async function getOrders() {
      const res = await Api.get(`/api/my-orders/${user.id}`, {
        headers: { "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") },
      });
      setOrders(res.data);
      console.log(res);
    }
    getOrders();
  }, []);

  const handleSubmit = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "Submitted" } : order
      )
    );
  };

  const handleArrived = async (id) => {
    try {
      await Api.put(
        `/api/orders/${id}/arrived`,
        {},
        {
          headers: { "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, is_arrived: true } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  return (
    <div className="mt-20 ">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4  text-primary border border-gray-700 px-4 py-2 rounded hover:bg-blue-300 transition duration-300 flex items-center"
      >
        ← Back
      </button>
      <Navbar />

      <h1 className="text-3xl font-bold text-center mb-8">Order List</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3">Order Number</th>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.listing.title}</td>
                <td className="px-6 py-4">
                  <img
                    className="h-full w-12 rounded-lg"
                    src={url + order.listing.image}
                  />
                </td>
                <td className="px-6 py-4">{order.created_at}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      order.status === "Submitted"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {order.status === "Pending" && !order.is_arrived ? (
                    <button
                      onClick={() => handleArrived(order.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Mark as Arrived
                    </button>
                  ) : (
                    <span className="text-gray-500 italic">Arrived</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
