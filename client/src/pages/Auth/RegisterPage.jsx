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
    company_name: "",
  });
  const [userType, setUserType] = useState("");
  const [sellerType, setSellerType] = useState("");
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
      const res = await Axios.post("http://127.0.0.1:8000/api/register", {
        ...user,
        userType,
        sellerType,
      });
      console.log(res);
      setSuccessMessage("Registration successful");
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
        {!userType ? (
          <div className="flex flex-col bg-transparent">
            <button
              onClick={() => setUserType("buyer")}
              className="btn bg-primary text-center mt-4 mx-4 text-white font-bold"
            >
              Sign up as Buyer
            </button>
            <button
              onClick={() => setUserType("seller")}
              className="btn bg-primary text-center mt-4 mx-4 text-white font-bold"
            >
              Sign up as Seller
            </button>
          </div>
        ) : userType === "seller" && !sellerType ? (
          <div className="flex flex-col bg-transparent">
            <button
              onClick={() => setSellerType("company")}
              className="btn bg-primary text-center mt-4 mx-4 text-white font-bold"
            >
              Company Seller
            </button>
            <button
              onClick={() => setSellerType("individual")}
              className="btn bg-primary text-center mt-4 mx-4 text-white font-bold"
            >
              Individual Seller
            </button>
          </div>
        ) : (
          <div>
            {userType === "buyer" && (
              <BuyerForm setInput={setInput} user={user} />
            )}
            {userType === "seller" && sellerType === "company" && (
              <CompanySellerForm setInput={setInput} user={user} />
            )}
            {userType === "seller" && sellerType === "individual" && (
              <IndividualSellerForm setInput={setInput} user={user} />
            )}
            <button
              onClick={submitBtn}
              className="btn bg-primary text-center mt-4 mx-4 text-white font-bold"
            >
              Register
            </button>
          </div>
        )}
        <div className="text-center text-red-500">{errorMessage}</div>
        <div className="text-center text-green-500">{successMessage}</div>
      </div>
    </div>
  );
}
