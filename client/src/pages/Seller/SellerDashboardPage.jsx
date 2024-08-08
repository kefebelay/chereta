import { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <SellerDashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 px-10 ${
          isOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300`}
      >
        <h1>Seller DashboardPage</h1>
      </div>
    </div>
  );
}
