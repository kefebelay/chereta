import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  function setInput(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  async function submitBtn(e) {
    e.preventDefault();

    try {
      const res = await Axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        user
      );
      setSuccessMessage("Login successful");
      navigate("/" + 1);
      console.log(res);
    } catch (err) {
      setErrorMessage("An error occurred");
      console.log(err);
    }
  }
  return (
    <div>
      <h1 className="text-center text-5xl font-extrabold m-9 text-primary">
        Login
      </h1>
      <div className="flex p-10 gap-4 md:justify-between md:flex-row justify-center">
        <div className="md:h-[29rem] md:w-[30rem] bg-background2 hidden md:block w-full"></div>
        <div className=" grid grid-cols-1 place-items-center bg-background2 rounded-lg p-9 md:w-full">
          <div className="bg-transparent border border-text2 p-3 rounded-lg md:w-96 w-72">
            <h1 className="bg-transparent text-center text-2xl md:text-3xl font-extrabold  text-primary">
              Enter detail to login
            </h1>
            <form
              className="grid grid-cols-1 bg-transparent p-3  "
              type="submit"
            >
              <input
                onChange={setInput}
                name="email"
                type="email"
                placeholder="Enter Email"
                className="border border-text2 p-3 rounded-lg m-3 "
                value={user.email}
              />
              <input
                onChange={setInput}
                name="password"
                type="password"
                placeholder="Password"
                className="border border-text2 p-3 rounded-lg m-3 "
                value={user.password}
              />
              <button
                onClick={submitBtn}
                className="btn bg-primary text-center mt-4 mx-9 text-white font-bold"
              >
                Login
              </button>

              <div className="text-center text-red-500 p-3 bg-transparent">
                {errorMessage}
              </div>
              <div className="text-center text-green-500 p bg-transparent">
                {successMessage}
              </div>

              <p className="text-center text-text2 bg-transparent p-3">
                Dont have an account?{" "}
                <Link to={"/register"} className="text-primary">
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
