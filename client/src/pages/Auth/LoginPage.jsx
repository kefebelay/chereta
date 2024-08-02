import { useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  function setInput(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }
  function submitBtn() {
    console.log(user);
  }
  return (
    <div>
      <h1 className="text-center text-5xl font-extrabold m-9 text-primary">
        Login
      </h1>
      <div className="flex p-10 gap-4 justify-between mx-48">
        <div className="md:h-[29rem] md:w-[30rem] bg-background2 hidden md:block w-full"></div>
        <div className=" grid grid-cols-1 place-items-center bg-background2">
          <form className="flex flex-col w-full bg-transparent">
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
              className="btn bg-primary text-center m-4 text-white font-bold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
