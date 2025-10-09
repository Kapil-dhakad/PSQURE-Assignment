import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/LoginPage";
import Signup from "../pages/SignupPage";
import Home from "../pages/HomePage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingPage from "../components/BookingPage";
import CheckoutPage from "../pages/CheckoutPage";
import BookingConfirmation from "../pages/BookingConfirmation";
import ViewTicket from "../pages/ViewTicket";
import AdminDashboard from "../components/admin/AdminDashboard";
import MyBookings from "../pages/MyBookings";
import ProfilePage from "../pages/ProfilePage";
import Profile from '../pages/Profile'

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <div className="w-[1440px] mx-auto">
            <Navbar />
            <Home />
            <Footer />
          </div>
        }
      />

      <Route
        path="/"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <Login />
          </div>
        }
      />
      <Route
        path="/signup"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <Signup />
          </div>
        }
      />

      <Route path="/booking" element={<BookingPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/confirmation" element={<BookingConfirmation />} />
      <Route path="/viewticket" element={<ViewTicket />} />

      <Route
        path="/my-bookings"
        element={
          <>
            <Navbar />
            <MyBookings />
            <Footer />
          </>
        }
      />

      <Route
        path="/admin"
        element={
          <>
            <Navbar />
            <div className="w-[1440px] mx-auto py-8">
              <AdminDashboard />
            </div>
          </>
        }
      />

      <Route
        path="/profile"
        element={
          <>
            <Navbar />
            <div className="w-[1440px] mx-auto py-8">
              <Profile />
            </div>
            <Footer />
          </>
        }
      />
      <Route path="/profile/manage" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}