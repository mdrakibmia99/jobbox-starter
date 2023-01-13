import React from "react";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import auth from "../../config/firebase.config";

const Navbar = () => {
  const { pathname } = useLocation();
  const {
    user: { email, role },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}
    >
      <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
        <li className="flex-auto font-semibold text-2xl">
          <Link to="/">JobBox</Link>
        </li>
        <li>
          <Link className="hover:text-primary transition-all" to="/jobs">
            Jobs
          </Link>
        </li>

        <li>
          {email ? (
            <button
              onClick={() => signOut(auth).then(() => dispatch(logout()))}
              className="hover:text-primary transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all"
              to="/login"
            >
              Login
            </Link>
          )}
        </li>

        {email && role && (
          <li>
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
