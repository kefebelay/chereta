import { useContext, useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Dashboard from "../../components/Seller/SellerDashboard";
import Underline from "../../components/common/Underline";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../Auth/Axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics() {
  const [Open, isOpen] = useState(true);
  const { user } = useContext(UsersContext);
  const [barData, setBarData] = useState({
    labels: ["Active Items", "Total Bids", "Unique Bidders"],
    datasets: [
      {
        label: "Listings",
        data: [],
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const [pieData, setPieData] = useState({
    labels: ["Total Items", "Total Items Sold"],
    datasets: [
      {
        label: "Listings",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  });
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

  useEffect(() => {
    setBarData({
      ...barData,
      datasets: [
        {
          ...barData.datasets[0],
          data: [
            statistics.live_listings,
            statistics.total_bids,
            statistics.unique_bidders,
          ],
        },
      ],
    });

    setPieData({
      ...pieData,
      datasets: [
        {
          ...pieData.datasets[0],
          data: [statistics.total_listings, statistics.sold_listings],
        },
      ],
    });
  }, [statistics]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <Dashboard isOpen={Open} setIsOpen={isOpen} />
      <div
        className={`flex-1 px-10 ${
          Open ? "ml-64" : "ml-0"
        } transition-margin duration-300 p-3`}
      >
        <h1 className="text-center text-3xl font-bold text-primary mt-10">
          Analytics
        </h1>
        <Underline mt={4} mb={0} />
        <div className="p-4">
          <div className="mt-10">
            <h1 className="text-2xl font-bold text-center text-primary">
              Listing Statistics (Bar Chart)
            </h1>
            <Underline mt={3} />
            <Bar data={barData} />
          </div>
          <div className="mt-10">
            <h1 className="text-2xl font-bold text-center text-primary">
              Listing Statistics (Pie Chart)
            </h1>
            <Underline mt={3} />
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}
