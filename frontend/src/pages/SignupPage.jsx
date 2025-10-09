import React, { useState, useContext } from "react";
import { Eye, EyeOff, Mail, Plane, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // ToastContainer ab App.js me hoga
import { TourContext } from "../context/TourBookingContext";

const SignupPage = () => {
  const [Password, setPassword] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(TourContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "name":
        setErrors({ ...errors, name: value ? "" : "Name is required" });
        break;
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value) ? "" : "Enter a valid email",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value)
            ? ""
            : "Password must be 8+ chars, include a number and special char",
        });
        break;
      case "confirmPassword":
        setErrors({
          ...errors,
          confirmPassword:
            value === formData.password ? "" : "Passwords do not match",
        });
        break;
      default:
        break;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    toast.dismiss(); // Purane toasts remove kar do

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields correctly!");
      return;
    }

    if (errors.email || errors.password || errors.confirmPassword) {
      toast.error("Please fix the errors in the form!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Signup successful!");
      setLoggedInUser(res?.data?.data);
      localStorage.setItem("userData", JSON.stringify(res?.data?.data));
      setTimeout(() => navigate("/home"), 500);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col justify-between w-full max-w-md p-9 text-center bg-white rounded-3xl shadow-xl min-h-[700px]">
        <div className="flex justify-center mb-7">
          <div className="p-4 text-white bg-blue-600 rounded-full shadow-md">
            <Plane size={28} />
          </div>
        </div>

        <div className="mb-9">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-500">
            Join us today and get started with your journey booking.
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-5 mb-9 text-left"
        >
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Full Name</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-5 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <User className="absolute text-gray-400 right-3 top-3" size={18} />
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className="w-full px-5 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Mail className="absolute text-gray-400 right-3 top-3" size={18} />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                type={Password ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose a strong password"
                className="w-full px-5 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {Password ? (
                <EyeOff
                  className="absolute text-gray-400 cursor-pointer right-3 top-3"
                  size={18}
                  onClick={() => setPassword(false)}
                />
              ) : (
                <Eye
                  className="absolute text-gray-400 cursor-pointer right-3 top-3"
                  size={18}
                  onClick={() => setPassword(true)}
                />
              )}
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={ConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-5 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {ConfirmPassword ? (
                <EyeOff
                  className="absolute text-gray-400 cursor-pointer right-3 top-3"
                  size={18}
                  onClick={() => setConfirmPassword(false)}
                />
              ) : (
                <Eye
                  className="absolute text-gray-400 cursor-pointer right-3 top-3"
                  size={18}
                  onClick={() => setConfirmPassword(true)}
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 cursor-pointer font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-7 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="font-medium cursor-pointer text-blue-600 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
