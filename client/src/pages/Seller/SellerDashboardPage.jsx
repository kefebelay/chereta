import { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import Underline from "../../components/common/Underline";

export default function SellerDashboardPage() {
  const [Open, isOpen] = useState(true);
  return (
    <div className="">
      <SellerDashboard isOpen={Open} setIsOpen={isOpen} />
      <div
        className={`flex-1 px-10 ${
          Open ? "ml-64" : "ml-0"
        } transition-margin duration-300`}
      >
        <div className="p-6">
          <h2 className="text-3xl font-bold text-center text-primary mt-8">
            Overview
          </h2>
          <Underline mb={10} mt={7} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl text-white font-bold mb-2 bg-transparent">
                Total Sold{" "}
              </h3>
              <p className="text-3xl text-white bg-transparent">1,200</p>
            </div>

            <div className="bg-red-500 p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Total Listings
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Active Listings
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
            <div className="bg-lime-500 p-6 rounded-lg shadow-md">
              {" "}
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Total Items Sold
              </h3>
              <p className="text-3xl bg-transparent text-white">1,200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
