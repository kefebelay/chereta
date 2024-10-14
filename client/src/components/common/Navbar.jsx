import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "./HamburgerMenu";
import ThemeSwitcher from "./ThemeSwitcherBtn";
import { UsersContext } from "../../hooks/Users_Hook";
import Logout from "../../pages/Auth/Logout";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(UsersContext);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function handleClick() {
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className={`navbar ${!hamburgerOpen ? "w-screen" : "w-10px"}`}>
      <nav className=" px-4 py-4 flex justify-between items-center shadow-md shadow-nav-bg">
        <Link
          className="text-3xl font-bold leading-none md:ml-28 ml-3 bg-transparent"
          to={"/"}
        >
          <img src=" /chereta_logo.svg" className="bg-transparent h-12 w-12" />
        </Link>
        <ul
          className={`bg-transparent lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-7 ${
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

          <li className="bg-transparent">
            <ThemeSwitcher />
          </li>
        </ul>
        {user ? (
          <div className="lg:flex gap-x-3 hidden justify-center items-center mr-5">
            <Link
              to={"/my-bids"}
              className="flex hover:text-accent hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <i className="fas fa-gavel text-3xl text-primary "></i>
              <span className="bg-red-500 rounded-full w-5 h-5 font-bold flex justify-center items-center animate-pulse text-white">
                3
              </span>
            </Link>
            <div className="bg-transparent h-10 w-10 mx-5 ">
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
          </div>
        ) : (
          <Link
            className="btn hidden md:inline-block md:ml-auto md:mr-3 bg-primary text-white text-md font-bold w-28 text-center"
            to={"/login"}
          >
            Log In
          </Link>
        )}

        <div
          className="lg:hidden mr-8 bg-transparent"
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
        >
          <Hamburger />
        </div>
      </nav>
    </div>
  );
}
