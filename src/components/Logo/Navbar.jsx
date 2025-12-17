import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/meals">Meals</NavLink>
      </li>
      {
        user && <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      }
    </>
  );

  const handleLogOut = () => {
    logOut().then(() => {
      toast.success("log out successful");
    });
  };

  return (
    <div className="navbar p-0 bg-primary shadow-sm text-white">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="text-lg menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="text-lg menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end space-x-2">
        {user ? (
          <div className="flex gap-5 items-center">
            <button onClick={handleLogOut} className="btn btn-sm text-primary">
              Log Out
            </button>
           <div 
           data-tip={user?.displayName}
           className="tooltip tooltip-bottom  relative w-14 h-14 flex justify-center items-center">
  {/* Animated border */}
  <div className=" absolute inset-0 rounded-full border-3 border-secondary animate-pulse"></div>

  {/* Image (no animation) */}
  <img
    
    className=" relative w-12 h-12 rounded-full object-cover border-2 border-secondary"
    src={user?.photoURL}
    alt=""
  />
</div>
          </div>
        ) : (
          <>
            <Link className="btn btn-sm text-primary" to="/auth-layout/login">
              Login
            </Link>
            <Link
              className="btn btn-sm text-primary"
              to="/auth-layout/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
