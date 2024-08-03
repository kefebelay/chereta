import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [user, setUser] = useState({
    name: "",
    phone_number: "",
    username: "",
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
      const res = await Axios.post("http://127.0.0.1:8000/api/register", user);
      console.log(res);
      console.log(setSuccessMessage("Registration successful"));
      navigate("/login");
    } catch (err) {
      setErrorMessage("An error occurred");
    }
  }

  return (
    <div className="w-full bg-transparent grid grid-cols-1 place-items-center">
      <h1 className="text-center text-3xl md:text-5xl font-extrabold m-9 text-primary">
        Sign-up
      </h1>
      <div>
        <form className="flex flex-col bg-transparent" type="submit">
          <input
            onChange={setInput}
            name="email"
            type="email"
            placeholder="Enter Email"
            className="border border-text2 p-3 rounded-lg m-3 w-80"
            value={user.email}
          />
          <input
            onChange={setInput}
            name="password"
            type="password"
            placeholder="Enter Password"
            className="border border-text2 p-3 rounded-lg m-3"
            value={user.password}
          />
          <input
            onChange={setInput}
            name="name"
            type="text"
            placeholder="Enter full name"
            className="border border-text2 p-3 rounded-lg m-3"
            value={user.name}
          />
          <input
            onChange={setInput}
            name="username"
            type="text"
            placeholder="Enter username"
            className="border border-text2 p-3 rounded-lg m-3"
            value={user.username}
          />
          <input
            onChange={setInput}
            name="phone_number"
            type="text"
            placeholder="Enter phone number"
            className="border border-text2 p-3 rounded-lg m-3"
            value={user.phone_number}
          />
          <button
            onClick={submitBtn}
            className="btn bg-primary text-center mt-4 mx-4 text-white font-bold"
          >
            Register
          </button>
        </form>
        <div className="text-center text-red-500">{errorMessage}</div>
        <div className="text-center text-green-500">{successMessage}</div>
      </div>
    </div>
  );
}
