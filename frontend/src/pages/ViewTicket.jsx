import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Clock, DoorOpen, User } from "lucide-react";
import Navbar from "../components/Navbar";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";

export default function ViewTicket() {
  
  const location = useLocation();
  const { trip, passenger, price } = location.state || {};

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : null;
  });
  const passengerName = passenger?.fullName || "Passenger";

   const handleDownload = async () => {
    const ticketElement = document.getElementById("ticket-wrapper");
    if (!ticketElement) return;

     try {
      const canvas = await html2canvas(ticketElement, { scale: 2 });
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `ticket_${passengerName}.png`;
      link.click();
        toast.success("Ticket downloaded successfully!");
    } catch (err) {
      toast.error("Download failed. Try again!");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white px-10 py-8 overflow-x-hidden">
      {/* <ToastContainer position="" /> */}
      <Navbar />

      <div className="mt-[60px]" />

      <div className="flex flex-col items-center">
        <div
          className="flex justify-between items-start mb-8"
          style={{ width: "1231px" }}
        >
          <div>
            <h1 className="text-[24px] font-semibold text-gray-900">
            {trip?.airline || "indgo A380 Airbus"}
            </h1>
            <p className="text-gray-600 text-sm mt-2 flex items-center">
              <span className="mr-2">📍</span>
             {trip?.fromAddress ||
                "Mumbai local. İnönü Cad. No:8, area 45784"}
            </p>
          </div>

          <div className="text-right">
            <div className="text-[26px] font-extrabold text-green-800 leading-none">
              ${price || "899"}
            </div>
            <button
            onClick={handleDownload}
              className="mt-4 inline-block rounded-md text-white font-medium"
              style={{
                background: "#2563EB",
                padding: "10px 18px",
                boxShadow: "0 3px 8px rgba(37,99,235,0.18)",
              }}
            >
              Download
            </button>
          </div>
        </div>

          <div id="ticket-wrapper">
        <div
          className="flex items-stretch border border-gray-200 bg-white overflow-hidden"
          style={{
            width: "1231px",
            height: "309px",
            borderRadius: "16px",
            gap: "16px",
          }}
        >
          <div
            className="flex flex-col justify-between"
            style={{
              width: "246px",
              height: "309px",
              padding: "24px",
              background: "#E8EEFF",
              borderTopLeftRadius: "16px",
              borderBottomLeftRadius: "16px",
            }}
          >
            <div>
              <div className="text-[30px] font-semibold text-gray-900">{trip?.time || "11:30 AM"}</div>
              <div className="text-sm text-gray-600 mt-1"> {trip?.from || "Delhi "}</div>
            </div>

            <div className="flex flex-col items-center">
              <div style={{ height: 44, width: 2, background: "#E6E9EE" }} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="my-2"
              >
                <path
                  d="M2 18l7-6-7-6M22 18l-7-6 7-6"
                  stroke="#BFC7D6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div style={{ height: 44, width: 2, background: "#E6E9EE" }} />
            </div>

            <div>
              <div className="text-[30px] font-semibold text-gray-900"> {trip?.arrivalTime || "2:00 PM"}</div>
              <div className="text-sm text-gray-600 mt-1"> {trip?.to || "Mumbai"}</div>
            </div>
          </div>

          <div
            style={{
              width: "610px",
              height: "309px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#C5D4FF",
                padding: "10px 16px",
                borderRadius: "12px",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img
                 src={
                      passenger?.avatar ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                  alt="passenger"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    objectFit: "cover",
                  }}
                />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#0F172A" }}>
                     {userData?.name || "kapil"}
                  </div>
                  <div style={{ fontSize: 13, color: "#334155", marginTop: 2 }}>
                     Boarding Pass N’{trip?.boardingPass || "145"}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 13, color: "#0F172A", fontWeight: 600 }}>
                {trip?.classType || "Business Class"}
              </div>
            </div>

            <div style={{ display: "flex", gap: 20, alignItems: "center", marginTop: 12 }}>
              {[
                { icon: <Calendar size={16} />, label: "Date", value: "26 Oct 2024" },
                { icon: <Clock size={16} />, label: "Flight time", value: "12:00" },
                { icon: <DoorOpen size={16} />, label: "Gate", value: "A12" },
                { icon: <User size={16} />, label: "Seat", value: "128" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: "#EAF0FF",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-600">{item.label}</div>
                    <div className="text-sm font-semibold text-gray-800">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#072226" }}>{trip?.airlineCode || "INK"}</div>
                <div className="text-sm text-gray-600">   {trip?.ticketNumber || "ABC12345"}</div>
              </div>

              <img
                alt="barcode"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x48&data=${
                    trip?.ticketNumber || "INK12345"
                  }`}
                style={{
                  width: 240,
                  height: 46,
                  objectFit: "cover",
                  filter: "grayscale(100%)",
                }}
              />
            </div>
          </div>

          <div
            className="relative"
            style={{
              width: "246px",
              height: "309px",
              padding: "24px",
              borderLeft: "1px solid rgba(229,231,235,1)",
              background: "#ffffff",
              borderTopRightRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          >
            <svg
              width="246"
              height="309"
              viewBox="0 0 246 309"
              className="absolute left-0 top-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 240 C80 160, 170 120, 210 70"
                stroke="#2563EB"
                strokeWidth="3"
                strokeDasharray="6 6"
                fill="none"
              />
            </svg>

            <div
              style={{
                position: "absolute",
                left: 18,
                bottom: 28,
                background: "#fff",
                padding: "6px 8px",
                borderRadius: 8,
                boxShadow: "0 6px 18px rgba(8,20,48,0.08)",
                display: "flex",
                gap: 8,
                alignItems: "center",
                fontSize: 12,
              }}
            >
              <img
                alt="thumb"
                 src={
                    passenger?.avatar || "https://picsum.photos/48/36?random=1"
                  }
                style={{
                  width: 48,
                  height: 36,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
              <div style={{ color: "#0F172A", fontWeight: 600 }}>{passenger?.fullName || "kapil "}</div>
            </div>

            <div
              style={{
                position: "absolute",
                right: 18,
                top: 26,
                background: "#fff",
                padding: "6px 8px",
                borderRadius: 8,
                boxShadow: "0 6px 18px rgba(8,20,48,0.08)",
                display: "flex",
                gap: 8,
                alignItems: "center",
                fontSize: 12,
              }}
            >
              <img
                alt="thumb"
               src={
                    passenger?.avatar || "https://picsum.photos/48/36?random=2"
                  }
                style={{
                  width: 48,
                  height: 36,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
              <div style={{ color: "#0F172A", fontWeight: 600 }}>{passenger?.fullName || "kapil "}</div>
            </div>
          </div>
        </div>
        </div>

        <div className="mt-10" style={{ width: "1231px" }}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Terms and Conditions
          </h2>
          <h3 className="text-md font-semibold text-gray-800 mb-2">Payments</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-3">
            <li>
              If you are purchasing your ticket using a debit or credit card via the
              Website, we will process these payments via the automated secure common
              payment gateway which will be subject to fraud screening purposes.
            </li>
            <li>
              If you do not supply the correct card billing address and/or cardholder
              information, your booking will not be confirmed and the overall cost may
              increase. We reserve the right to cancel your booking if payment is
              declined for any reason or if you have supplied incorrect card information.
              If we become aware of, or are notified of, any fraud or illegal activity
              associated with the payment for the booking, the booking will be cancelled
              and you will be liable for all costs and expenses arising from such
              cancellation, etc.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
