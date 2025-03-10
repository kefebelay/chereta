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
    dob: "",
    address: "",
    profile_image: null,
  });
  const csrf = Cookies.get("XSRF-TOKEN");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await Api.post("/api/buyer/register", formDataToSend, {
        headers: {
          "X-XSRF-TOKEN": csrf,
          // "Content-Type": "multipart/form-data"
        },
      });
      toast.success(response.data.message);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setMessage(err.response.data.message);
    }
  }

  return (
    <div className="p-3 mt-4">
      <h1 className="text-4xl p-3 text-center font-semibold text-primary">
        Sign Up
      </h1>
      <p className="mb-3 text-sm text-left text-text2 px-9">
        Sign up as a <span className="text-primary">buyer</span> to explore and
        bid on items, track your bids, and manage your purchases. Provide
        accurate information to verify your identity and protect your account.
        Use a strong, unique password for security. Happy bidding on Chereta!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 px-3 md:px-9 py-3 gap-x-9">
          <div className="mb-4">
            <label className="block mb-2">Full name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
            />
            <p className="text-text2 text-sm p-1">* required</p>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
            />
            <p className="text-text2 text-sm p-1">* required</p>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="text-text2 text-sm p-1">* required</p>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="text-text2 text-sm p-1">* required</p>
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
            <p className="text-text2 text-sm p-1">* required</p>
          </div>
          <div className="flex gap-5">
            <div className="mb-4">
              <label className="block mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
                value={formData.dob}
                onChange={handleChange}
              />
              <p className="text-text2 text-sm p-1">* required</p>
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
              <p className="text-text2 text-sm p-1">* required</p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <textarea
              type="text"
              name="address"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              value={formData.address}
              onChange={handleChange}
            />
            <p className="text-text2 text-sm p-1">* required for delivery</p>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Profile Picture</label>
            <input
              type="file"
              name="profile_image"
              accept="image/*"
              className="w-full p-2 border border-text2 rounded focus:ring-blue-500"
              onChange={handleChange}
            />
            <p className="text-text2 text-sm p-1">* Optional</p>
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
