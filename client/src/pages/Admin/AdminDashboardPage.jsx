import { useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";
import { useLocation } from "react-router-dom";

export default function AdminDashboardPage() {
  const location = useLocation();
  const [Open, isOpen] = useState(true);
  return (
    <div className="">
      <Dashboard isOpen={Open} setIsOpen={isOpen} />
      <div
        className={`flex-1 px-10 ${
          Open ? "ml-64" : "ml-0"
        } transition-margin duration-300`}
      >
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Total Buyers</h3>
              <p className="text-3xl">1,200</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Total Sellers</h3>
              <p className="text-3xl">300</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Delivery Personnel</h3>
              <p className="text-3xl">50</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Total Listings</h3>
              <p className="text-3xl">5,000</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Active Listings</h3>
              <p className="text-3xl">4,500</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Total Items Sold</h3>
              <p className="text-3xl">10,000</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Total Revenue</h3>
              <p className="text-3xl">$500,000</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Pending Orders</h3>
              <p className="text-3xl">150</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Completed Orders</h3>
              <p className="text-3xl">9,850</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
            <ul>
              <li className="mb-2">
                Order #12345 - John Doe - $150.00 - Completed
              </li>
              <li className="mb-2">
                Order #12346 - Jane Smith - $200.00 - Pending
              </li>
              <li className="mb-2">
                Order #12347 - Bob Johnson - $300.00 - Shipped
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
