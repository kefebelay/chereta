import { useState } from "react";
import Api from "../../pages/Auth/Axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CompanySignUpForm() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    username: "",
    description: "",
    address: "",
  });
  const csrf = Cookies.get("XSRF-TOKEN");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setMessage("Please fill all the required fields");
      return;
    }
    try {
      const response = await Api.post(
        "http://localhost:8000/api/company-seller/register",
        formData,
        { headers: { "X-XSRF-TOKEN": csrf } }
      );
      toast.success(response.data.message);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setMessage(err.response.data.message);
    }
  }
  return (
    <div className=" mt-4 p-3">
      <p className="mb-3 text-sm text-left text-text2 px-9">
        Sign up as a <span className="text-primary"> Company Seller </span>a and
        you can post items for auction, manage your listings, and track your
        sales. Ensure you provide accurate and complete information to help
        verify your identity and protect your account. Remember to use a strong,
        unique password to enhance the security of your account. Happy bidding
        on Chereta!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 px-3 md:px-9 py-3 gap-x-9">
          <div className="mb-4">
            <label className="block mb-2">Company Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded focus:ring-blue-500 border-text2"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Company Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border focus:ring-blue-500 border-text2 rounded"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">CompanyEmail</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border focus:ring-blue-500 border-text2 rounded"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border focus:ring-blue-500 border-text2 rounded"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Company Number</label>
            <input
              type="text"
              name="phone_number"
              className="w-full p-2 border focus:ring-blue-500 border-text2 rounded"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label className="block mb-2">Company Address</label>
            <textarea
              type="text"
              name="address"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label className="block mb-2">Company Description</label>
            <textarea
              type="text"
              name="address"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <p className="text-red-500 text-center mb-2">{message}</p>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[300px] bg-primary text-white p-2 rounded btn"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
