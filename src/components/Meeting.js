import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const Meeting = () => {
  const [notification, setNotification] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleEnterCall = () => {
    setButtonClicked(!buttonClicked);
    // Display a notification message
    setNotification("Entering the Zoom call...");

    // Open the Zoom meeting link in a new tab
    window.open(
      "https://us05web.zoom.us/j/82524203328?pwd=A3dOCNtFhVNTPLPwlEFyLXjALTvBg1.1",
      "_blank"
    );
  };

  return (
    <div className="flex items-center justify-center p-6 font-sans bg-gray-100 min-h-screen ">
      <div
        className="bg-white shadow-md rounded-lg p-6 "
        style={{ width: "600px", height: buttonClicked ? "300px" : "250px" }}
      >
        <h1 className="text-3xl font-semibold text-center  mb-4">
          Code of Ethics - Virtual Session
        </h1>
        <p className="text-lg mb-6 text-center text-green-800 font-bold pt-4">
          Your ID card has been verified.
        </p>
        <button
          onClick={handleEnterCall}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition duration-200"
        >
          Click Here To Join Your Virtual Session
        </button>
        {notification && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meeting;
