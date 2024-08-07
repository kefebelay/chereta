import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "../common/ThemeSwitcherBtn";

export default function Dashboard({ isOpen, setIsOpen }) {
  const location = useLocation();
  const breadCrumbs = location.pathname.split("/").filter((segment) => segment);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="bg-background w-full h-14 p-3 pl-9 pr-9 flex justify-between border-b border-text2">
        {!isOpen ? (
          <button onClick={toggleSidebar}>
            <i className="fa-solid fa-bars-staggered text-3xl bg-transparent"></i>
          </button>
        ) : (
          <h1 className=""></h1>
        )}
        <ThemeSwitcher />
      </div>
      <div className="flex">
        <div
          className={`bg-background border-r border-text2 h-screen fixed ${
            isOpen ? "w-64 p-5" : "w-0"
          } transition-width duration-300 overflow-hidden z-10`}
        >
          <button onClick={toggleSidebar} className="  bg-transparent ">
            {isOpen && (
              <i className="fa-solid fa-square-xmark text-3xl bg-transparent ml-44 mt-3"></i>
            )}
          </button>
          <ul className={`${isOpen ? "block" : "hidden"} mt-10 bg-transparent`}>
            <li className="mb-2">
              <Link
                to="/admin/dashboard/analytics"
                className={`block py-2 px-4 rounded bg-background2 ${
                  location.pathname === "/admin/analytics"
                    ? "bg-gray-700 font-bold"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
              >
                Analytics
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin/dashboard/user-management"
                className={`block py-2 px-4 rounded bg-background2 ${
                  location.pathname === "/admin/user-management"
                    ? "bg-gray-700 font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                User Management
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin/reports"
                className={`block py-2 px-4 rounded bg-background2 ${
                  location.pathname === "/admin/dashboard/reports"
                    ? "bg-gray-700 font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                Reports
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin/delivery-personnel-management"
                className={`block py-2 px-4 rounded bg-background2 ${
                  location.pathname ===
                  "/admin/dashboard/delivery-personnel-management"
                    ? "bg-gray-700 font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                Delivery Personnel
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin/address"
                className={`block py-2 px-4 rounded bg-background2 ${
                  location.pathname === "/admin/dashboard/address"
                    ? "bg-gray-700 font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                Address
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "ml-72" : "ml-3"
        } transition-margin duration-200 text-text2 font-bold p-4`}
      >
        {breadCrumbs[0].toUpperCase()} &gt; {breadCrumbs[1].toUpperCase()}
      </div>
    </div>
  );
}
Dashboard.propTypes = {
  open: PropTypes.bool.isRequired,
};
