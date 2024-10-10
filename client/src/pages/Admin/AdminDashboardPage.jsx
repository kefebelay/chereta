import { useEffect, useState } from "react";
import Dashboard from "../../components/Admin/Dashboard";
import Api from "../Auth/Axios";

export default function AdminDashboardPage() {
  const [open, isOpen] = useState(true);
  const [usersCount, setusersCount] = useState({} || null);

  useEffect(() => {
    async function getRolesCount() {
      const res = await Api.get("api/roles-count", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setusersCount(res.data);
      console.log(res.data);
    }

    getRolesCount();
  }, []);

  return (
    <div className="">
      <Dashboard isOpen={open} setIsOpen={isOpen} />
      <div
        className={`flex-1 px-10 ${
          open ? "ml-64" : "ml-0"
        } transition-margin duration-300`}
      >
        {!usersCount ? (
          <p>Loading...</p>
        ) : (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center m-4 mt-12 text-primary">
              Dashboard Overview
            </h2>
            <div className="bg-primary p-6 rounded-lg shadow-md mb-8">
              {" "}
              <h3 className="text-xl text-white font-bold mb-2 bg-transparent text-center">
                Total Users{" "}
              </h3>
              <p className="text-3xl text-white bg-transparent text-center">
                {usersCount.buyers}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-secondary p-6 rounded-lg shadow-md">
                {" "}
                <h3 className="text-xl text-white font-bold mb-2 bg-transparent">
                  Buyers{" "}
                </h3>
                <p className="text-3xl text-white bg-transparent">
                  {usersCount.buyers}
                </p>
              </div>
              <div className="bg-green-500 p-6 rounded-lg shadow-md">
                {" "}
                <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                  Individual Sellers
                </h3>
                <p className="text-3xl bg-transparent text-white">
                  {usersCount.individual_sellers}
                </p>
              </div>
              <div className="bg-purple-500 p-6 rounded-lg shadow-md">
                {" "}
                <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                  Delivery Personnel
                </h3>
                <p className="text-3xl bg-transparent text-white">
                  {usersCount.delivery_persons}
                </p>
              </div>
              <div className="bg-lime-500 p-6 rounded-lg shadow-md">
                {" "}
                <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                  Company Seller
                </h3>
                <p className="text-3xl bg-transparent text-white">
                  {usersCount.company_sellers}
                </p>
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
                <p className="text-3xl bg-transparent text-white">200</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
