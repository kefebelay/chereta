import { Link, useLocation } from "react-router-dom";
import Logout from "../../pages/Auth/Logout";
import ThemeSwitcher from "../common/ThemeSwitcherBtn";
import Logout from "../../pages/Auth/Logout";

export default function Dashboard({ isOpen, setIsOpen }) {
  const location = useLocation();
  const breadCrumbs = location.pathname.split("/");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="bg-background w-full h-14 p-3 pl-9 pr-9 flex justify-between border-b border-slate-500 fixed">
        <div className="flex">
          {!isOpen ? (
            <div className="flex flex-row-reverse gap-6">
              <button onClick={toggleSidebar}>
                <i className="fa-solid fa-bars-staggered text-primary text-3xl bg-transparent"></i>
              </button>

              <img
                className="h-8  bg-transparent"
                src="/chereta_logo.svg"
                alt="logo"
              />
            </div>
          ) : (
            <h1 className=""></h1>
          )}
          <div
            className={`${
              isOpen ? "ml-72" : "ml-3"
            } transition-margin duration-200 text-text2 font-bold p-4`}
          >
            <div className="hidden md:block">
              {breadCrumbs.map((crumb, index) => (
                <span className="text-text2 text-xs" key={index}>
                  <span className="text-text2">{crumb}</span>
                  {index !== breadCrumbs.length - 1 && (
                    <span className="text-text2"> &gt;&gt; </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <ThemeSwitcher />
      </div>
      <div className="flex">
        <div
          className={`bg-background shadow-md shadow-gray-500 h-screen fixed ${
            isOpen ? "w-64 p-5" : "w-0"
          } transition-width duration-300 overflow-hidden z-10`}
        >
          <div className="flex justify-between">
            <img
              className="h-8  bg-transparent"
              src="/chereta_logo.svg"
              alt="logo"
            />
            <button onClick={toggleSidebar} className="  bg-transparent ">
              {isOpen && (
                <i className="fa-solid text-primary fa-square-xmark text-3xl bg-transparentmt-3"></i>
              )}
            </button>
          </div>
          <div className="flex flex-col justify-between h-full">
            <ul
              className={`${
                isOpen ? "block" : "hidden"
              } mt-10 bg-transparent flex flex-col gap-3`}
            >
              <li className="mb-2">
                <Link
                  to="/admin/dashboard"
                  className={`py-2 px-4 rounded bg-background2 border border-text2 shadow-sm shadow-text2 flex gap-3 ${
                    location.pathname === "/admin/dashboard"
                      ? "bg-primary font-bold text-white"
                      : "hover:text-white hover:bg-primary"
                  } `}
                >
                  <i className="fa-solid fa-table-columns bg-transparent mt-1"></i>
                  Overview
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/admin/dashboard/analytics"
                  className={`py-2 px-4 rounded bg-background2 border border-gray-500 
                shadow-sm shadow-text2 flex gap-3 ${
                  location.pathname === "/admin/dashboard/analytics"
                    ? "bg-primary font-bold text-white"
                    : " hover:text-white hover:bg-primary"
                }`}
                >
                  <i
                    className={`fa-solid fa-chart-line bg-transparent mt-1
                ${
                  location.pathname === "/admin/dashboard/analytics" &&
                  "text-white"
                } `}
                  ></i>
                  Analytics
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/admin/dashboard/category"
                  className={`py-2 px-4 rounded bg-background2 border border-gray-500 
                shadow-sm shadow-text2 flex gap-3 ${
                  location.pathname === "/admin/dashboard/category"
                    ? "bg-primary font-bold text-white"
                    : " hover:text-white hover:bg-primary"
                }`}
                >
                  <i
                    className={`fa-solid fa-list bg-transparent mt-1
                ${
                  location.pathname === "/admin/dashboard/category" &&
                  "text-white"
                } `}
                  ></i>
                  Category
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/admin/dashboard/user-management"
                  className={`flex gap-3 py-2 px-4 rounded bg-background2 border border-text2 ${
                    location.pathname === "/admin/dashboard/user-management"
                      ? "bg-primary font-bold text-white"
                      : "hover:bg-primary hover:text-white"
                  }`}
                >
                  <i
                    className={`fa-solid fa-users-gear bg-transparent mt-1
                 ${
                   location.pathname === "/admin/dashboard/user-management" &&
                   "text-white"
                 } `}
                  ></i>
                  User Management
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/admin/dashboard/reports"
                  className={`py-2 px-4 rounded bg-background2 border border-text2 flex gap-3 shadow-md ${
                    location.pathname === "/admin/dashboard/reports"
                      ? "bg-primary font-bold text-white"
                      : "hover:bg-primary hover:text-white"
                  }`}
                >
                  <i
                    className={`fa-regular fa-flag bg-transparent mt-1
                 ${
                   location.pathname === "/admin/dashboard/reports" &&
                   "text-white"
                 } `}
                  ></i>
                  Reports
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/admin/dashboard/delivery-personnel"
                  className={`flex gap-3 py-2 px-4 rounded bg-background2 border border-text2 ${
                    location.pathname === "/admin/dashboard/delivery-personnel"
                      ? "bg-primary font-bold text-white"
                      : "hover:bg-primary hover:text-white"
                  }`}
                >
                  <i
                    className={`fa-regular fa-id-card  bg-transparent mt-1
                 ${
                   location.pathname ===
                     "/admin/dashboard/delivery-personnel" && "text-white"
                 } `}
                ></i>
                Delivery Personnel
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
