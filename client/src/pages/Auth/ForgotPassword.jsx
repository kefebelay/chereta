import { useState } from "react";
import Api from "./Axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (email === "") {
      setMessage("Please provide your email");
      return;
    }

    setIsSubmitting(true);
    const csrf = Cookies.get("XSRF-TOKEN");
    try {
      const res = await Api.post(
        "/api/forgot-password",
        { email },
        {
          headers: {
            "X-XSRF-TOKEN": csrf,
          },
        }
      );
      setMessage(res.data.message);
      console.log(res);
    } catch (err) {
      if (err.response?.status === 422) {
        setMessage(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-24 text-primary">
        Forgot Password
      </h1>
      <form className="max-w-md mx-auto mt-8 grid place-items-center">
        <div className="flex gap-3 justify-center items-center">
          <label className="block text-text font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-5 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <p className="text-red-500 text-sm pt-2">{message}</p>
        <p className="text-text2 text-sm ">
          Enter your email to reset your password. A verification email will be
          sent to the email address.
        </p>
        <div className="flex justify-center">
          <button
            className="bg-primary hover:bg-primary-dark text-text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
