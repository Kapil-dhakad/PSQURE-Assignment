import React from "react";
import { MapPin, Calendar } from "lucide-react";

const SearchBar = () => {
  return (
    <div
      className="bg-[#E8EEFF] flex flex-col items-center text-center"
      style={{
        width: "1440px",
        height: "450px", 
        paddingTop: "60px",
        paddingRight: "272px",
        paddingBottom: "60px",
        paddingLeft: "272px",
        margin: "0 auto",
        position: "relative",
      }}
    >
     
      <h2 className="text-5xl font-bold text-gray-900 mb-2">
        Find Your Next Journey
      </h2>

      <p className="text-gray-500 mb-8">
        Discover available trips and book your seats with ease.
      </p>

      <div
        className="flex items-center justify-between bg-white shadow-lg border border-gray-200 rounded-xl px-6 py-4"
        style={{
          width: "900px",
          height: "160px",
          gap: "20px",
          position: "relative",
          top: "20px",
        }}
      >
        <div className="flex flex-col justify-center text-left">
          <label className="text-xs text-gray-600 mb-2">From</label>
          <div className="flex items-center border rounded-lg px-4 py-2 w-48">
           
            <input
              type="text"
              placeholder="Departure Location"
              className="outline-none w-full text-gray-700 text-sm px-2 py-1"
            />
             <MapPin className="text-gray-400 w-5 h-5 mr-2" />
          </div>
        </div>

        <div className="flex flex-col justify-center text-left">
          <label className="text-xs text-gray-600 mb-2">To</label>
          <div className="flex items-center border rounded-lg px-4 py-2 w-48">
            
            <input
              type="text"
              placeholder="Arrival Location"
              className="outline-none w-full text-gray-700 text-sm px-2 py-1"
            />
            <MapPin className="text-gray-400 w-5 h-5 mr-2" />
          </div>
        </div>

        <div className="flex flex-col justify-center text-left">
          <label className="text-xs text-gray-600 mb-2">Date</label>
          <div className="flex items-center border rounded-lg px-4 py-2 w-36">
            <Calendar className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="date"
              className="outline-none w-full text-gray-700 text-sm px-2 py-1"
            />
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold">
          Search Trips
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
