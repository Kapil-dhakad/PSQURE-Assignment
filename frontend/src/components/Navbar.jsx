import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TourContext } from "../context/TourBookingContext";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(TourContext);

  const handleAdminClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      toast.error("Access only for Admin!");
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white rounded-full p-2 text-lg">✈️</div>
          <h1 className="text-2xl font-semibold text-gray-800">Argo</h1>
        </div>

        <ul className="flex space-x-10 text-gray-600 font-medium">
          <li>
            <Link
              to="/home"
              className={`${
                location.pathname === "/home" ? "text-blue-600" : "hover:text-blue-600"
              }`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/my-bookings"
              className={`${
                location.pathname === "/my-bookings"
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }`}
            >
              My Bookings
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className={`${
                location.pathname === "/profile"
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }`}
            >
              Profile
            </Link>
          </li>

          <li>
            <button 
            
              onClick={handleAdminClick}
              className={`${
                location.pathname === "/admin"
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }`}
            >
              Admin
            </button>
          </li>
        </ul>

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-12 h-12 rounded-full cursor-pointer"
        />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </nav>
  );
};

export default Navbar;
