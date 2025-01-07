import { useState } from "react";
import { Bar } from "react-chartjs-2";
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

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Deliveries",
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Deliveries",
      },
    },
  };

  return (
    <div>
      <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />
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
            <p className="text-2xl font-bold bg-transparent">150</p>
          </div>
          <div className="p-4 bg-background2 border border-text2 rounded shadow-md">
            <h2 className="text-xl mb-2 bg-transparent">Pending Deliveries</h2>
            <p className="text-2xl font-bold bg-transparent">10</p>
          </div>
          <div className="p-4 bg-background2 border border-text2 rounded shadow-md">
            <h2 className="text-xl mb-2 bg-transparent">
              Cancelled Deliveries
            </h2>
            <p className="text-2xl font-bold bg-transparent">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
