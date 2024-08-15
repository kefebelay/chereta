import { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import AllProducts from "../../components/Seller/Products";
import LiveProducts from "../../components/Seller/LiveProducts";
import Underline from "../../components/common/Underline";

export default function Products() {
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState("products");
  const [products, setProducts] = useState([]);

  return (
    <div>
      <SellerDashboard isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`flex-1 px-10 ml-64 transition-margin duration-300 p-7 ${
          isOpen ? "ml-72" : "ml-3"
        }`}
      >
        <h1 className="text-3xl font-bold text-center text-primary p-3 ">
          Products
        </h1>
        <Underline />
        <div className="">
          <div className="flex justify-center gap-6 rounded">
            <button
              onClick={() => setPage("products")}
              className={` border border-text2 text-white font-bold p-2 rounded
              ${
                page === "products"
                  ? "bg-primary text-white font-bold p-2 rounded"
                  : "bg-secondary hover:bg-primary"
              }
              `}
            >
              Products
            </button>
            <button
              onClick={() => setPage("live products")}
              className={` border border-text2 text-white font-bold p-2 rounded
              ${
                page === "live products"
                  ? "bg-primary text-white font-bold p-2 rounded"
                  : "bg-secondary hover:bg-primary"
              }
              `}
            >
              Live Products
            </button>
          </div>
          <div>
            {page === "products" ? (
              <div>
                <AllProducts />
              </div>
            ) : (
              <div>
                <LiveProducts />
              </div>
            )}
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-center text-primary p-3">
              Create Product
            </h1>
            <div className="flex flex-col w-full items-center justify-center p-10 gap-3">
              <input
                type="text"
                placeholder="Product Name"
                className="border rounded-md p-2 mt-2 w-full border-text2 "
              />
              <input
                type="text"
                placeholder="Product Description"
                className="border rounded-md p-2 mt-2 w-full border-text2 "
              />
              <input
                type="text"
                placeholder="Product Price"
                className="border rounded-md p-2 mt-2 w-full border-text2 "
              />
              <input
                type="text"
                placeholder="Product Quantity"
                className="border rounded-md p-2 mt-2 w-full border-text2 "
              />
              <input
                type="text"
                placeholder="Product Category"
                className="border rounded-md p-2 mt-2 w-full border-text2 "
              />
              <input
                type="file"
                placeholder="Product Image URL"
                className="border rounded-md p-2 mt-2 w-full border-text2 text-text2"
              />
              <input
                type="date"
                placeholder="Product Expiry Date"
                className="border rounded-md p-2 mt-2 w-full border-text2 "
                onChange={(e) => setProducts(e.target.value)}
              />
              <input
                type="time"
                placeholder="Product Expiry Date"
                className="border rounded-md p-2 mt-2 w-full border-text2 "
                onChange={(e) => setProducts(e.target.value)}
              />
              <button className="btn bg-primary text-white rounded-md p-2 mt-2 w-1/4">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
