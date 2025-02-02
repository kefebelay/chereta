/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import {
  IoIosHeartEmpty,
  IoIosNotificationsOutline,
  IoMdCar,
} from "react-icons/io";
import { RiAuctionLine } from "react-icons/ri";
import { MdOutlineAutorenew } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

export const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="md:hidden flex justify-end mt-3 fixed top-20 left-3 z-50 bg-transparent">
        <button onClick={toggleSidebar}>
          <GiHamburgerMenu size={28} className="text-primary" />
        </button>
      </div>
      <section
        className={`sidebar flex flex-col justify-between h-full pt-6 bg-background shadow-lg ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="p-4">
          <NavLink
            to="/buyer/dashboard"
            className={`flex items-center gap-3 mb-2 p-4 rounded-full bg-transparent ${
              location.pathname === "/buyer/dashboard"
                ? "bg-primary text-white"
                : "bg-background2 text-text2 hover:bg-primary hover:text-white"
            }`}
          >
            <span
              className={`bg-transparent ${
                location.pathname === "/buyer/dashboard"
                  ? "text-white"
                  : "text-primary"
              }`}
            >
              <CiGrid41 size={22} />
            </span>
            <span className="bg-transparent">Dashboard</span>
          </NavLink>

          <NavLink
            to="/ongoing-bids"
            className={`flex items-center gap-3 mb-2 p-4 rounded-full bg-transparent ${
              location.pathname === "/ongoing-bids"
                ? "bg-primary text-white"
                : "bg-background2 text-text2 hover:bg-primary hover:text-white"
            }`}
          >
            <span
              className={`bg-transparent ${
                location.pathname === "/ongoing-bids"
                  ? "text-white"
                  : "text-primary"
              }`}
            >
              <MdOutlineAutorenew size={22} />
            </span>
            <span className="bg-transparent">Ongoing Bids</span>
          </NavLink>

          <NavLink
            to="/winning-bids"
            className={`flex items-center gap-3 mb-2 p-4 rounded-full bg-transparent ${
              location.pathname === "/winning-bids"
                ? "bg-primary text-white"
                : "bg-background2 text-text2 hover:bg-primary hover:text-white"
            }`}
          >
            <span
              className={`bg-transparent ${
                location.pathname === "/winning-bids"
                  ? "text-white"
                  : "text-primary"
              }`}
            >
              <RiAuctionLine size={22} />
            </span>
            <span className="bg-transparent">Winning Bids</span>
          </NavLink>

          <NavLink
            to="/notifications"
            className={`flex items-center gap-3 mb-2 p-4 rounded-full bg-transparent ${
              location.pathname === "/notifications"
                ? "bg-primary text-white"
                : "bg-background2 text-text2 hover:bg-primary hover:text-white"
            }`}
          >
            <span
              className={`bg-transparent ${
                location.pathname === "/notifications"
                  ? "text-white"
                  : "text-primary"
              }`}
            >
              <IoIosNotificationsOutline size={22} />
            </span>
            <span className="bg-transparent">Notifications</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={`flex items-center gap-3 mb-2 p-4 rounded-full bg-transparent ${
              location.pathname === "/favorites"
                ? "bg-primary text-white"
                : "bg-background2 text-text2 hover:bg-primary hover:text-white"
            }`}
          >
            <span
              className={`bg-transparent ${
                location.pathname === "/favorites"
                  ? "text-white"
                  : "text-primary"
              }`}
            >
              <IoIosHeartEmpty size={22} />
            </span>
            <span className="bg-transparent">My Favorites</span>
          </NavLink>

          <NavLink
            to="/delivery-tracking"
            className={`flex items-center gap-3 mb-2 p-4 rounded-full bg-transparent ${
              location.pathname === "/delivery-tracking"
                ? "bg-primary text-white"
                : "bg-background2 text-text2 hover:bg-primary hover:text-white"
            }`}
          >
            <span
              className={`bg-transparent ${
                location.pathname === "/delivery-tracking"
                  ? "text-white"
                  : "text-primary"
              }`}
            >
              <IoMdCar size={22} />
            </span>
            <span className="bg-transparent">Delivery Tracking</span>
          </NavLink>
        </div>
      </section>
    </>
  );
};
