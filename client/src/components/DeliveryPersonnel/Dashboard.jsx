import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "../common/ThemeSwitcherBtn";
import Logout from "../../pages/Auth/Logout";

// eslint-disable-next-line react/prop-types
export default function Dashboard({ isOpen, setIsOpen }) {
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="bg-background fixed w-full h-20 p-3 pl-9 pr-9 flex justify-between border-b border-slate-500">
        {!isOpen ? (
          <button onClick={toggleSidebar} className="bg-transparent ">
            <i className="fa-solid fa-bars-staggered text-primary text-4xl bg-transparent "></i>
          </button>
        ) : (
          <h1 className=""></h1>
        )}
        {/* <div
            className={`${
              isOpen ? "ml-72" : "ml-3"
            } transition-margin duration-200 text-text2 font-bold p-4`}
          >
            hi
          </div> */}
      </div>
      <div className="flex ">
        <div
          className={`bg-background shadow-md shadow-gray-500 h-screen fixed ${
            isOpen ? "w-64 p-5" : "w-0"
          } transition-width duration-300 overflow-hidden z-10`}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between mt-12">
                <img
                  className="h-8  bg-transparent"
                  src="../../../public/chereta_logo.svg"
                  alt="logo"
                />
                <button onClick={toggleSidebar} className="  bg-transparent ">
                  {isOpen && (
                    <i className="fa-solid text-primary fa-square-xmark text-3xl bg-transparentmt-3"></i>
                  )}
                </button>
              </div>
              <ul
                className={`${
                  isOpen ? "block" : "hidden"
                } mt-10 bg-transparent flex flex-col gap-3`}
              >
                <li className="mb-2">
                  <Link
                    to="/delivery/dashboard"
                    className={`py-2 px-4 rounded bg-background2 border border-text2 flex gap-3 shadow-md ${
                      location.pathname === "/delivery/dashboard"
                        ? "bg-primary font-bold text-white"
                        : "hover:bg-primary hover:text-white"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-chart-bar bg-transparent mt-1
                ${
                  location.pathname === "/delivery/dashboard" &&
                  "bg-primary font-bold text-white"
                }`}
                    ></i>
                    Dashboard
                  </Link>
                </li>

                <li className="mb-2">
                  <Link
                    to="/delivery/dashboard/orders"
                    className={`py-2 px-4 rounded bg-background2 border border-text2 flex gap-3 shadow-md ${
                      location.pathname === "/delivery/dashboard/orders"
                        ? "bg-primary font-bold text-white"
                        : "hover:bg-primary hover:text-white"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-receipt bg-transparent mt-1
                ${
                  location.pathname === "/delivery/dashboard/orders" &&
                  "bg-primary font-bold text-white"
                }`}
                    ></i>
                    Orders
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/delivery/dashboard/history"
                    className={`py-2 px-4 rounded bg-background2 border border-text2 flex gap-3 shadow-md ${
                      location.pathname === "/delivery/dashboard/history"
                        ? "bg-primary font-bold text-white"
                        : "hover:bg-primary hover:text-white"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-receipt bg-transparent mt-1
                ${
                  location.pathname === "/delivery/dashboard/history" &&
                  "bg-primary font-bold text-white"
                }`}
                    ></i>
                    History
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full flex flex-row-reverse justify-between">
              <Logout />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "ml-72" : "ml-3"
        } transition-margin duration-200 text-text2 font-bold p-4`}
      ></div>
    </div>
  );
}
