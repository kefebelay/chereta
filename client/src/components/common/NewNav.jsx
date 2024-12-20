import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../../hooks/Users_Hook";

export default function NewNav() {
  const { user } = useContext(UsersContext);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

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
    <div className="navbar w-screen bg-white shadow-md fixed top-0 left-0 z-50">
      <nav className="flex items-center justify-between px-6 py-3">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/chereta_logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-primary">CHERETA</span>
          </Link>
        </div>

        {/* Navigation Links and Search Bar */}
        <div className="flex items-center space-x-8">
          <ul className="hidden lg:flex items-center space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-gray-700 hover:text-primary">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-700 hover:text-primary">
                Product
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-64 outline-none"
            />
            <button className="px-4 bg-primary text-white">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/my-bids"
                className="flex items-center text-gray-700 hover:text-primary"
              >
                <i className="fas fa-gavel text-xl"></i>
                <span className="ml-1 text-sm">My Bids</span>
              </Link>
              <Link to="/notifications" className="text-gray-700 hover:text-primary">
                <i className="fas fa-bell text-xl"></i>
              </Link>
              <Link to="/profile" className="flex items-center">
                <img
                  src="https://picsum.photos/40"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="btn bg-primary text-white text-sm px-4 py-2 rounded-full"
            >
              Log In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
