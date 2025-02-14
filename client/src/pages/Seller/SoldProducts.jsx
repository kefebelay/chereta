import { useEffect, useState, useContext } from "react";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../Auth/Axios";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import Underline from "../../components/common/Underline";

export default function SoldProducts() {
  const [soldProducts, setSoldProducts] = useState([]);
  const { user } = useContext(UsersContext);
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("price");

  useEffect(() => {
    const fetchSoldProducts = async () => {
      try {
        const response = await Api.get(`/api/seller/sold-products/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSoldProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching sold products:", error);
      }
    };

    fetchSoldProducts();
  }, [user.id]);

  const filteredProducts = soldProducts.filter((product) => {
    if (filterType === "title") {
      return product.title.toLowerCase().includes(filter.toLowerCase());
    } else if (filterType === "date") {
      return product.bid_end_time.includes(filter);
    } else if (filterType === "price") {
      return product.winning_bid_amount.toString().includes(filter);
    }
    return true;
  });

  return (
    <div>
      <SellerDashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 px-10 ml-64 transition-margin duration-300 p-7 ${
          isOpen ? "ml-72" : "ml-3"
        }`}
      >
        <h1 className="text-3xl font-bold text-center text-primary p-3 mt-5">
          Sold Products
        </h1>
        <Underline />
        <div className="flex justify-start gap-6 rounded mt-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-text2 font-bold p-2 rounded bg-secondary"
          >
            <option value="title">Title</option>
            <option value="date">Date</option>
            <option value="price">Price</option>
          </select>
        </div>
        <table className="w-full border border-text2 mt-6">
          <thead>
            <tr className="border-b-2 border-text2">
              <th className="bg-background2 p-3">Title</th>
              <th className="bg-background2 p-3">Description</th>
              <th className="bg-background2 p-3">Amount</th>
              <th className="bg-background2 p-3">Winner</th>
              <th className="bg-background2 p-3">End Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-text2 hover:border-b-primary hover:border-b-4 transition-transform duration-300"
              >
                <td className="py-2 text-center">{product.title}</td>
                <td className="py-2 text-center">{product.description}</td>
                <td className="py-2 text-center">
                  {product.winning_bid_amount}
                </td>
                <td className="py-2 text-center">{product.winner.name}</td>
                <td className="py-2 text-center">{product.bid_end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
