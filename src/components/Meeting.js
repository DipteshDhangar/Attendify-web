import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Meeting = () => {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState(null); // Initially set to null to differentiate between "loading" and "not found"
  const [notification, setNotification] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const API_URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/getClassList/${courseId}`
        );
        setCourseName(response.data.name); // Set course name
      } catch (error) {
        console.error("Error fetching course details:", error);
        setCourseName("Course not found");
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleEnterCall = () => {
    setButtonClicked(!buttonClicked);
    setNotification("Entering the Zoom call...");

    window.open(
      "https://us05web.zoom.us/j/82524203328?pwd=A3dOCNtFhVNTPLPwlEFyLXjALTvBg1.1",
      "_blank"
    );
  };

  return (
    <div className="flex items-center justify-center p-6 font-sans bg-gray-100 min-h-screen">
      <div
        className="bg-white shadow-md rounded-lg p-6"
        style={{ width: "600px", height: buttonClicked ? "300px" : "250px" }}
      >
        {/* Show "Loading..." until courseName is loaded */}
        <h1 className="text-3xl font-semibold text-center mb-4">
          {courseName !== null
            ? `${courseName} - Virtual Session`
            : "Loading..."}
        </h1>
        <p className="text-lg mb-6 text-center text-green-800 font-bold pt-4">
          Your ID card has been verified.
        </p>

        {/* Show button only if the course name is loaded */}
        {courseName && courseName !== "Course not found" && (
          <button
            onClick={handleEnterCall}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition duration-200"
          >
            Click Here To Join Your Virtual Session
          </button>
        )}

        {/* Show "Course not found" or other error messages */}
        {courseName === "Course not found" && (
          <p className="text-red-500 text-center font-semibold">{courseName}</p>
        )}

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
