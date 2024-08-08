import { useState } from "react";
import SignUp from "../../components/Buyer/SignUp";
import CompanySellerSignup from "../../components/Seller/CompanySignUpForm";
import IndividualSellerSignUpForm from "../../components/Seller/IndividualSellerSignUpForm";
export default function RegisterPage() {
  const [user, setUser] = useState("buyer");

  return (
    <div className="bg-transparent m-8">
      <h1 className="text-center text-5xl text-primary pb-7 font-bold bg-transparent">
        Register
      </h1>
      <div className="p-4 md:p-0 rounded-lg border border-text2 md:py-10 md:w-[600px] mx-auto bg-transparent">
        <div className="flex gap-3 bg-transparent justify-center w-auto">
          <button
            className={`transition-all duration-300 ${
              user === "buyer"
                ? "px-3 py-1 bg-primary text-white rounded-md"
                : "px-3 py-1 bg-transparent text-primary"
            }`}
            onClick={() => setUser("buyer")}
          >
            Buyer
          </button>
          <span className="text-2xl text-text2">|</span>
          <button
            className={`transition-all duration-300 ${
              user === "individual seller"
                ? "px-3 py-1 bg-primary text-white rounded-md"
                : "px-3 py-1 bg-transparent text-primary"
            }`}
            onClick={() => setUser("individual seller")}
          >
            Individual Seller
          </button>
          <span className="text-2xl text-text2">|</span>
          <button
            className={`transition-all duration-300 ${
              user === "Company seller"
                ? "px-3 py-1 bg-primary text-white rounded-md"
                : "px-3 py-1 bg-transparent text-primary"
            }`}
            onClick={() => setUser("Company seller")}
          >
            Company Seller
          </button>
        </div>
        <div className="form-container mt-4">
          {user === "buyer" && <SignUp />}
          {user === "individual seller" && <IndividualSellerSignUpForm />}
          {user === "Company seller" && <CompanySellerSignup />}
        </div>
      </div>
    </div>
  );
}
