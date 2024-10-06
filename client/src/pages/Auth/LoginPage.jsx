import { useContext, useState } from "react";
import Api from "./Axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../hooks/Users_Hook";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [userForm, setUserForm] = useState({ email: "", password: "" });
  const [Message, setMessage] = useState("");
  const { setToken } = useContext(UsersContext);
  const navigate = useNavigate();
  function setInput(e) {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submitBtn(e) {
    e.preventDefault();

    if (!userForm.email || !userForm.password) {
      setMessage("Please enter your email and password");
      return;
    }

    try {
      const csrf = Cookies.get("XSRF-TOKEN");
      const res = await Api.post("/login", userForm, {
        headers: { "X-XSRF-TOKEN": csrf },
      });
      localStorage.setItem("token", res.data.token);
      setToken(localStorage.getItem("token"));
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      setMessage("Please enter correct email and password.");
      toast.error("incorrect email or password");
    } finally {
      setUserForm({ email: "", password: "" });
    }
  }

  return (
    <div>
      <h1 className="text-center text-5xl font-extrabold m- text-primary">
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
                className="border border-text2 p-3 rounded-lg m-3 "
                value={userForm.email}
              />
              <input
                onChange={setInput}
                name="password"
                type="password"
                placeholder="Password"
                className="border border-text2 p-3 rounded-lg m-3 "
                value={userForm.password}
              />
              <button
                onClick={submitBtn}
                className="btn bg-primary text-center mt-4 mx-9 text-white font-bold"
              >
                Login
              </button>

              <div className="text-center text-red-500 p-3 bg-transparent">
                {Message}
              </div>

              <p className="text-center text-text2 bg-transparent p-3">
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
