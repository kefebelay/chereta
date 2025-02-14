import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "./HamburgerMenu";
import ThemeSwitcher from "./ThemeSwitcherBtn";
import { UsersContext } from "../../hooks/Users_Hook";
import Api from "../../pages/Auth/Axios";

export default function Navbar() {
  const { user, url } = useContext(UsersContext);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState();

  async function getNotificationCount() {
    const res = await Api.get(`/api/unread-notifications/${user.id}`);
    setNotificationsCount(res.data);
  }

  useEffect(() => {
    getNotificationCount();
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setHamburgerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`navbar ${
        !hamburgerOpen ? "w-screen" : "w-0 border-x-2 border-accent"
      } bg-transparent`}
    >
      <nav className=" px-4 py-4 flex justify-between items-center shadow-md shadow-nav-bg">
        <Link
          className="text-3xl font-bold leading-none md:ml-8 ml-3 bg-transparent"
          to={"/"}
        >
          <img src=" /chereta_logo.svg" className="bg-transparent h-12 w-12" />
        </Link>
        <div className="flex gap-3 items-center ">
          <ul
            className={
              "bg-transparent lg:flex lg:mx-auto lg:gap-3 lg:items-center lg:w-auto lg:space-x-7 hidden lg:pl-36"
            }
          >
            <li className="bg-transparent">
              <Link
                to={"/"}
                className={`text-md  hover:text-accent  bg-transparent ${
                  location.pathname === "/" &&
                  "text-primary font-bold underline underline-offset-4 "
                }`}
              >
                Home
              </Link>
            </li>
            <li className="bg-transparent">
              <Link
                to={"/categories"}
                className={`text-md  bg-transparent hover:text-accent ${
                  location.pathname === "/categories" &&
                  "text-primary font-bold underline underline-offset-4"
                }
                  "  `}
              >
                Categories
              </Link>
            </li>
            <li className="bg-transparent">
              <Link
                className={`
              ${
                location.pathname === "/products" &&
                "text-primary font-bold underline underline-offset-4"
              }
              text-md  hover:text-accent bg-transparent `}
                to={"/products"}
              >
                Products
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  className={`
                ${
                  location.pathname === "/my-bids" &&
                  "text-primary font-bold underline underline-offset-4 "
                }
                text-md  hover:text-accent bg-transparent `}
                  to={"/my-bids"}
                >
                  My-Bids
                </Link>
              </li>
            )}

            <li className="bg-transparent">
              <ThemeSwitcher />
            </li>
          </ul>
        </div>

        {user ? (
          <div className="md:flex gap-3 hidden justify-center items-center mr-5">
            <Link
              to={"/notifications"}
              className="lg:flex hover:text-accent mx-3 hover:scale-105 transition-transform duration-300 cursor-pointer hidden"
            >
              <i className="fas fa-bell text-3xl text-primary "></i>
              {notificationsCount > 0 && (
                <span className="bg-red-500 rounded-full w-5 h-5 font-bold flex justify-center items-center animate-pulse text-white">
                  {notificationsCount}
                </span>
              )}
            </Link>
            <div className="bg-transparent h-10 w-10 mx-3 hidden lg:block">
              <Link to={"/profile"} className="rounded-full h-10 w-10">
                <img
                  className="w-full h-full rounded-full"
                  src={url + user.image || "https://picsum.photos/200/300"}
                  alt="profile"
                />
                <p className="bg-transparent flex justify-center items-center text-sm">
                  {user.username}
                </p>
              </Link>
            </div>
          </div>
        ) : (
          <Link
            className="btn hidden lg:inline-block lg:ml-auto md:mr-3 bg-primary text-white text-md font-bold w-28 text-center"
            to={"/login"}
          >
            Log In
          </Link>
        )}

        <div className="lg:hidden mr-8 bg-transparent">
          <Hamburger isOpen={hamburgerOpen} setIsOpen={setHamburgerOpen} />
        </div>
      </nav>
    </div>
  );
}
