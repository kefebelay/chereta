import { parse, isAfter, differenceInDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import Api from "../../pages/Auth/Axios";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import { UsersContext } from "../../hooks/Users_Hook";
import { toast } from "react-toastify";

export default function CreateProduct() {
  const { user } = useContext(UsersContext);
  const [isOpen, setIsOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [formValues, setFormValues] = useState({
    category_id: "",
    user_id: "",
    title: "",
    description: "",
    starting_price: "",
    bid_end_time: "",
    bid_start_time: "",
    quantity: "",
    image: null,
  });

  const [dateTime, setDateTime] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  useEffect(() => {
    if (user) {
      setFormValues((prevValues) => ({
        ...prevValues,
        user_id: user.id,
      }));
    }
  }, [user]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await Api.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    setDateTime({ ...dateTime, [name]: value });

    if (name === "startDate" || name === "startTime") {
      const combinedStart =
        dateTime.startDate && dateTime.startTime
          ? `${dateTime.startDate} ${dateTime.startTime}:00`
          : "";
      setFormValues({ ...formValues, bid_start_time: combinedStart });
    } else if (name === "endDate" || name === "endTime") {
      const combinedEnd =
        dateTime.endDate && dateTime.endTime
          ? `${dateTime.endDate} ${dateTime.endTime}:00`
          : "";
      setFormValues({ ...formValues, bid_end_time: combinedEnd });
    }
  };

  const validateDates = () => {
    const { bid_start_time, bid_end_time } = formValues;

    if (!bid_start_time || !bid_end_time) return false;

    // Parse dates using d/m/y format
    const startDate = parse(bid_start_time, "MM/dd/yyyy", new Date());
    const endDate = parse(bid_end_time, "MM/dd/yyyy", new Date());
    const today = new Date();

    // Validate dates
    // 1. Start date must be after today
    // if (isAfter(today, startDate)) {
    //   return false;
    // }

    // 2. End date must be after start date
    if (isAfter(startDate, endDate)) {
      return false;
    }

    // 3. Difference between start and end dates must be 30 days or less
    const dateDiff = differenceInDays(endDate, startDate);
    if (dateDiff > 30) {
      return false;
    }

    // 4. Both dates must be within the current month
    const currentMonth = today.getMonth();
    if (
      startDate.getMonth() !== currentMonth ||
      endDate.getMonth() !== currentMonth
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateDates()) {
      toast.info(
        "Please ensure the auction dates are within one month from today."
      );
      return;
    }

    try {
      const res = await Api.post("/api/listing", formValues);
      console.log("Product created:", res.data);
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div>
      <SellerDashboard isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`flex-1 px-10 ml-64 transition-margin duration-300 p-7 ${
          isOpen ? "ml-72" : "ml-3"
        }`}
      >
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-center text-primary p-3">
            Create a New Product
          </h1>
          <div className="flex flex-col w-full justify-center p-10 gap-4">
            {/* Product Title */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">Product Title</label>
              <input
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                placeholder="Enter product title"
              />
            </div>

            {/* Product Description */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">
                Product Description
              </label>
              <textarea
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                placeholder="Enter product description"
              />
            </div>

            {/* Starting Price */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">Starting Price</label>
              <input
                type="number"
                name="starting_price"
                value={formValues.starting_price}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                placeholder="Enter starting price"
              />
            </div>

            {/* Quantity */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formValues.quantity}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
                placeholder="Enter quantity"
              />
            </div>

            {/* Product Category */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">Select Category</label>
              <select
                name="category_id"
                value={formValues.category_id}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
              >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">Product Image</label>
              <input
                type="file"
                name="image"
                onChange={(e) =>
                  setFormValues({ ...formValues, image: e.target.files[0] })
                }
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
              />
            </div>

            {/* Start Date and Time */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={dateTime.startDate}
                onChange={handleDateTimeChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={dateTime.startTime}
                onChange={handleDateTimeChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
              />
            </div>

            {/* End Date and Time */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">End Date</label>
              <input
                type="date"
                name="endDate"
                value={dateTime.endDate}
                onChange={handleDateTimeChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <label className="font-semibold md:w-1/4">End Time</label>
              <input
                type="time"
                name="endTime"
                value={dateTime.endTime}
                onChange={handleDateTimeChange}
                className="border rounded-md p-2 w-full md:w-3/4 border-text2"
              />
            </div>

            {/* Submit Button */}
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
