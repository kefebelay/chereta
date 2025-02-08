import { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import Cookies from "js-cookie";
import Dashboard from "../../components/DeliveryPersonnel/Dashboard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../Auth/Axios";
import Loading from "../../components/common/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [stats, setStats] = useState({
    delivered: 0,
    pending: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UsersContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await Api.get(`/api/delivery/${user.id}/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        });
        setStats(response.data);
      } catch (err) {
        setError("Failed to fetch delivery stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const data = {
    labels: ["Delivered", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Deliveries",
        data: [stats.delivered, stats.pending, stats.cancelled],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Delivery Statistics" },
    },
  };
  console.log(error);

  return (
    <div>
      <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      <div
        className={`transition-margin duration-200 text-text2 font-bold p-4 ${
          isOpen ? "ml-72" : "ml-3"
        }`}
      >
        <div className="mb-8 mt-10">
          <Bar data={data} options={options} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-background2 border border-text2 rounded shadow-md">
            <h2 className="text-xl mb-2 bg-transparent">Total Deliveries</h2>
            <p className="text-2xl font-bold bg-transparent">
              {stats.delivered}
            </p>
          </div>
          <div className="p-4 bg-background2 border border-text2 rounded shadow-md">
            <h2 className="text-xl mb-2 bg-transparent">Pending Deliveries</h2>
            <p className="text-2xl font-bold bg-transparent">{stats.pending}</p>
          </div>
          <div className="p-4 bg-background2 border border-text2 rounded shadow-md">
            <h2 className="text-xl mb-2 bg-transparent">
              Cancelled Deliveries
            </h2>
            <p className="text-2xl font-bold bg-transparent">
              {stats.cancelled}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
