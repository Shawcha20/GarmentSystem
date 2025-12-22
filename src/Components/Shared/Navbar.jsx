import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { showSuccess } from "../../Utils/Notification";

export default function Navbar() {
  const { user, userSignOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // signout implemented
  const handleSignOut = async () => {
    try {
      await userSignOut();
      showSuccess("Successfully signed out");
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-pink-500 font-semibold  border-pink-500 transition-all"
      : "text-gray-600 hover:text-pink-400 transition-all";

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/all-products" className={navLinkStyle}>
          All-Product
        </NavLink>
      </li>

      {!user ? (
        <>
          <li>
            <NavLink to="/about-us" className={navLinkStyle}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact-info" className={navLinkStyle}>
              Contact
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/dashboard" className={navLinkStyle}>
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar bg-white/70 backdrop-blur-xl shadow-lg sticky top-0 z-50 px-4 lg:px-10 border-b border-pink-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-20 p-4 shadow-xl bg-white/90 rounded-xl w-52 border border-pink-200"
          >
            {links}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F472B6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 17c0-1.1-.9-2-2-2h-5V9.5c1.7-.2 3-1.7 3-3.5a3 3 0 0 0-6 0" />
            <path d="M4 17c0-1.1.9-2 2-2h5" />
            <path d="M2 17h20" />
          </svg>

          <span className="text-2xl font-extrabold text-gray-700">
            Cloth<span className="text-pink-500">Rent</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 text-gray-600 font-medium">
          {links}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex">
            <button className="btn btn-circle btn-ghost w-12 h-12 p-0 hover:bg-pink-50">
              <div className="w-10 h-10 rounded-full border-2 border-pink-300 bg-pink-100 flex items-center justify-center text-pink-500 font-bold overflow-hidden shadow-md">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  user.displayName?.charAt(0).toUpperCase() || "U"
                )}
              </div>
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-2 py-2 rounded-md text-pink-600 hover:bg-pink-50"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 flex-col lg:flex-row">
            <Link
              to="/login"
              className="btn btn-sm bg-pink-50 text-pink-600 hover:bg-pink-100 border-none"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-sm bg-pink-500 hover:bg-pink-600 text-white shadow-md border-none"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
