import { useState } from "react";
import Api from "../../pages/Auth/Axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function IndividualSellerSignUpForm() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    username: "",
    gender: "",
    dob: "",
    address: "",
    description: "",
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  async function handleSubmit(e) {
    const csrf = Cookies.get("XSRF-TOKEN");
    e.preventDefault();

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await Api.post(
        "/api/individual-seller/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-XSRF-TOKEN": csrf,
          },
        }
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
    <div className="mt-4 h-full p-3">
      <p className="mb-3 text-sm text-left text-text2 px-9">
        Sign up as an <span className="text-primary">Individual seller</span>,
        and you can post items for auction, manage your listings, and track your
        sales. Ensure you provide accurate and complete information to help
        verify your identity and protect your account. You can leave the address
        and description empty now and edit later on your profile page. Happy
        selling on Chereta!
      </p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid md:grid-cols-2 px-3 md:px-9 py-3 gap-x-9">
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>

          {/* DOB and Gender */}
          <div className="flex gap-x-5">
            <div className="mb-4">
              <label className="block mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-2">Gender</label>
              <select
                name="gender"
                className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <textarea
              type="text"
              name="address"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              type="text"
              name="description"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block mb-2">Profile Image</label>
            <input
              type="file"
              name="image"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <p className="text-red-500 text-center mb-3">{message}</p>

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
