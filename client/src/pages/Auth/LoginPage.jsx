import { useContext, useState } from "react";
import Api from "./Axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../hooks/Users_Hook";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [tries, setTries] = useState(0);
  const [userForm, setUserForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [Message, setMessage] = useState("");
  const { setToken } = useContext(UsersContext);
  const navigate = useNavigate();
  function setInput(e) {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submitBtn(e) {
    e.preventDefault();
    setMessage("");
    if (!userForm.email || !userForm.password) {
      setMessage("Please enter your email and password");
      return;
    } else if (userForm.password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      return;
    }
    try {
      setSubmitting(true);

      const csrf = Cookies.get("XSRF-TOKEN");
      const res = await Api.post("/login", userForm, {
        headers: { "X-XSRF-TOKEN": csrf },
      });
      localStorage.setItem("token", res.data.token);
      setToken(localStorage.getItem("token"));
      if (res.status === 200) {
        if (res.data.user.roles[0].name === "admin") {
          toast.success("Logged in as admin");
          navigate("/admin/dashboard", { replace: true });
        } else if (res.data.user.roles[0].name === "buyer") {
          toast.success("Successfuly logged in");
          navigate("/", { replace: true });
        } else if (res.data.user.roles[0].name === "individual_seller") {
          toast.success("Logged in as seller");
          navigate("/seller/dashboard");
        } else if (res.data.user.roles[0].name === "company_seller") {
          toast.success("Logged in as company seller");
          navigate("/seller/dashboard");
        } else if (res.data.user.roles[0].name === "delivery_person") {
          toast.success("Successfuly logged in");
          navigate("/delivery/dashboard");
        }
      }
    } catch (err) {
      if (err.response.status === 401) {
        setMessage(err.response.data.message);
        console.log(err);
        return;
      } else
        toast.error(
          "something went wrong, please refresh you're browser and try again"
        );
    } finally {
      setUserForm({ email: "", password: "" });
      setTries(tries + 1);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-center text-5xl font-extrabold m- text-primary my-10">
        Login
      </h1>
      <div className="flex p-10 gap-4 md:justify-between md:flex-row justify-center bg-transparent">
        <div className="md:h-auto md:auto bg-background2 hidden md:flex md:justify-center md:mx-4 p-7">
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F003%2F689%2F228%2Foriginal%2Fonline-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg&f=1&nofb=1&ipt=8d5c16cbadb7c5b9f586f2410e54333255dd2ab4c4b300096f0973c26738f1cb&ipo=images" />
        </div>
        <div className=" grid grid-cols-1 place-items-center bg-transparent rounded-lg p-9 md:w-full">
          <div className="bg-transparent p-3 rounded-lg md:w-96 w-72">
            <h1 className="bg-transparent text-center text-2xl md:text-3xl font-extrabold  text-primary">
              Enter detail to login
            </h1>
            <form className="grid grid-cols-1 bg-transparent p-3" type="submit">
              <input
                onChange={setInput}
                name="email"
                type="email"
                placeholder="Enter Email"
                className="border focus:ring-primary border-text2 p-3 rounded-lg m-3 "
                value={userForm.email}
              />
              <input
                onChange={setInput}
                name="password"
                type="password"
                placeholder="Password"
                className="border focus:ring-primaryborder-text2 p-3 rounded-lg m-3 "
                value={userForm.password}
              />
              {tries >= 3 && (
                <p className="text-center text-text2 bg-transparent text-sm">
                  forgot your password? reset{" "}
                  <span
                    onClick={() => window.open("/forgot-password", "_blank")}
                    className="text-primary cursor-pointer bg-transparent"
                  >
                    here
                  </span>
                </p>
              )}
              <button
                onClick={submitBtn}
                className="btn bg-primary text-center mt-4 mx-9 text-white font-bold"
                disabled={submitting}
              >
                {submitting ? "Logging in..." : "Login"}
              </button>

              <div className="text-center text-sm text-red-500 p-3 bg-transparent">
                {Message}{" "}
                {Message !== "" && tries > 0 && (
                  <span className="text-red-500">({tries})</span>
                )}
              </div>

              <p className="text-center text-text2 bg-transparent ">
                Dont have an account?{" "}
                <Link to="/register" className="text-primary bg-transparent">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
