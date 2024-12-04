import React from "react";
import { NavLink } from "react-router-dom";

import { CiGrid41 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAuctionLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosNotificationsOutline, IoMdCar } from "react-icons/io";
import { MdOutlineAutorenew } from "react-icons/md";
import { useLocation } from "react-router-dom";

const CustomNavLink = ({ href, className, isActive, children }) => {
  const linkStyles =
    "text-[17px] font-medium cursor-pointer list-none hover:text-green transition-all ease-in-out";
  const activeClass = isActive ? "bg-green_100 text-green" : "";

  return (
    <>
      <NavLink
        to={href}
        className={`${className} ${linkStyles} ${activeClass}`}
      >
        {children}
      </NavLink>
    </>
  );
};

export const Sidebar = () => {
  const location = useLocation();

  const role = "buyer";
  const className = "flex items-center gap-3 mb-2 p-4 rounded-full";

  return (
    <>
      <section className="sidebar flex flex-col justify-between h-full">
        <div>
          <CustomNavLink
            href="/buyer/dashboard"
            isActive={location.pathname === "/buyer/dashboard"}
            className={className}
          >
            <span>
              <CiGrid41 size={22} />
            </span>
            <span>Dashbaord</span>
          </CustomNavLink>

          <>
            <CustomNavLink
              href="/ongoing-bids"
              isActive={location.pathname === "/ongoing-bids"}
              className={className}
            >
              <span>
                <MdOutlineAutorenew size={22} />
              </span>
              <span>Ongoing Bids</span>
            </CustomNavLink>

            <CustomNavLink
              href="/winning-bids"
              isActive={location.pathname === "/winning-bids"}
              className={className}
            >
              <span>
                <RiAuctionLine size={22} />
              </span>
              <span>Winning Bids</span>
            </CustomNavLink>

            <CustomNavLink
              href="/notifications"
              isActive={location.pathname === "/notifications"}
              className={className}
            >
              <span>
                <IoIosNotificationsOutline size={22} />
              </span>
              <span>Notifications</span>
            </CustomNavLink>

            <CustomNavLink
              href="/favorites"
              isActive={location.pathname === "/favorites"}
              className={className}
            >
              <span>
                <IoIosHeartEmpty size={22} />
              </span>
              <span>My Favorites</span>
            </CustomNavLink>

            <CustomNavLink
              href="/delivery-tracking"
              isActive={location.pathname === "/delivery-tracking"}
              className={className}
            >
              <span>
                <IoMdCar size={22} />
              </span>
              <span> Delivery Tracking</span>
            </CustomNavLink>

            <CustomNavLink
              href="/profile"
              isActive={location.pathname === "/profile"}
              className={className}
            >
              <span>
                <IoSettingsOutline size={22} />
              </span>
              <span>Personal Profile</span>
            </CustomNavLink>
          </>
        </div>
      </section>
    </>
  );
};
