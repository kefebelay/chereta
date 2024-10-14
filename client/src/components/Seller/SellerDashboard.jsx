import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "../common/ThemeSwitcherBtn";
import { useContext } from "react";
import { UsersContext } from "../../hooks/Users_Hook";
import Logout from "../../pages/Auth/Logout";

export default function SellerDashboard({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { user } = useContext(UsersContext);

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
        {user && (
          <div className="flex gap-5 mt-2">
            <Link
              to={
                user.roles[0].name === "company_seller"
                  ? "/seller/company/profile"
                  : "/seller/profile"
              }
              className="bg-transparent"
            >
              <i className="fa-regular fa-user text-3xl"></i>
            </Link>
          </div>
        )}
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
                    to="/seller/dashboard/"
                    className={`py-2 px-4 rounded bg-background2 border border-text2 shadow-sm shadow-text2 flex gap-3 ${
                      location.pathname === "/seller/dashboard/"
                        ? "bg-primary font-bold text-white"
                        : "hover:text-white hover:bg-primary"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-table-columns bg-transparent mt-1
                ${
                  location.pathname === "/seller/dashboard/" &&
                  "bg-primary font-bold text-white"
                }`}
                    ></i>
                    Overview
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/seller/dashboard/analytics"
                    className={`py-2 px-4 rounded bg-background2 border border-text2 shadow-sm shadow-text2 flex gap-3 ${
                      location.pathname === "/seller/dashboard/analytics"
                        ? "bg-primary font-bold text-white"
                        : "hover:text-white hover:bg-primary"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-chart-line bg-transparent mt-1
                ${
                  location.pathname === "/seller/dashboard/analytics" &&
                  "bg-primary font-bold text-white"
                }`}
                    ></i>
                    Analytics
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/seller/dashboard/products"
                    className={`flex gap-3 py-2 px-4 rounded bg-background2 border border-text2 ${
                      location.pathname === "/seller/dashboard/products"
                        ? "bg-primary font-bold text-white"
                        : "hover:bg-primary hover:text-white"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-boxes-stacked bg-transparent mt-1
                ${
                  location.pathname === "/seller/dashboard/products"
                    ? "bg-primary font-bold text-white"
                    : "hover:bg-primary hover:text-white"
                }`}
                    ></i>
                    Products
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/seller/dashboard/orders"
                    className={`py-2 px-4 rounded bg-background2 border border-text2 flex gap-3 shadow-md ${
                      location.pathname === "/seller/dashboard/orders"
                        ? "bg-primary font-bold text-white"
                        : "hover:bg-primary hover:text-white"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-receipt bg-transparent mt-1
                ${
                  location.pathname === "/seller/dashboard/orders" &&
                  "bg-primary font-bold text-white"
                }`}
                    ></i>
                    Orders
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/seller/dashboard/comments"
                    className={`flex gap-3 py-2 px-4 rounded bg-background2 border border-text2 ${
                      location.pathname === "/seller/dashboard/comments"
                        ? "bg-primary font-bold text-white"
                        : "hover:bg-primary hover:text-white"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-comments bg-transparent mt-1
                   ${
                     location.pathname === "/seller/dashboard/comments" &&
                     "bg-primary font-bold text-white"
                   }`}
                    ></i>
                    Comments
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

SellerDashboard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
