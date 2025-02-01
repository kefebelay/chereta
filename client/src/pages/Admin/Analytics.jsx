import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Dashboard from "../../components/Admin/Dashboard";
import Api from "../../pages/Auth/Axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [Open, isOpen] = useState(true);
  const [listingData, setListingData] = useState({
    labels: [
      "Total Listings",
      "Active Listings",
      "Ended Listings",
      "Listings with Winner",
    ],
    datasets: [
      {
        label: "Listings",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,0.4)",
          "rgba(75,192,192,0.6)",
          "rgba(75,192,192,0.8)",
          "rgba(75,192,192,1)",
        ],
        borderColor: ["rgba(75,192,192,1)"],
        borderWidth: 1,
      },
    ],
  });
  const [rolesData, setRolesData] = useState({
    labels: ["Buyers", "Individual Sellers", "Company Sellers"],
    datasets: [
      {
        label: "Roles",
        data: [],
        backgroundColor: [
          "rgba(255,99,132,0.4)",
          "rgba(54,162,235,0.4)",
          "rgba(255,206,86,0.4)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await Api.get("/api/roles-count", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(rolesResponse.data); // Log the response to inspect the JSON structure

        const listingStatsResponse = await Api.get("/api/listings/statistics", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(listingStatsResponse.data); // Log the response to inspect the JSON structure

        const totalListings = listingStatsResponse.data.totalListings;
        const activeListings = listingStatsResponse.data.activeListings;
        const endedListings = listingStatsResponse.data.endedListings;
        const listingsWithWinner = listingStatsResponse.data.listingsWithWinner;
        const buyersData = rolesResponse.data.buyers;
        const individualSellersData = rolesResponse.data.individual_sellers;
        const companySellersData = rolesResponse.data.company_sellers;

        setListingData({
          labels: [
            "Total Listings",
            "Active Listings",
            "Ended Listings",
            "Listings with Winner",
          ],
          datasets: [
            {
              ...listingData.datasets[0],
              data: [
                totalListings,
                activeListings,
                endedListings,
                listingsWithWinner,
              ],
            },
          ],
        });

        setRolesData({
          labels: ["Buyers", "Individual Sellers", "Company Sellers"],
          datasets: [
            {
              ...rolesData.datasets[0],
              data: [buyersData, individualSellersData, companySellersData],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <Dashboard isOpen={Open} setIsOpen={isOpen} />
      <div
        className={`flex-1 px-10 ${
          Open ? "ml-64" : "ml-0"
        } transition-margin duration-300 p-7`}
      >
        <h1 className="text-center text-3xl font-bold text-primary mt-12">
          Analytics
        </h1>
        <div className="mt-10 p-4">
          <h2 className="text-xl font-semibold mb-4">Listings Statistics</h2>
          <Bar data={listingData} />
          <h2 className="text-xl font-semibold mb-4 mt-10">
            Roles Distribution
          </h2>
          <Pie data={rolesData} />
        </div>
      </div>
    </div>
  );
}
