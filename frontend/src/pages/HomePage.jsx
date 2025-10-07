import React from "react";
import SearchBar from "../components/Searchbar";
import TripCard from "../components/TripCard";

const tripList = [
  {
    route: "Boston → New York",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
    duration: "4h 30min",
    seats: 12,
    date: "Dec 15, 2024",
    price: 89,
    oldPrice: 119,
    rating: 5,
    reviews: 124,
    popular: true,
    discount: 25,
  },
  {
    route: "Chicago → Los Angeles",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    duration: "5h 45min",
    seats: 8,
    date: "Dec 18, 2024",
    price: 156,
    oldPrice: 198,
    rating: 4,
    reviews: 89,
    discount: 21,
  },
  {
    route: "Atlanta → Miami",
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    duration: "2h 15min",
    seats: 15,
    date: "Dec 20, 2024",
    price: 129,
    rating: 5,
    reviews: 156,
  },
];

const HomePage = () => {
  return (
    <div>
      <SearchBar />
      <section className="bg-white text-center py-32">
        <h2 className="mb-3 text-3xl font-bold">Available Trips</h2>
        <p className="mb-9 text-gray-500">
          Choose from our carefully selected destinations and enjoy a comfortable journey.
        </p>
        <div className="flex flex-wrap justify-center gap-7">
          {tripList.map((trip, index) => (
            <TripCard key={index} trip={trip} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
