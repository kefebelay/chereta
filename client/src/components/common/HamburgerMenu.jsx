import { useContext, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcherBtn";
import { Link } from "react-router-dom";
import Popup from "./Popup";
import { UsersContext } from "../../hooks/Users_Hook";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState(false);
  const { user } = useContext(UsersContext);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function onLogout() {
    setIsLoggedIn(false);
    setPopup(false);
  }

  function handleClick() {
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Element with id "About" not found');
    }
  }

  return (
    <div className="lg:hidden bg-transparent">
      {popup && (
        <Popup
          onYes={onLogout}
          popup={popup}
          setPopup={setPopup}
          message="Are you sure you want to logout?"
        />
      )}
      {!isOpen && (
        <div className="flex">
          <div className="p-3">
            <ThemeSwitcher />
          </div>

          <button
            className="navbar-burger flex items-center text-accent p-3"
            onClick={toggleMenu}
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
        <div className="navbar-menu bg-transparent z-10">
          <nav className="fixed inset-0 flex flex-col w-48 max-w-sm py-6 px-6  shadow-md overflow-y-auto">
            <div className="flex items-center mb-8">
              <a className="mr-auto text-3xl font-bold " href="#">
                <img src="/public/chereta_logo.svg" className=" h-9 w-9" />
              </a>
              <button className="bg-background" onClick={toggleMenu}>
                <i className="fa-solid fa-rectangle-xmark"></i>
              </button>
            </div>
            <div>
              <ul className="grid place-items-center">
                {!isLoggedIn ? (
                  <li className="mt-3 flex flex-col justify-center items-center">
                    <div className="bg-transparent h-10 w-10 mr-3  ">
                      <Link to={"/profile"} className="rounded-full h-10 w-10">
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
                  <li className="mt-3">
                    <Link
                      className="btn  md:inline-block md:ml-auto md:mr-3 bg-primary text-white text-md font-bold w-28 text-center"
                      to={"/login"}
                    >
                      Log In
                    </Link>
                  </li>
                )}
                <li className="mb-1">
                  <Link
                    to={"/"}
                    className={`text-md  hover:text-primary  bg-transparent ${
                      location.pathname === "/" ? "text-primary font-bold " : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="text-md hover:text-accent bg-none bg-transparent"
                    to={"/#About"}
                    onClick={handleClick}
                  >
                    About
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
      )}
    </div>
  );
}
