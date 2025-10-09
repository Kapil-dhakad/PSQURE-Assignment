import React, { useContext, useMemo } from "react";
import { Users, Clock, Calendar as Cal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TourContext } from "../context/TourBookingContext";
import "./TripCard.css";

const TripCard = ({ trip}) => {
  
  const navigate = useNavigate();

const handleBooking = () => {
  console.log("Trip Data:", trip);
  // navigate("/booking", { state: { tripId: trip._id, image: tripImage } }); 
   navigate("/booking", { state: { trip } }); 
};


  const { tripImage, rating, reviews } = useMemo(() => {
    const randomImage = `https://picsum.photos/400/300?random=${Math.floor(
      Math.random() * 1000
    )}`;

    const tripImage =
      trip.image && trip.image.trim() !== "" ? trip.image : randomImage;

    const rate = trip.rating || Math.floor(Math.random() * 5) + 1;
    const rev = trip.reviews || Math.floor(Math.random() * 500) + 1;

    return { tripImage, rating: rate, reviews: rev };
  }, [trip._id]);

  return (
    <div className="trip-card">
      <div className="trip-card-image">
        <img src={tripImage} alt={trip.route} />
        {trip.popular && (
          <span className="badge badge-popular">Popular</span>
        )}
        {trip.discount && (
          <span className="badge badge-discount">{trip.discount}% OFF</span>
        )}
      </div>

      <div className="trip-card-content">
        <div>
          <div className="trip-card-rating">
            <span className="stars">{"⭐".repeat(rating)}</span>
            <span className="reviews">({reviews} reviews)</span>
          </div>

          <h3 className="trip-card-title">
            {trip.from} → {trip.to}
          </h3>

          <div className="trip-card-details">
            <p>
              <Clock className="icon" /> {trip.duration || trip.time}
            </p>
            <p>
              <Users className="icon" /> {trip.totalSeats || trip.seats} seats
              available
            </p>
            <p>
              <Cal className="icon" /> {trip.date}
            </p>
          </div>
        </div>

        <div className="trip-card-footer">
          <div>
            <p className="price">${trip.price}</p>
            {trip.oldPrice && (
              <p className="old-price">${trip.oldPrice}</p>
            )}
          </div>

          <button onClick={handleBooking} className="book-btn">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
