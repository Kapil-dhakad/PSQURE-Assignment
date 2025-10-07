import React from "react";
import { Users, Clock, Calendar as Cal } from "lucide-react";

const TripCard = ({ trip }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-80 hover:shadow-xl transition-shadow">
      <div className="relative">
        <img src={trip.image} alt={trip.route} className="w-full h-44 object-cover" />
        {trip.popular && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Popular
          </span>
        )}
        {trip.discount && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {trip.discount}% OFF
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-yellow-500 text-sm mb-1">
          {"⭐".repeat(trip.rating)}{" "}
          <span className="text-gray-500">({trip.reviews} reviews)</span>
        </p>
        <h3 className="font-semibold text-lg mb-2">{trip.route}</h3>
        <div className="text-gray-600 text-sm space-y-1 mb-3">
          <p className="flex items-center">
            <Clock className="w-4 h-4 mr-2" /> {trip.duration}
          </p>
          <p className="flex items-center">
            <Users className="w-4 h-4 mr-2" /> {trip.seats} seats available
          </p>
          <p className="flex items-center">
            <Cal className="w-4 h-4 mr-2" /> {trip.date}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">${trip.price}</p>
            {trip.oldPrice && (
              <p className="text-gray-400 text-sm line-through">${trip.oldPrice}</p>
            )}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
