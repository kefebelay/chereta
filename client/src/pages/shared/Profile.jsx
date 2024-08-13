import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A short bio about John Doe.",
    profilePicture: "https://via.placeholder.com/150",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto shadow-text2 rounded-lg shadow-sm mt-32 p-5">
        <h1 className="text-3xl font-bold mb-7 text-center text-primary">
          Edit Profile
        </h1>
        <div className="flex flex-col items-center">
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mb-4 text-primary border-text"
          />
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="border p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-text2"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="border p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-text2"
            placeholder="Email"
          />
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="border p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-text2"
            placeholder="Bio"
          />
          <button className="btn bg-primary text-white py-2 px-4 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
