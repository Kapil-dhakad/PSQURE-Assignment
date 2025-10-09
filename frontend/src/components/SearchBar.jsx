import React from "react";
import { MapPin } from "lucide-react";
import "./SearchBar.css"; 

const SearchBar = () => {
  return (
    <div className="searchbar-container">
      <h2 className="searchbar-title">Find Your Next Journey</h2>

      <p className="searchbar-subtitle">
        Discover available trips and book your seats with ease.
      </p>

      <div className="searchbar-box">
        <div className="searchbar-field">
          <label className="searchbar-label">From</label>
          <div className="searchbar-input-wrapper">
            <input
              type="text"
              placeholder="Departure Location"
              className="searchbar-input"
            />
            <MapPin className="icon" />
          </div>
        </div>

        <div className="searchbar-field">
          <label className="searchbar-label">To</label>
          <div className="searchbar-input-wrapper">
            <input
              type="text"
              placeholder="Arrival Location"
              className="searchbar-input"
            />
            <MapPin className="icon" />
          </div>
        </div>

        <div className="searchbar-field">
          <label className="searchbar-label">Date</label>
          <div className="searchbar-input-wrapper">
            <input type="date" className="searchbar-input" />
          </div>
        </div>

        <div className="searchbar-button-wrapper">
          <button className="searchbar-button">Search Trips</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
