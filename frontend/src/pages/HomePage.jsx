import React, { useContext, useEffect } from "react";
import SearchBar from "../components/Searchbar";
import TripCard from "../components/TripCard";
import "./Home.css"; 
import { TourContext } from "../context/TourBookingContext";



const Home = () => {
  const { tripList, fetchTrips, loading } = useContext(TourContext);
    
  useEffect(() => {
  console.log(tripList)
  }, [])
  

  if (loading) return <p>Loading trips...</p>;
  if (!tripList || tripList.length === 0) return <p>No trips available yet.</p>;


  return (
    <div>
      <SearchBar />

      <section className="home-section">
        <h2 className="home-title">Available Trips</h2>
        <p className="home-subtitle">
          Choose from our carefully selected destinations and enjoy a comfortable journey.
        </p>
        <div className="trips-container">
          {tripList.map((trip) => (
            <TripCard key={trip._id}  trip={trip} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
