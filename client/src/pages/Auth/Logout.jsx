import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "./Axios";
import { toast } from "react-toastify";
import Popup from "../../components/common/Popup";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setuser, token } = useContext(UsersContext);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  async function onLogout() {
    try {
      const csrf = Cookies.get("XSRF-TOKEN");
      await Api.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrf,
          },
        }
      );
      localStorage.removeItem("token");
      setuser(null);
      toast.success("logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("unable to logout");
    }
    setPopup(false);
  }
  return (
    <div>
      <button
        className="text-white hover:scale-105 bg-primary px-3 py-1.5 rounded-md transition-transform duration-300"
        onClick={() => setPopup(true)}
      >
        Logout
      </button>
      {popup && <Popup onYes={onLogout} popup={popup} setPopup={setPopup} />}
    </div>
  );
}
