import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../Auth/Axios";
import Cookies from "js-cookie";
import { FaBicycle, FaCar, FaMotorcycle, FaTruckMoving } from "react-icons/fa";
import { toast } from "react-toastify";

const DeliveryPage = () => {
  const listing_id = useParams().id;
  const navigate = useNavigate();
  const { user, url } = useContext(UsersContext);
  const [formData, setFormData] = useState({
    buyer_id: user.id,
    listing_id: listing_id,
    full_name: user.name || "",
    street: user.actor.address || "",
    city: "",
    phone: user.phone_number || "",
    additional_info: "",
    delivery_person_id: "",
  });
  const [personnel, setPersonnel] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [deliveryFee, setDeliveryFee] = useState(0);

  const vehicleDeliveryFees = {
    Bicycle: 100,
    Car: 200,
    Motorbike: 150,
    "Moving Truck": 500,
  };

  useEffect(() => {
    async function getPersonnel() {
      const res = await Api.get("/api/delivery_persons", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPersonnel(res.data);
    }
    getPersonnel();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectDeliveryPerson = (person) => {
    setFormData({ ...formData, delivery_person_id: person.id });
    setDropdownOpen(false);
    setDeliveryFee(vehicleDeliveryFees[person.actor.vehicle] || 0);
  };

  const getVehicleIcon = (vehicle) => {
    switch (vehicle) {
      case "Bicycle":
        return <FaBicycle className="text-primary" />;
      case "Car":
        return <FaCar className="text-primary" />;
      case "Motorbike":
        return <FaMotorcycle className="text-primary" />;
      case "Moving Truck":
        return <FaTruckMoving className="text-primary" />;
      default:
        return null;
    }
  };

  const location = useLocation();
  const { data: productData } = location.state || {};
  if (!productData) {
    return <p>Product data not found. Please go back and try again.</p>;
  }

  const openPopup = () => {
    if (validateForm()) {
      setPopupIsOpen(true);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const closePopup = () => {
    setPopupIsOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";
    if (!formData.street.trim())
      newErrors.street = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.delivery_person_id)
      newErrors.delivery_person_id = "Delivery person is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handlePaymentOption(option) {
    if (option === "Cash on Delivery") {
      try {
        const res = await Api.post("/api/order", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        });
        console.log(res);
        toast.success("Order created successfully");
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Error creating order. Please try again.");
      }
    } else if (option === "Chapa") {
      navigate("/checkout", {
        state: { productData, formData, deliveryFee, user },
      });
    }
    console.log(`Selected payment option: ${option}`);
    closePopup();
  }

  return (
    <div className="mt-12 relative min-h-screen p-4 md:p-10">
      <Navbar />
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-primary border border-gray-700 px-4 py-2 rounded hover:bg-blue-300 transition duration-300 flex items-center"
      >
        &larr;
      </button>

      <div className="flex flex-col md:flex-row gap-10 mt-5">
        {/* Left Section - Delivery Form */}
        <div className="md:w-2/3 p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-5">Delivery Details</h2>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 gap-5">
            <div className="flex gap-4">
              <div className="w-full md:w-1/2">
                <label className="block font-semibold mb-1">Full name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Abebe"
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm">{errors.full_name}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Town/ City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Addis Ababa"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Street address</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Ayat Gerji Road"
              />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="+251912345678"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Additional information
              </label>
              <textarea
                name="additional_info"
                value={formData.additional_info}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded"
                placeholder="Apartment, suite, unit, etc. (optional)"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Select Delivery person
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring border-primary text-sm"
                >
                  {formData.delivery_person_id
                    ? personnel.find(
                        (person) => person.id === formData.delivery_person_id
                      ).name
                    : "Select a Delivery Person"}
                </button>
                {dropdownOpen && (
                  <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-2">
                    {personnel.map((person) => (
                      <div
                        key={person.id}
                        onClick={() => handleSelectDeliveryPerson(person)}
                        className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                      >
                        <img
                          src={url + person.image}
                          alt={person.name}
                          className="w-10 h-10 rounded-full mr-2"
                        />
                        <div>
                          <p className="font-semibold">{person.name}</p>
                          <p className="text-sm text-gray-600">
                            {person.phone_number}
                          </p>
                          <div className="flex items-center gap-2">
                            {getVehicleIcon(person.actor.vehicle)}
                            <span>{person.actor.vehicle}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {errors.delivery_person_id && (
                  <p className="text-red-500 text-sm">
                    {errors.delivery_person_id}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="md:w-1/3 p-6 border rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-5">{productData.title}</h2>
            <div className="w-full h-72 flex items-center justify-center rounded mb-5">
              <img
                src={url + productData.image}
                alt={productData.title}
                className="object-contain h-full"
              />
            </div>

            <div className="flex justify-between border-b pb-3 mb-3">
              <span className="font-semibold">Won Bid</span>
              <span>{productData.winning_bid_amount}</span>
            </div>
            <div className="flex justify-between border-b pb-3 mb-3">
              <span className="font-semibold">Delivery Fee</span>
              <span>{deliveryFee} ETB</span>
            </div>

            <p className="text-sm text-gray-600">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
          </div>

          {/* Place Order Button */}
          <div className="text-center mt-5">
            <button
              onClick={openPopup}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Pay and Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Payment Options Popup */}
      {popupIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Choose Payment Option</h2>
            <button
              onClick={() => handlePaymentOption("Chapa")}
              className="bg-blue-500 text-white py-2 px-4 rounded mb-4 w-full hover:bg-blue-600 transition"
            >
              Pay with Chapa
            </button>
            <button
              onClick={() => handlePaymentOption("Cash on Delivery")}
              className="bg-gray-500 text-white py-2 px-4 rounded w-full hover:bg-gray-600 transition"
            >
              Cash on Delivery
            </button>
            <button
              onClick={closePopup}
              className="mt-4 text-gray-500 hover:text-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPage;
