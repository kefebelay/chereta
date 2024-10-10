import { useContext, useState, useEffect } from "react";
import { UsersContext } from "../../hooks/Users_Hook";
import Loading from "../../components/common/Loading";
import Cookies from "js-cookie";
import Api from "../Auth/Axios";
import { toast } from "react-toastify";
import Popup from "../../components/common/Popup";
import { useNavigate } from "react-router-dom";
import SellerDashboard from "../../components/Seller/SellerDashboard";

export default function Profile() {
  const { user, token } = useContext(UsersContext);
  const { isOpen, setIsOpen } = useState(true);
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150"
  );
  function open() {
    setIsOpen(!isOpen);
  }
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    phone_number: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        username: user.username,
        phone_number: user.phone_number,
        address: user.company_seller.address,
        description: user.company_seller.description,
      });

      setProfilePicture(profilePicture || "https://via.placeholder.com/150");
    }
  }, [user]);

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
        setProfilePicture({
          ...profile,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  async function onUpdate() {
    try {
      if (!profile.name || !profile.username || !profile.phone_number) {
        setMessage("Please fill all required fields");
        return;
      }
      if (
        profile.name === user.name &&
        profile.username === user.username &&
        profile.phone_number === user.phone_number &&
        profile.address === user.company_seller.address &&
        profile.description === user.company_seller.description
      ) {
        setMessage("No changes made");
        return;
      }

      const res = await Api.patch(`/api/company-seller/${user.id}`, profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });

      if (res.status === 200) {
        toast.success("profile " + res.data.message);
        navigate("/seller/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <SellerDashboard />
      {popup && (
        <Popup
          onYes={onUpdate}
          popup={popup}
          setPopup={setPopup}
          message="Are you sure you want to update profile?"
        />
      )}
      <div className="max-w-2xl mx-auto shadow-text2 rounded-lg shadow-sm mt-20 p-5">
        <h1 className="text-3xl font-bold mb-7 text-center text-primary">
          Edit Profile
        </h1>
        {!user ? (
          <div className="grid place-items-center">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mb-9 text-primary border-text"
            />

            <div className="flex items-center mb-4 w-full">
              <label className="w-1/4 text-left">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="border p-2 w-3/4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-text2"
                placeholder="Name"
              />
            </div>

            <div className="flex items-center mb-4 w-full">
              <label className="w-1/4 text-left">Username</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="border p-2 w-3/4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-text2"
                placeholder="Username"
              />
            </div>

            <div className="flex items-center mb-4 w-full">
              <label className="w-1/4 text-left">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                className="border p-2 w-3/4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-text2"
                value={profile.phone_number}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <div className="flex items-center mb-2 w-full">
                <label className="w-1/4 text-left">Address</label>
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="border p-2 w-3/4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-text2"
                  placeholder="Please enter a descriptive address"
                />
              </div>
              <div className="flex items-center mb-2 w-full">
                <label className="w-1/4 text-left">descripition</label>
                <textarea
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  className="border p-2 w-3/4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-text2"
                  placeholder="Please enter a descriptive address"
                />
              </div>
            </div>
            <p className="mb-2 text-red-500 text-center">{message}</p>

            <button
              onClick={() => {
                setPopup(true);
              }}
              className="btn bg-primary text-white py-2 px-4 rounded-lg"
            >
              Update Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
