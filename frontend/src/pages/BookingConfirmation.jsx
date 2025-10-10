import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
    const canvasRef = useRef(null);
  const {
    trip = {},
    selectedSeats = ["E5", "E6"],
    totalFare = 96,
  } = location.state || {};
  const bookingId = trip.bookingId || "#TXN789456";
  console.log(trip)

   const formattedDate = trip.date
    ? new Date(trip.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "October 26, 2024";

    useEffect(() => {
      if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const size = 140;
      const qrSize = 33; 
      const cellSize = size / qrSize;
      const moduleSize = cellSize * 0.9; 
      const gap = (cellSize - moduleSize) / 2;

        ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, size, size);

       ctx.fillStyle = '#000000';

      const hash = bookingId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

       const drawModule = (row, col, radius = 1) => {
        const x = col * cellSize + gap;
        const y = row * cellSize + gap;
        ctx.beginPath();
        ctx.roundRect(x, y, moduleSize, moduleSize, radius);
        ctx.fill();
      };


         const drawFinderPattern = (startRow, startCol) => {
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 7; j++) {
            if (i === 0 || i === 6 || j === 0 || j === 6) {
              drawModule(startRow + i, startCol + j, 1.5);
            }
          }
        }

        for (let i = 2; i <= 4; i++) {
          for (let j = 2; j <= 4; j++) {
            drawModule(startRow + i, startCol + j, 1.5);
          }
        }
      };

        drawFinderPattern(0, 0); 
      drawFinderPattern(0, qrSize - 7); 
      drawFinderPattern(qrSize - 7, 0); 

         const alignPos = qrSize - 11;
      for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
          if ((Math.abs(i) === 2 || Math.abs(j) === 2) || (i === 0 && j === 0)) {
            drawModule(alignPos + i, alignPos + j, 1);
          }
        }
      }

       for (let i = 8; i < qrSize - 8; i++) {
        if (i % 2 === 0) {
          drawModule(6, i, 1);
          drawModule(i, 6, 1);
        }
      }

        for (let row = 0; row < qrSize; row++) {
        for (let col = 0; col < qrSize; col++) {
             const isFinderArea = 
            (row < 9 && col < 9) || 
            (row < 9 && col >= qrSize - 8) || 
            (row >= qrSize - 8 && col < 9);

              const isTimingArea = (row === 6 && col >= 8 && col < qrSize - 8) || 
                               (col === 6 && row >= 8 && row < qrSize - 8);
                                const isAlignmentArea = (row >= alignPos - 2 && row <= alignPos + 2 && 
                                  col >= alignPos - 2 && col <= alignPos + 2);
          if (!isFinderArea && !isTimingArea && !isAlignmentArea) {
    const seed = ((row * 31 + col * 17 + hash) * 2654435761) >>> 0;
            const shouldFill = (seed % 10) < 5; 
            
            if (shouldFill) {
              drawModule(row, col, 0.8);
            }
          }
        }
      }
  
    
}}, [bookingId])
  const downloadTicket = () => {
    toast.success("Ticket downloaded successfully!");
  };
    

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Navbar />

      <main className="w-full flex flex-col items-center py-10">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="#16A34A"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-[22px] font-semibold text-gray-900">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Your trip is successfully booked. Enjoy your journey!
          </p>
        </div>

        <div
          className="relative bg-white rounded-[16px] border border-gray-200 shadow-[0_8px_24px_rgba(16,24,40,0.06)] overflow-hidden"
          style={{ width: "608px", minHeight: "720px" }}
        >
          <div
            className="absolute flex items-center justify-between px-6"
            style={{
              width: "606px",
              height: "96px",
              top: "1px",
              left: "1px",
              background: "linear-gradient(90deg,#326FF6 0%,#245BEA 100%)",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              color: "#fff",
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>Flight Ticket</div>
              <div style={{ fontSize: 14, opacity: 0.95, marginTop: 6 }}>
                Booking ID: {bookingId}
              </div>
            </div>
            <div style={{ transform: "rotate(-20deg)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M2 12l20-7-7 20-3-8-10-5z" fill="#fff" />
              </svg>
            </div>
          </div>

          <div className="px-8 pt-[120px] pb-12 h-full flex flex-col overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[34px] leading-tight font-extrabold text-gray-900">
                  {trip.from }
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {trip.fromCity}
                </p>
                <p className="text-sm font-medium text-gray-900 mt-3">
                  {trip.departureTime || "09:30 AM"}
                </p>
              </div>

              <div className="flex-1 px-8 relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dotted border-gray-300" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-white rounded-full p-1 shadow-sm">
                    <div className="bg-[#2563EB] rounded-full p-[6px] flex items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M2 12l20-7-7 20-3-8-10-5z" fill="#fff" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full text-center mt-3">
                    <p className="text-xs text-gray-400">
                      {trip.duration || "2h 30min"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <h3 className="text-[34px] leading-tight font-extrabold text-gray-900">
                  {trip.to || "SFO"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {trip.toCity}
                </p>
                <p className="text-sm font-medium text-gray-900 mt-3">
                  {trip.arrivalTime || "12:00 PM"}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="flex-1 bg-[#F7F8FA] rounded-lg p-5 border border-transparent shadow-sm">
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-[16px] font-semibold text-gray-900 mt-2">
                  {trip.date || "October 26, 2024"}
                </p>
              </div>
              <div className="flex-1 bg-[#F7F8FA] rounded-lg p-5 border border-transparent shadow-sm">
                <p className="text-sm text-gray-500">Seats</p>
                <p className="text-[16px] font-semibold text-gray-900 mt-2">
                  {(selectedSeats || []).join(", ")}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-6" />

            <div className="flex items-center justify-between mt-6">
              <div className="text-gray-900 font-semibold text-[16px]">
                Total Fare Paid
              </div>
              <div className="text-green-600 font-extrabold text-[26px]">
                ${Number(totalFare).toFixed(2)}
              </div>
            </div>

            <div className="flex flex-col items-center mt-8">
              <div className="bg-white rounded-[16px] p-4 shadow-md border border-gray-100">
                 <canvas
                  ref={canvasRef}
                  width="140"
                  height="140"
                  className="w-[140px] h-[140px] rounded-md"
                />
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Scan this QR code at the boarding gate
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <button
                onClick={downloadTicket}
                className="flex items-center gap-3 bg-[#2563EB] hover:bg-[#1E4ED8] text-white font-medium px-6 py-3 rounded-[12px] shadow"
                style={{ minWidth: 240 }}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                      stroke="#fff"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 10l5 5 5-5"
                      stroke="#fff"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15V3"
                      stroke="#fff"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-lg">Download Ticket</span>
              </button>

              <button
                onClick={() =>
                  navigate(`/viewticket`,  {
                    state: {
                      trip,
                      passenger: "Saurabh Gupta",
                      price: totalFare,
                    },
                  })
                }
                className="flex items-center gap-3 border border-[#2563EB] text-[#2563EB] font-medium px-6 py-3 rounded-[12px] bg-white hover:bg-blue-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#2563EB"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M12 8v4l2 2"
                    stroke="#2563EB"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-lg">View Ticket</span>
              </button>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default BookingConfirmation;
