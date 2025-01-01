import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Navbar from "../../components/common/Navbar";

const DeliveryPage = () => {
  const navigate = useNavigate(); // Navigation hook
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    region: "",
    streetAddress: "",
    city: "",
    zip: "",
    phone: "",
    additionalInfo: "",
    deliveryPerson: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-20 relative min-h-screen p-10 bg-gray-50">
      <Navbar />
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="absolute top-5 left-5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition"
      >
        &larr; 
      </button>
      

      <div className="flex flex-col md:flex-row gap-10 mt-10">
        {/* Left Section - Delivery Form */}
        <div className="md:w-2/3 p-6 border rounded-lg shadow-md ">
          <h2 className="text-2xl font-bold mb-5">Delivery Details</h2>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 gap-5">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block font-semibold mb-1">First name</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Abebe"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold mb-1">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Kebede"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Region</label>
              <input
                type="text"
                name="region"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Addis Ababa"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Street address</label>
              <input
                type="text"
                name="streetAddress"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Ayat Gerji Road"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Town/ City</label>
              <input
                type="text"
                name="city"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Addis Ababa"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Postcode/ ZIP (Optional)</label>
              <input
                type="text"
                name="zip"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="1234"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="+251912345678"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Additional information</label>
              <textarea
                name="additionalInfo"
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded"
                placeholder="Apartment, suite, unit, etc. (optional)"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold mb-1">Select Delivery person</label>
              <input
                type="text"
                name="deliveryPerson"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Delivery person name"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="md:w-1/3 p-6 border rounded-lg shadow-md  flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-5">Image</h2>
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-5">
              <span className="text-gray-500">Image Placeholder</span>
            </div>

            <div className="flex justify-between border-b pb-3 mb-3">
              <span className="font-semibold">Won Bid</span>
              <span>25,000 Birr</span>
            </div>
            <div className="flex justify-between border-b pb-3 mb-3">
              <span className="font-semibold">Delivery</span>
              <span>200 Birr</span>
            </div>

            <div className="flex justify-between items-center mb-5">
              <span className="font-semibold">Cash on delivery</span>
              <button className="bg-gray-100 py-1 px-3 rounded">
                Pay with cash upon delivery
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Your personal data will be used to process your order, support your experience
              throughout this website, and for other purposes described in our privacy policy.
            </p>
          </div>

          {/* Place Order Button */}
          <div className="text-center mt-5">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
