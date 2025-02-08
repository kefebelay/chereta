import { useState } from "react";
import SignUp from "../../components/Buyer/SignUp";
import CompanySellerSignup from "../../components/Seller/CompanySignUpForm";
import IndividualSellerSignUpForm from "../../components/Seller/IndividualSellerSignUpForm";
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const [user, setUser] = useState("individual seller");

  return (
    <div className="bg-transparent p-10 mb-10 md:p-0">
      <h1 className="text-center text-5xl text-primary p-5 font-bold bg-transparent">
        Register
      </h1>
      <div className="p-4 md:p-0 rounded-lg border border-text2 md:py-3 md:mx-10 mx-auto bg-transparent">
        <div className="flex gap-3 bg-transparent justify-center w-auto">
          <button
            className={`border border-transparent duration-300 ${
              user === "individual seller"
                ? "px-3 py-1 bg-primary text-white rounded-md"
                : "px-3 py-1 bg-transparent text-primary hover:border-primary rounded-md"
            }`}
            onClick={() => setUser("individual seller")}
          >
            Individual Seller
          </button>
          <span className="text-2xl text-text2">|</span>
          <button
            className={`border border-transparent duration-300 ${
              user === "Company seller"
                ? "px-3 py-1 bg-primary text-white rounded-md"
                : "px-3 py-1 bg-transparent text-primary hover:border hover:border-primary rounded-md"
            }`}
            onClick={() => setUser("Company seller")}
          >
            Company Seller
          </button>
        </div>
        <div className=" m-3">
          {user === "buyer" && <SignUp />}
          {user === "individual seller" && <IndividualSellerSignUpForm />}
          {user === "Company seller" && <CompanySellerSignup />}
          <p className="p-3 text-center">
            Already have an account?
            <Link to="/login" className="text-primary hover:text-blue-400">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
