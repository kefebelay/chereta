import { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import AllProducts from "../../components/Seller/Products";
import LiveProducts from "../../components/Seller/LiveProducts";
import Underline from "../../components/common/Underline";

export default function Products() {
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState("products");
  const [formValues, setFormValues] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productQuantity: "",
    productCategory: "",
    startDate: "",
    endDate: "",
    startTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateDates = () => {
    const { startDate, endDate } = formValues;
    if (!startDate || !endDate) return false;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    if (
      start >= today &&
      start <= oneMonthLater &&
      end >= start &&
      end <= oneMonthLater
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (!validateDates()) {
      alert("Please ensure the auction dates are within one month from today.");
      return;
    }

    // Proceed with form submission logic
    console.log("Form submitted successfully", formValues);
  };

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

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-center text-primary p-3">
            Create a New Product
          </h1>
          <div className="flex flex-col w-full justify-center p-10 gap-4">
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formValues.productName}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                placeholder="Enter product name"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center ">
              <label className="font-semibold md:w-1/4">
                Product Description
              </label>
              <input
                type="text"
                name="productDescription"
                value={formValues.productDescription}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                placeholder="Enter product description"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center ">
              <label className="font-semibold md:w-1/4">
                Product Price (birr)
              </label>
              <input
                type="number"
                name="productPrice"
                value={formValues.productPrice}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                placeholder="Enter product price"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center ">
              <label className="font-semibold md:w-1/4">Product Quantity</label>
              <input
                type="number"
                name="productQuantity"
                value={formValues.productQuantity}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                placeholder="Enter product quantity"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center ">
              <label className="font-semibold md:w-1/4">Product Category</label>
              <input
                type="text"
                name="productCategory"
                value={formValues.productCategory}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                placeholder="Enter product category"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center ">
              <label className="font-semibold md:w-1/4">Product Image</label>
              <input
                type="file"
                name="productImage"
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                placeholder="Upload product image"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center ">
              <label className="font-semibold md:w-1/4">
                Auction Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formValues.startDate}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">Auction End Date</label>
              <input
                type="date"
                name="endDate"
                value={formValues.endDate}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">
                Auction Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formValues.startTime}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="btn bg-primary text-white rounded-md p-2 mt-4 w-full md:w-1/4 self-center"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
