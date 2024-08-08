import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "../common/ThemeSwitcherBtn";

export default function SellerDashboard({ isOpen, setIsOpen }) {
  const location = useLocation();
  const breadCrumbs = location.pathname.split("/").filter((segment) => segment);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="bg-background w-full h-14 p-3 pl-9 pr-9 flex justify-between border-b border-slate-500">
        {!isOpen ? (
          <button onClick={toggleSidebar}>
            <i className="fa-solid fa-bars-staggered text-primary text-3xl bg-transparent"></i>
          </button>
        ) : (
          <h1 className=""></h1>
        )}
        <ThemeSwitcher />
      </div>
      <div className="flex">
        <div
          className={`bg-background shadow-md shadow-gray-500 h-screen fixed ${
            isOpen ? "w-64 p-5" : "w-0"
          } transition-width duration-300 overflow-hidden z-10`}
        >
          <button onClick={toggleSidebar} className="bg-transparent">
            {isOpen && (
              <i className="fa-solid text-primary fa-square-xmark text-3xl bg-transparent ml-44 mt-3"></i>
            )}
          </button>
          <ul
            className={`${
              isOpen ? "block" : "hidden"
            } mt-10 bg-transparent flex flex-col gap-3`}
          >
            <li className="mb-2">
              <Link
                to="/seller/dashboard/overview"
                className={`py-2 px-4 rounded bg-background2 border border-gray-500 shadow-sm shadow-text2 flex gap-3 ${
                  location.pathname === "/seller/dashboard/overview"
                    ? "bg-primary font-bold"
                    : "hover:text-white hover:bg-primary"
                }`}
              >
                <i className="fa-solid fa-chart-line bg-transparent mt-1"></i>
                Overview
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/seller/dashboard/products"
                className={`flex gap-3 py-2 px-4 rounded bg-background2 border border-text2 ${
                  location.pathname === "/seller/dashboard/products"
                    ? "bg-primary font-bold"
                    : "hover:bg-primary hover:text-white"
                }`}
              >
                <i className="fa-solid fa-boxes-stacked bg-transparent mt-1"></i>
                Products
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/seller/dashboard/orders"
                className={`py-2 px-4 rounded bg-background2 border border-text2 flex gap-3 shadow-md ${
                  location.pathname === "/seller/dashboard/orders"
                    ? "bg-primary font-bold"
                    : "hover:bg-primary hover:text-white"
                }`}
              >
                <i className="fa-solid fa-receipt bg-transparent mt-1"></i>
                Orders
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/seller/dashboard/reviews"
                className={`flex gap-3 py-2 px-4 rounded bg-background2 border border-text2 ${
                  location.pathname === "/seller/dashboard/reviews"
                    ? "bg-primary font-bold"
                    : "hover:bg-primary hover:text-white"
                }`}
              >
                <i className="fa-solid fa-star bg-transparent mt-1"></i>
                Reviews
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
        {breadCrumbs.map((crumb, index) => (
          <span key={index}>
            {crumb}
            {index < breadCrumbs.length - 1 && " / "}
          </span>
        ))}
      </div>
    </div>
  );
}

SellerDashboard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
