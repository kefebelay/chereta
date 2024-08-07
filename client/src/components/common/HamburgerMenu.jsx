import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcherBtn";
import { Link } from "react-router-dom";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = () => {
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Element with id "About" not found');
    }
  };

  return (
    <div className="md:hidden">
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

      {isOpen && (
        <div className="navbar-menu relative z-50">
          <div
            className="navbar-backdrop fixed inset-0 bg-background opacity-25"
            onClick={toggleMenu}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-background border-r-2 border-accent shadow-md overflow-y-auto">
            <div className="flex items-center mb-8">
              <a className="mr-auto text-3xl font-bold " href="#">
                <img src="/public/chereta_logo.svg" className=" h-9 w-9" />
              </a>
              <button className="bg-background" onClick={toggleMenu}>
                <i className="fa-solid fa-bars text-text"></i>
              </button>
            </div>
            <div>
              <ul>
                <li className="mb-1">
                  <Link
                    to={"/"}
                    className={`text-md  hover:text-accent  bg-transparent ${
                      location.pathname === "/" ? "text-accent font-bold " : ""
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
                <li className="mb-1">
                  <Link
                    className="btn hidden md:inline-block md:ml-auto md:mr-3 bg-primary text-white text-md font-bold w-28 text-center"
                    to={"/login"}
                  >
                    Log In
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
