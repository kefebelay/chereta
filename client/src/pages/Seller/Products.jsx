import { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import AllProducts from "../../components/Seller/Products";
import LiveProducts from "../../components/Seller/LiveProducts";
import Underline from "../../components/common/Underline";

export default function Products() {
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState("products");

  return (
    <div>
      <SellerDashboard isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`flex-1 px-10 ml-64 transition-margin duration-300 p-7 ${
          isOpen ? "ml-72" : "ml-3"
        }`}
      >
        <h1 className="text-3xl font-bold text-center text-primary p-3">
          Products Management
        </h1>
        <Underline />

        <div className="flex justify-center gap-6 rounded mt-6">
          <button
            onClick={() => setPage("products")}
            className={`border border-text2 text-white font-bold p-2 rounded ${
              page === "products"
                ? "bg-primary text-white"
                : "bg-secondary hover:bg-primary"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setPage("live products")}
            className={`border border-text2 text-white font-bold p-2 rounded ${
              page === "live products"
                ? "bg-primary text-white"
                : "bg-secondary hover:bg-primary"
            }`}
          >
            Live Products
          </button>
        </div>

        <div className="mt-6">
          {page === "products" ? <AllProducts /> : <LiveProducts />}
        </div>
      </div>
    </div>
  );
}
