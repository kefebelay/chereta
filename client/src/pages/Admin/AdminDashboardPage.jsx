import { useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";

export default function AdminDashboardPage() {
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
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl text-white font-bold mb-2 bg-transparent">
                Total Buyers{" "}
              </h3>
              <p className="text-3xl text-white bg-transparent">1,200</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Total Sellers
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Delivery Personnel
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Total Listings
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Active Listings
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Total Items Sold
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md text-white">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Total Revenue
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Pending Orders
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Completed Orders
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
