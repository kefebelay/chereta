import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import Navbar from "../../components/common/Navbar";
export default function OrderList() {
    const navigate = useNavigate(); // For navigating back to the previous page

    // Initial list of orders
    const [orders, setOrders] = useState([
        {
            id: 1,
            orderNumber: "ORD12345",
            item: "Laptop",
            quantity: 1,
            deliveryDate: "2024-12-20",
            status: "Pending",
        },
        {
            id: 2,
            orderNumber: "ORD12346",
            item: "Printer",
            quantity: 2,
            deliveryDate: "2024-12-22",
            status: "Pending",
        },
        {
            id: 3,
            orderNumber: "ORD12347",
            item: "Smartphone",
            quantity: 1,
            deliveryDate: "2024-12-25",
            status: "Pending",
        },
    ]);

    // Handle submitting an order
    const handleSubmit = (id) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id ? { ...order, status: "Submitted" } : order
            )
        );
    };

    return (
        <div className="mt-20 ">
            
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)} // Go back to the previous page
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
                            <th className="px-6 py-3">Quantity</th>
                            <th className="px-6 py-3">Delivery Date</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">{order.orderNumber}</td>
                                <td className="px-6 py-4">{order.item}</td>
                                <td className="px-6 py-4">{order.quantity}</td>
                                <td className="px-6 py-4">{order.deliveryDate}</td>
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
                                    {order.status === "Pending" ? (
                                        <button
                                            onClick={() => handleSubmit(order.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                                        >
                                            Submit
                                        </button>
                                    ) : (
                                        <span className="text-gray-500 italic">
                                            Submitted
                                        </span>
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
