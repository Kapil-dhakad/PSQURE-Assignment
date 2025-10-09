import React, { useEffect, useState } from "react";
import { Plane, Train, Calendar, Clock, MapPin } from "lucide-react";
import axios from "axios";

const MyBookings = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserBooking = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "http://localhost:3000/api/v1/bookings/bookings",
        {
          withCredentials: true, 
        }
      );

      console.log("API Response:", response?.data);

      if (response?.data?.success && response?.data?.data) {
        setUpcomingBookings(response.data.data.upcomingBookings || []);
        setPastBookings(response.data.data.pastBookings || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBooking();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] px-[120px] py-[48px]">
        <p className="text-center text-gray-600">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] px-[120px] py-[48px]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-[120px] py-[48px]">
      <section className="mb-[64px]">
        <h2 className="text-[20px] font-semibold text-[#111827] mb-[24px]">
          Upcoming Bookings
        </h2>

        {upcomingBookings.length === 0 ? (
          <p className="text-gray-500">No upcoming bookings found.</p>
        ) : (
          <div className="flex flex-wrap gap-[24px]">
            {upcomingBookings.map((b) => (
              <div
                key={b._id}
                className="relative bg-white border border-gray-100 rounded-[12px] shadow-sm p-[24px] flex flex-col"
                style={{
                  width: "540px",
                  height: "334px",
                }}
              >
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-[0_4px_10px_rgba(16,24,40,0.04)]">
                  <Plane size={16} className="text-[#2563EB]" />
                </div>

                <div className="mb-[8px]">
                  <p className="text-sm text-gray-500">
                    Booking ID:{" "}
                    <span className="font-medium text-gray-700">
                      {b._id.slice(-8)}
                    </span>
                  </p>
                </div>

                <p className="text-xs bg-blue-50 text-[#2563EB] px-3 py-1 rounded-full w-fit mb-[16px]">
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </p>

                <div className="flex items-center text-gray-800 font-medium mb-[8px]">
                  <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-[16px]">
                    {capitalize(b.trip.from)} → {capitalize(b.trip.to)}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-[4px] flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(b.trip.date)}</span>
                </div>
                <div className="text-sm text-gray-600 mb-[4px] flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{b.trip.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-[12px]">
                  Seats:{" "}
                  <span className="font-medium text-gray-700">
                    {b.seats.join(", ")}
                  </span>
                </p>

                <p className="text-sm mb-[12px]">
                  Payment:{" "}
                  <span
                    className={`font-medium ${
                      b.paymentInfo?.paid ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {b.paymentInfo.paid ? "Unpaid" : "Paid"}
                  </span>
                </p>

                <div className="mt-auto">
                  <div
                    className="w-full h-[64px] rounded-[8px] flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(235,245,255,1) 0%, rgba(214,231,255,1) 100%)",
                      boxShadow: "inset 0 -6px 14px rgba(99,102,241,0.03)",
                    }}
                  >
                    <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center">
                      <Plane size={28} className="text-[#2563EB]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[#111827] mb-[24px]">
          Past Bookings
        </h2>

        {pastBookings.length === 0 ? (
          <p className="text-gray-500">No past bookings found.</p>
        ) : (
          <div className="flex flex-wrap gap-[24px]">
            {pastBookings.map((b) => (
              <div
                key={b._id}
                className="relative bg-white border border-gray-100 rounded-[12px] shadow-sm p-[24px] flex flex-col"
                style={{
                  width: "352px",
                  height: "318px",
                }}
              >
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-[0_4px_10px_rgba(16,24,40,0.04)]">
                  <Train size={16} className="text-[#16A34A]" />
                </div>

                <div className="mb-[8px]">
                  <p className="text-sm text-gray-500">
                    Booking ID:{" "}
                    <span className="font-medium text-gray-700">
                      {b._id.slice(-8)}
                    </span>
                  </p>
                </div>

                <p className="text-xs bg-green-50 text-[#16A34A] px-3 py-1 rounded-full w-fit mb-[16px]">
                  Completed
                </p>

                <div className="flex items-center text-gray-800 font-medium mb-[8px]">
                  <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                  <span>
                    {capitalize(b.trip.from)} → {capitalize(b.trip.to)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-[4px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(b.trip.date)}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-[4px]">
                  <Clock className="w-4 h-4 mr-2" />
                  {b.trip.time}
                </div>
                <p className="text-sm text-gray-600 mb-[12px]">
                  Seats:{" "}
                  <span className="font-medium text-gray-700">
                    {b.seats.join(", ")}
                  </span>
                </p>

                <div className="mt-auto">
                  <div
                    className="w-full h-[56px] rounded-[8px] flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(240,253,244,1) 0%, rgba(221,247,229,1) 100%)",
                      boxShadow: "inset 0 -6px 14px rgba(16,185,129,0.02)",
                    }}
                  >
                    <Train size={24} className="text-[#16A34A]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyBookings;