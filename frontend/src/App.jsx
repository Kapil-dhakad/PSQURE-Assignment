import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-[1440px] mx-auto bg-[#f5f6fa]">
              <Navbar />
              <HomePage />
            </div>
           
          }
        />
        <Route
          path="/login"
          element={
            <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa]">
              <LoginPage />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa]">
              <SignupPage />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
