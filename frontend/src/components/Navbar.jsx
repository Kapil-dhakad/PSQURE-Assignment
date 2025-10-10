import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TourContext } from "../context/TourBookingContext";
import { toast } from "react-toastify";
import axios from "axios";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);
     const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/auth/profile", {
          withCredentials: true
        });
        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleAdminClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      toast.error("Access only for Admin!");
    }
  };

  const handleLogout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/logout",
      {},
      { withCredentials: true }
    );
    
  
    if (response.status === 200) {
      toast.success("Logout successful!");
      setUser(null); 
      navigate("/"); 
    }
  } catch (error) {
    console.error("Logout error:", error);
    toast.error(error.response?.data?.message || "Logout failed!");
  }
};

 useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 

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

      <div className="relative" ref={dropdownRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-12 h-12 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            onMouseEnter={() => setShowDropdown(true)}
          />
          
          {showDropdown && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
