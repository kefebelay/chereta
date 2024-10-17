import { useState } from "react";
import Api from "../../pages/Auth/Axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function SignUp() {
  const [message, setMessage] = useState("");
  const [newPersonnel, setNewPersonnel] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    age: "",
    gender: "",
    vehicle: "",
    username: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPersonnel({ ...newPersonnel, [name]: value });
  };
  const handleAddPersonnel = async () => {
    try {
      const res = await Api.post(
        "/api/delivery-person/register",
        newPersonnel,
        {
          headers: {
            "x-xsrf-token": Cookies.get("XSRF-TOKEN"),
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.message);
      setNewPersonnel("");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage(err.response.data.message);
      }
    }
  };

  return (
    <div className="bg-transparent border-text2 p-6 rounded shadow-lg">
      <div className="mb-4">
        <label className="block  text-sm font-bold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={newPersonnel.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-text2 rounded focus:ring-primary"
          id="name"
          placeholder="Enter name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Age</label>
        <input
          type="number"
          name="age"
          value={newPersonnel.age}
          onChange={handleInputChange}
          className="w-full p-2 border border-text2 rounded focus:ring-primary"
          placeholder="Enter age"
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2">Gender</label>
        <select
          name="gender"
          className="w-full p-2 border border-text2 rounded focus:ring-primary"
          value={newPersonnel.gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={newPersonnel.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-text2 rounded focus:ring-primary"
          placeholder="Enter email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={newPersonnel.username}
          onChange={handleInputChange}
          className="w-full p-2 border border-text2 rounded focus:ring-primary"
          placeholder="Enter username"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={newPersonnel.password}
          onChange={handleInputChange}
          className="w-full p-2 border border-text2 rounded focus:ring-primary"
          placeholder="Enter password"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Phone Number</label>
        <input
          type="text"
          name="phone_number"
          value={newPersonnel.phone_number}
          onChange={handleInputChange}
          className="w-full p-2 border border-text2 rounded focus:ring-primary"
          placeholder="Enter Phone Number"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Address</label>
        <textarea
          name="address"
          value={newPersonnel.address}
          onChange={handleInputChange}
          className="w-full p-2 border border-text2 rounded focus:ring-primary"
          placeholder="Enter address"
        />
      </div>
      <div className="mb-1">
        <label className="block text-sm font-bold mb-2" htmlFor="vehicle">
          Vehicle Type
        </label>
        <select
          name="vehicle"
          value={newPersonnel.vehicle}
          onChange={handleInputChange}
          className="w-full p-2 border border-text2 rounded focus:ring-primary "
        >
          <option value="">Select vehicle type</option>
          <option value="Car">Car</option>
          <option value="Motorbike">Motorbike</option>
          <option value="Bicycle">Bicycle</option>
          <option value="Moving Truck">Moving Truck</option>
        </select>
      </div>
      <p className="my-3 text-red-500">{message}</p>
      <button
        onClick={handleAddPersonnel}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Personnel
      </button>
    </div>
  );
}
