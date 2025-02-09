/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcherBtn";
import { Link } from "react-router-dom";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../../pages/Auth/Axios";

export default function Hamburger({ isOpen, setIsOpen }) {
  const { user } = useContext(UsersContext);
  const [notificationsCount, setNotificationsCount] = useState();
  async function getNotificationCount() {
    const res = await Api.get(`/api/unread-notifications/${user.id}`);
    setNotificationsCount(res.data);
    console.log(res);
  }

  useEffect(() => {
    getNotificationCount();
  }, []);

  function handleClick() {
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Element with id "About" not found');
    }
  }

  return (
    <div className="lg:hidden bg-transparent border-solid border-primary">
      {!isOpen && (
        <div className="flex">
          <div className="p-3">
            <ThemeSwitcher />
          </div>

          <button
            className="flex items-center text-accent p-3"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="block h-6 w-6 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className="bg-transparent flex justify-center w-screen"
          onClick={() => setIsOpen(false)}
        >
          <div className="navbar-menu bg-transparent z-10">
            <nav className="fixed inset-0 flex flex-col w-48 max-w-sm py-6 px-6 shadow-sm shadow-text2 overflow-y-auto">
              <div className="flex items-center mb-8">
                <a className="mr-auto text-3xl font-bold " href="#">
                  <img src="/public/chereta_logo.svg" className=" h-9 w-9" />
                </a>
                <button
                  className="bg-background"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg font-extrabold">X</span>
                </button>
              </div>
              <div>
                <Link
                  to={"/notifications"}
                  className="flex hover:text-accent mx-3 hover:scale-105 transition-transform duration-300 cursor-pointer justify-end"
                >
                  <i className="fas fa-bell text-3xl text-primary "></i>
                  {notificationsCount > 0 && (
                    <span className="bg-red-500 rounded-full w-5 h-5 font-bold flex justify-center items-center animate-pulse text-white">
                      {notificationsCount}
                    </span>
                  )}
                </Link>
                <ul className="grid place-items-center">
                  {user ? (
                    <li className="mt-3 flex flex-col justify-center items-center">
                      <div className="bg-transparent h-10 w-10 mr-3  ">
                        <Link
                          to={"/profile"}
                          className="rounded-full h-10 w-10"
                        >
                          <img
                            className="w-full h-full rounded-full"
                            src="https://picsum.photos/200/300"
                            alt="profile"
                          />
                          <p className="bg-transparent flex justify-center items-center text-sm">
                            {user.username}
                          </p>
                        </Link>
                      </div>
                      <p className=" w-full text-accent bg-transparent mb-5 mt-3 text-center ">
                        _______________
                      </p>
                    </li>
                  ) : (
                    <li className="mt-3 mb-10">
                      <Link
                        className="btn  md:inline-block md:ml-auto md:mr-3 bg-primary text-white text-md font-bold w-28 text-center"
                        to={"/login"}
                      >
                        login
                      </Link>
                    </li>
                  )}
                  <li className="mb-1">
                    <Link
                      to={"/"}
                      className={`text-md  hover:text-primary  bg-transparent ${
                        location.pathname === "/"
                          ? "text-primary font-bold "
                          : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      className="text-md hover:text-accent bg-none bg-transparent"
                      to={"/my-bids"}
                      onClick={handleClick}
                    >
                      my bids
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      to={"/categories"}
                      className={`text-md ${
                        location.pathname === "/categories"
                          ? "text-accent font-bold "
                          : ""
                      }
                  hover:text-accent bg-transparent" to={"/categories"} `}
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      className="text-md  hover:text-accent bg-transparent"
                      to={"/products"}
                    >
                      Products
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
