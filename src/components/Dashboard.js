import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./NavBar";

function Dashboard() {
  const { state } = useLocation();
  const { userData } = state || {};
  const { user } = useSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { userData } });
  };

  if (!userData) {
    navigate("/");
    return null;
  }
  // const handleCheck = () => {
  //   console.log(email, userData);
  // };

  return (
    <>
      {/* <button onClick={handleCheck}>hello</button> */}
      {/* <Navbar /> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] h-[550px] flex flex-col relative">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold">
              Hi, {user.firstname || "User"}! Welcome to Fast Pass
            </span>
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
          </div>

          {isProfileOpen && (
            <div className="absolute right-6 top-16 w-48 bg-white shadow-md rounded-lg py-2 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => handleNavigate("/")}
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

          {/* Main Content */}
          <div className="text-left flex-grow flex flex-col items-start justify-start">
            <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Instructions
                </h3>
              </h3>

              <p className="text-gray-600 mb-2">
                1. Don't have an ID card? Download it from the profile section.
              </p>
              <p className="text-gray-600 mb-2">
                2. Validate your identity to access the virtual session.
              </p>
              <p className="text-gray-600 mb-2">
                3. Please ensure that your ID card is clearly visible in front
                of the webcam.
              </p>
              <p className="text-gray-600 mb-4">
                4. Ensure good lighting and that the entire ID card fits within
                the camera frame.
              </p>
              <p className="text-gray-600 mb-4 font-bold italic">
                Click the button below to start the scanning process.
              </p>
              <button
                onClick={() => handleNavigate(`/qr-scanner/${userData}`)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition duration-200"
              >
                VERIFY YOUR IDENTITY
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
