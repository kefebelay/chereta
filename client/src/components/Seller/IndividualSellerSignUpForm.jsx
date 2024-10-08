import { useState } from "react";

export default function IndividualSellerSignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    location: "",
    username: "",
    gender: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Individual Seller form submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-3">
      <p className="mb-3 text-sm text-left text-text2">
        Sign up as an <span className="text-primary">Individual seller</span>,
        and you can post items for auction, manage your listings, and track your
        sales. Ensure you provide accurate and complete information to help
        verify your identity and protect your account. Remember to use a strong,
        unique password to enhance the security of your account. Happy selling
        on Chereta!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="username"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Gender</label>
          <select
            name="gender"
            className="w-full p-2 border border-gray-300 rounded"
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
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
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
