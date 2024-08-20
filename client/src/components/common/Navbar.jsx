import { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "./HamburgerMenu";
import ThemeSwitcher from "./ThemeSwitcherBtn";
import Popup from "./Popup";

export default function Navbar() {
  const [popup, setPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function handleClick() {
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Element with id "About" not found');
    }
  }

  function onLogout() {
    setIsLoggedIn(false);
    setPopup(false);
  }

  return (
    <div className="navbar ">
      {popup && (
        <Popup
          onYes={onLogout}
          popup={popup}
          setPopup={setPopup}
          message="Are you sure you want to logout?"
        />
      )}
      <nav className=" px-4 py-2 flex justify-between items-center shadow-md shadow-nav-bg">
        <Link
          className="text-3xl font-bold leading-none md:ml-28 ml-3 bg-transparent"
          to={"/"}
        >
          <img src=" /chereta_logo.svg" className="bg-transparent h-12 w-12" />
        </Link>
        <ul
          className={`bg-transparent md:flex md:mx-auto md:items-center md:w-auto md:space-x-7 ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2`}
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
              className={`text-md  hover:text-accent  bg-transparent ${
                location.pathname === "/#About" &&
                "text-primary font-bold underline underline-offset-4 "
              }`}
              to={"/#About"}
              onClick={handleClick}
            >
              About
            </Link>
          </li>

          <li className="bg-transparent">
            <Link
              to={"/categories"}
              className={`text-md ${
                location.pathname === "/categories" &&
                "text-primary font-bold underline underline-offset-4"
              }
                  hover:text-accent bg-transparent"  `}
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

          <li className="bg-transparent">
            <ThemeSwitcher />
          </li>
        </ul>
        {isLoggedIn ? (
          <div className="md:flex gap-3 hidden justify-center items-center">
            <Link
              to={"/my-bids"}
              className="flex hover:text-accent hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <i className="fas fa-gavel text-3xl text-primary "></i>
              <span className="bg-red-500 rounded-full w-5 h-5 font-bold flex justify-center items-center animate-pulse text-white">
                3
              </span>
            </Link>
            <Link to={"/profile"} className="rounded-full bg-black h-10 w-10">
              <img
                className="w-full h-full rounded-full"
                src="https://picsum.photos/200/300"
                alt="profile"
              />
            </Link>
            <Link
              className="btn hidden md:inline-block md:ml-auto md:mr-3 bg-primary text-white text-md font-bold w-28 text-center"
              to={"/"}
              onClick={() => {
                setPopup(true);
              }}
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link
            className="btn hidden md:inline-block md:ml-auto md:mr-3 bg-primary text-white text-md font-bold w-28 text-center"
            to={"/login"}
            onClick={() => {
              setIsLoggedIn(true);
            }}
          >
            Log In
          </Link>
        )}

        <div className="md:hidden mr-10">
          <Hamburger />
        </div>
      </nav>
    </div>
  );
}
