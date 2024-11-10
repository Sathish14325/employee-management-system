import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  const [role, setRole] = useState(localStorage.getItem("role")); // get the user role (admin or user for rendering)

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-2xl"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/employees-list"}>Employees List</Link>
            </li>
            {role && (
              <li>
                <Link>{role}</Link>
              </li>
            )}
          </ul>
        </div>
        <Link className="btn btn-ghost text-2xl" to={"/"}>
          StaffWise
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/employees-list"}>Employees List</Link>
          </li>
          {role && (
            <li>
              <Link>{role}</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
        <button className="btn">
          <Link to={"/login"}>Login</Link>
        </button>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
