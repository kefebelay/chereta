import { useContext, useState, useEffect } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import Underline from "../../components/common/Underline";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../Auth/Axios";

export default function SellerDashboardPage() {
  const [Open, isOpen] = useState(true);
  const { user } = useContext(UsersContext);
  const [statistics, setStatistics] = useState([]);

  const fetchStatistics = async () => {
    try {
      if (user.roles[0].name) {
        if (user.roles[0].name === "individual_seller") {
          const response = await Api.get(
            `/api/individual-seller/${user.id}/listing-counts`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(response);
          setStatistics(response.data);
        } else if (user.roles[0].name === "company_seller") {
          const response = await Api.get(
            `/api/company-seller/${user.id}/listing-counts`
          );
          console.log(response);
          setStatistics(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStatistics();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
            <div className="bg-red-500 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Total Items
              </h3>
              <p className="text-3xl bg-transparent text-white">
                {statistics.total_listings}
              </p>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Active Items
              </h3>
              <p className="text-3xl bg-transparent text-white">
                {statistics.live_listings}
              </p>
            </div>
            <div className="bg-lime-500 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Total Items Sold
              </h3>
              <p className="text-3xl bg-transparent text-white">
                {statistics.sold_listings}
              </p>
            </div>
            <div className="bg-blue-500 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 bg-transparent text-white">
                Total Bids
              </h3>
              <p className="text-3xl bg-transparent text-white">
                {statistics.total_bids}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
