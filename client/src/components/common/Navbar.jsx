import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "./HamburgerMenu";
import ThemeSwitcher from "./ThemeSwitcherBtn";
import { UsersContext } from "../../hooks/Users_Hook";

export default function Navbar() {
  const { user, url } = useContext(UsersContext);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
      try {
        const response = await fetch(`/api/listing/search?query=${query}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchSuggestions(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
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
       <div className="flex gap-3 items-center ">
        <Link
          className="text-3xl font-bold leading-none md:ml-8 ml-3 bg-transparent"
          to={"/"}
        >
          <img src=" /chereta_logo.svg" className="bg-transparent h-12 w-12" />
        </Link>
        <Link
          className="text-3xl text-primary font-bold leading-none  bg-transparent"
          to={"/"}
        >
          CHERETA
        </Link>
        <ul
          className={
            "bg-transparent lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-7 hidden lg:pl-36"
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
          <li className="bg-transparent">
            <ThemeSwitcher />
          </li>
          
        </ul>
        </div>
        <div className="bg-transparent relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent border-b-2 border-primary focus:outline-none"
              />
              <button type="submit" className="bg-transparent ml-2">
                <i className="fas fa-search text-primary"></i>
              </button>
            </form>
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 mt-2 w-full z-10">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(suggestion.title);
                      setSuggestions([]);
                      navigate(`/listing/${suggestion.id}`);
                    }}
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        {user ? (
          <div className="md:flex gap-3 hidden justify-center items-center mr-5">
            
            <Link
              className={`
              ${
                location.pathname === "/my-bids" &&
                "text-primary font-bold underline underline-offset-4"
              }
              text-md  hover:text-accent bg-transparent `}
              to={"/my-bids"}
            >
              My-Bids
            </Link>
            <Link
              to={"/notifications"}
              className="flex hover:text-accent mx-3 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <i className="fas fa-bell text-3xl text-primary "></i>
              <span className="bg-red-500 rounded-full w-5 h-5 font-bold flex justify-center items-center animate-pulse text-white">
                3
              </span>
            </Link>
            <div className="bg-transparent h-10 w-10 mx-3 ">
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
