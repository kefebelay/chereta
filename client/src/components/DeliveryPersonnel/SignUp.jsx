import { useState } from "react";
import Api from "../../pages/Auth/Axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    username: "",
    gender: "",
    age: "",
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
    try {
      const response = await Api.post(
        "http://localhost:8000/api/delivery-person/register",
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
    <div className="max-w-md mx-auto mt-4">
      <p className="mb-3 text-sm text-left text-text2">
        Sign up as a <span className="text-primary"> buyer </span> to explore
        and bid on items, track your bids, and manage your purchases. Provide
        accurate information to verify your identity and protect your account.
        Use a strong, unique password for security. Happy bidding on Chereta!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded focus:ring-blue-500 border-text2"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="username"
            className="w-full p-2 border focus:ring-blue-500 border-text2 rounded"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
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
          <label className="block mb-2">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            className="w-full p-2 border focus:ring-blue-500 border-text2 rounded"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Gender</label>
          <select
            name="gender"
            className="w-full p-2 border focus:ring-blue-500 border-text2 rounded"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Age</label>
          <input
            type="number"
            name="age"
            className="w-full p-2 border focus:ring-blue-500 border-text2 rounded"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-1">
          <label className="block mb-2">Address</label>
          <textarea
            type="text"
            name="address"
            placeholder="Please enter full description of address"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <p className="text-red-500 text-center mb-2">{message}</p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded btn"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
