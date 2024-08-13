import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Dashboard from "../../components/Seller/SellerDashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [Open, isOpen] = useState(true);
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  useEffect(() => {
    // Generate random data
    const generateRandomData = (numPoints) => {
      return Array.from({ length: numPoints }, () =>
        Math.floor(Math.random() * 100)
      );
    };

    const labels = ["January", "February", "March", "April", "May", "June"];
    const salesData = generateRandomData(6);

    setLineData({
      labels,
      datasets: [{ ...lineData.datasets[0], data: salesData }],
    });
  }, []);

  return (
    <div className="">
      <Dashboard isOpen={Open} setIsOpen={isOpen} />
      <div
        className={`flex-1 px-10 ${
          Open ? "ml-64" : "ml-0"
        } transition-margin duration-300 p-3`}
      >
        <h1 className="text-center text-3xl font-bold text-primary mt-12">
          Analytics
        </h1>
        <div className="mt-10 p-4">
          <h2 className="text-xl font-semibold mb-4">Sales Over Time</h2>
          <Line data={lineData} />
          <div className="mt-4 space-y-2">
            {lineData.labels.map((label, index) => (
              <div key={index} className="text-lg flex items-center">
                <span className="font-bold">{label}:</span>
                <span className="ml-2 text-teal-600">
                  Sales - {lineData.datasets[0].data[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
