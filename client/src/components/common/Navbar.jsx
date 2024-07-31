import { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "./HamburgerMenu";
import ThemeSwitcher from "./ThemeSwitcherBtn";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Element with id "About" not found');
    }
  };

  return (
    <div className="">
      <nav className=" relative px-4 py-2 flex justify-between items-center shadow-md shadow-nav-bg">
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
                location.pathname === "/" ? "text-accent font-bold " : ""
              }`}
            >
              Home
            </Link>
          </li>

          <li className="bg-transparent">
            <Link
              className="text-md hover:text-accent bg-none bg-transparent"
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
                location.pathname === "/categories"
                  ? "text-accent font-bold "
                  : ""
              }
                  hover:text-accent bg-transparent" to={"/categories"} `}
            >
              Categories
            </Link>
          </li>

          <li className="bg-transparent">
            <a
              className="text-md  hover:text-accent bg-transparent"
              href="#Contact"
            >
              Contact
            </a>
          </li>

          <li className="bg-transparent">
            <ThemeSwitcher />
          </li>
        </ul>
        <Link
          className="btn hidden md:inline-block md:ml-auto md:mr-3 bg-primary text-white text-md font-bold "
          to={"/login"}
        >
          Log In
        </Link>

        <div className="md:hidden">
          <Hamburger />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
