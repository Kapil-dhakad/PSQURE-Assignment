import React, { useState } from "react";
import { Eye, EyeOff, Mail, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { TourContext } from "../context/TourBookingContext";


const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {setLoggedInUser}=useContext(TourContext)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true, 
        }
      );

      
      toast.success(res.data.message || "Login successful!");
      console.log(res.data.data)
      setLoggedInUser(res?.data?.data)
      localStorage.setItem("userData",JSON.stringify(res?.data?.data))
      setTimeout(() => navigate("/home"), 700); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col justify-between w-full max-w-md p-9 text-center bg-white rounded-3xl shadow-xl min-h-[620px]">
        <div className="flex justify-center mb-7">
          <div className="p-4 text-white bg-blue-600 rounded-full shadow-md">
            <Plane size={29} />
          </div>
        </div>

        <div className="mb-9">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Log In to Journey Booking Platform
          </h2>
          <p className="text-sm text-gray-500">
            Welcome back! Please enter your credentials to continue.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 mb-9 text-left">
          <div>
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-5 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Mail className="absolute text-gray-400 right-3 top-3" size={18} />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-5 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {passwordVisible ? (
                <EyeOff
                  className="absolute text-gray-400 cursor-pointer right-3 top-3"
                  size={18}
                  onClick={() => setPasswordVisible(false)}
                />
              ) : (
                <Eye
                  className="absolute text-gray-400 cursor-pointer right-3 top-3"
                  size={18}
                  onClick={() => setPasswordVisible(true)}
                />
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Log In
          </button>
        </form>

        <p className="mt-7 text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="font-medium cursor-pointer text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default LoginPage;
