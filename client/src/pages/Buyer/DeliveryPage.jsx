import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // For navigation
import Navbar from "../../components/common/Navbar";
import { UsersContext } from "../../hooks/Users_Hook";
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

const location = useLocation();
const { data: productData } = location.state || {};
console.log(productData);
if (!productData) {
return <p>Product data not found. Please go back and try again.</p>;
}

const { user, url } = useContext(UsersContext);
const [personnel, setPersonnel] = useState([]);

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

return (
<div className="mt-20 relative min-h-screen p-10 ">
    <Navbar />
    {/* Back Button */}
    <button onClick={()=> navigate(-1)} // Go back to the previous page
        className="mb-4  text-primary border border-gray-700 px-4 py-2 rounded hover:bg-blue-300 transition duration-300 flex items-center"
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
                        <label className="block font-semibold mb-1">Full name</label>
                        <input type="text" name="firstName" onChange={handleChange}
                            className="w-full p-2 border rounded" placeholder="Abebe" />
                    </div>

                </div>

                <div>
                    <label className="block font-semibold mb-1">Town/ City</label>
                    <input type="text" name="city" onChange={handleChange} className="w-full p-2 border rounded"
                        placeholder="Addis Ababa" />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Street address</label>
                    <input type="text" name="streetAddress" onChange={handleChange}
                        className="w-full p-2 border rounded" placeholder="Ayat Gerji Road" />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Phone</label>
                    <input type="text" name="phone" onChange={handleChange} className="w-full p-2 border rounded"
                        placeholder="+251912345678" />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Additional information</label>
                    <textarea name="additionalInfo" onChange={handleChange} rows="3" className="w-full p-2 border rounded"
                        placeholder="Apartment, suite, unit, etc. (optional)"></textarea>
                </div>

                <div>
                <label className="block font-semibold mb-1">Select Delivery person</label>
                    <select id="category"  onChange={handleChange}
                        className="w-32 p-2 border rounded-lg focus:outline-none focus:ring border-primary text-sm m-2  ">
                        
                        {personnel !== null &&
                        personnel.map((deliveryPerson, index) => (
                        <option key={index} value={deliveryPerson.id}>
                            {deliveryPerson.name}
                        </option>
                        ))}
                    </select>

                </div>
            </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="md:w-1/3 p-6 border rounded-lg shadow-md  flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-5">{productData.title}</h2>
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-5">
                    <img src={url +productData.image} alt={productData.title} />

                </div>

                <div className="flex justify-between border-b pb-3 mb-3">
                    <span className="font-semibold">Won Bid</span>
                    <span>{productData.winning_bid_amount}</span>
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
