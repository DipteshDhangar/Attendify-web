import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_URL || "http://localhost:8000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to manage profile dropdown

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Error: Please enter email and password.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/FindUserDetailsApp`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setUserData(response.data.user);
        setIsLoggedIn(true);
        toast.success(`Success: Logged in as ${response.data.user.email}`);
      } else {
        toast.error(`Error: ${response.data.message || "Login failed"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error: Login failed.");
    }
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const navigateToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Main Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] h-[500px] flex flex-col relative">
        {/* Top Section with Hi User and Profile Icon */}
        {isLoggedIn && (
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold">
              Hi, {userData?.firstname || "User"}! Welcome to Turnstile
            </span>
            {isLoggedIn && (
              <button
                onClick={toggleProfileMenu}
                className="bg-gray-200 p-2 rounded-full focus:outline-none"
              >
                <img
                  src={userData?.picture || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </button>
            )}
          </div>
        )}

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute right-6 top-16 w-48 bg-white shadow-md rounded-lg py-2 z-50">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Help
            </a>
            <button
              onClick={() => handleNavigate("/id-card")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Download Your ID
            </button>
          </div>
        )}

        {/* Login or Main Content */}
        <div
          className={`flex-grow flex flex-col ${
            !isLoggedIn
              ? "items-center justify-center"
              : "items-start justify-start"
          }`}
        >
          {!isLoggedIn ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Login
              </h2>
              <form
                onSubmit={handleLogin}
                className="space-y-4 w-full max-w-sm"
              >
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Login
                </button>
              </form>
              {/* Admin Link */}
              <p className="text-center mt-4">
                <button
                  onClick={navigateToAdmin}
                  className="text-blue-500 hover:underline"
                >
                  Login as Admin
                </button>
              </p>
            </>
          ) : (
            <div className="text-left">
              <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Instructions
                </h3>
                <p className="text-gray-600 mb-2">
                  Validate your identity to access virtual session.
                </p>
                <p className="text-gray-600 mb-2">
                  Please ensure that your ID card is clearly visible in front of
                  the webcam.
                </p>
                <p className="text-gray-600 mb-4">
                  Ensure good lighting and that the entire ID card fits within
                  the camera frame.
                </p>
                <p className="text-gray-600 mb-4">
                  Click the button below to start the scanning process.
                </p>
                <button
                  onClick={() => handleNavigate("/qr-scanner")}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-200"
                >
                  VERIFY YOUR IDENTITY
                </button>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
