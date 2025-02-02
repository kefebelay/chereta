import { useContext, useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { UsersContext } from "../../hooks/Users_Hook";
import Loading from "../../components/common/Loading";
import Cookies from "js-cookie";
import Api from "../Auth/Axios";
import { toast } from "react-toastify";
import Popup from "../../components/common/Popup";
import { useNavigate } from "react-router-dom";
import Logout from "../Auth/Logout";
import { Sidebar } from "../../components/Buyer/Sidebar";

export default function ProfilePage() {
  const { user, token, url } = useContext(UsersContext);
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150"
  );
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    phone_number: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        username: user.username,
        phone_number: user.phone_number,
        address: user.actor.address,
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
      const res = await Api.patch(`/api/buyer/${user.id}`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      if (res.status === 200) {
        toast.success("profile " + res.data.message);
        navigate("/");
      }
    } catch (err) {
      setMessage(err.response.data.message);
    }
  }

  return (
    <div>
      <Navbar />
      {popup && (
        <Popup
          onYes={onUpdate}
          popup={popup}
          setPopup={setPopup}
          message="Are you sure you want to update profile?"
        />
      )}
      <div className="flex gap-5 mt-24">
        <Sidebar />
        <div className=" mx-auto shadow-text2 rounded-lg shadow-sm  p-5">
          <div className="float-right">
            <Logout />
          </div>
          <h1 className="text-3xl font-bold mb-7 text-center text-primary ml-16">
            Edit Profile
          </h1>
          {!user ? (
            <div className="grid place-items-center">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={url + user.image || profilePicture}
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
              <p className="mb-2 text-red-500 text-center">{message}</p>

              <button
                onClick={() => setPopup(true)}
                className="btn bg-primary text-white py-2 px-4 rounded-lg"
              >
                Update Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
