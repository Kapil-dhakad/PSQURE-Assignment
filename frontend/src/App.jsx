import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Approutes";
import BookingConfirmation from "./pages/BookingConfirmation";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#f5f6fa]">
        <AppRoutes />
       
      </div>
    </BrowserRouter>
  );
}