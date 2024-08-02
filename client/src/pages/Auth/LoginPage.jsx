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
      const res = await Axios.post("http://localhost:3000/api/login", user);
      setSuccessMessage("Login successful");
      navigate("/");
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
      <div className="flex p-10 gap-4 justify-between mx-48">
        <div className="md:h-[29rem] md:w-[30rem] bg-background2 hidden md:block w-full"></div>
        <div className=" grid grid-cols-1 place-items-center bg-background2">
          <form className="flex flex-col w-full bg-transparent" type="submit">
            <input
              onChange={setInput}
              name="email"
              type="email"
              placeholder="Enter Email"
              className="border border-text2 p-3 rounded-lg m-3"
              value={user.email}
            />
            <input
              onChange={setInput}
              name="password"
              type="password"
              placeholder="Password"
              className="border border-text2 p-3 rounded-lg m-3"
              value={user.password}
            />
            <button
              onClick={submitBtn}
              className="btn bg-primary text-center mt-4 mx-4 text-white font-bold"
            >
              Login
            </button>
          </form>
          <div className="text-center text-red-500">{errorMessage}</div>
          <div className="text-center text-green-500">{successMessage}</div>
          <p className="text-center text-text2 bg-transparent">
            Dont have an account?{" "}
            <Link to={"/register"} className="text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
