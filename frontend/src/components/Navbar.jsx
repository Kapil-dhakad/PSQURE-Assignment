import React from "react";

const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center bg-white shadow-sm"
      style={{
        width: "1440px",
        height: "112px",
        paddingTop: "40px",
        paddingRight: "28px",
        paddingBottom: "40px",
        paddingLeft: "28px",
        margin: "0 auto", 
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 text-white rounded-full p-2 text-lg">✈️</div>
        <h1 className="text-2xl font-semibold text-gray-800">Argo</h1>
      </div>

      <ul className="flex space-x-10 text-gray-600 font-medium">
        <li className="text-blue-600 cursor-pointer">Home</li>
        <li className="cursor-pointer hover:text-blue-600">My Bookings</li>
        <li className="cursor-pointer hover:text-blue-600">Profile</li>
        <li className="cursor-pointer hover:text-blue-600">Admin</li>
      </ul>

      <img
        src="https://i.pravatar.cc/40"
        alt="profile"
        className="w-12 h-12 rounded-full cursor-pointer"
      />
    </nav>
  );
};

export default Navbar;
