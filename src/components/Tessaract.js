import React, { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

const API_URL = process.env.REACT_APP_URL || "http://localhost:8000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userData, setUserData] = useState(null); // Store user data after login
  const [showWebcam, setShowWebcam] = useState(false); // Show/Hide webcam
  const [validationStatus, setValidationStatus] = useState(""); // Status of validation

  const webcamRef = useRef(null); // Webcam reference for capturing screenshot

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Error: Please enter email and password.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/FindUserDetailsApp`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Store user data and mark user as logged in
        setUserData(response.data.user);
        setIsLoggedIn(true);
        alert(`Success: Logged in as ${response.data.user.email}`);
      } else {
        alert(`Error: ${response.data.message || "Login failed"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error: Login failed.");
    }
  };

  // Show the webcam for user validation
  const handleValidate = () => {
    if (userData) {
      setShowWebcam(true);
    } else {
      alert("No user data found. Please log in first.");
    }
  };

  // Capture screenshot and validate user using OCR
  const captureAndValidate = async () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture webcam screenshot
    if (imageSrc) {
      setValidationStatus("Processing...");
      console.log("Captured Image Source:", imageSrc); // Log captured image for debugging

      // Display the captured image in the UI for verification
      const img = new Image();
      img.src = imageSrc;
      document.body.appendChild(img); // Temporarily append the image to the body

      // Perform OCR on the captured image using Tesseract.js
      Tesseract.recognize(
        imageSrc,
        "eng", // OCR language: English
        { logger: (m) => console.log(m) } // Log OCR progress
      )
        .then(({ data: { text } }) => {
          console.log("OCR Result:", text); // Log the OCR result

          // Extract email from the OCR text using a simple regex
          const emailMatch = text.match(
            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/
          );
          if (emailMatch) {
            const extractedEmail = emailMatch[0];
            console.log("Extracted Email:", extractedEmail);

            // Compare extracted email with stored user email
            if (extractedEmail === userData.email) {
              setValidationStatus("Validation Success: User is valid.");
            } else {
              setValidationStatus("Validation Failed: Emails do not match.");
            }
          } else {
            setValidationStatus("Validation Failed: No valid email found.");
          }
        })
        .catch((error) => {
          console.error("OCR Error:", error);
          setValidationStatus("Validation Failed: OCR processing error.");
        });
    } else {
      alert("Error: No screenshot captured.");
    }
  };
  // Stop the webcam
  const handleStop = () => {
    setShowWebcam(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Show login form if not logged in */}
        {!isLoggedIn ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
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
          </>
        ) : (
          // Show validation option if logged in
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Welcome, {userData?.firstname || "User"}!
            </h2>
            <button
              onClick={handleValidate}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Validate User
            </button>

            {/* Show webcam for ID validation */}
            {showWebcam && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Webcam for Validation
                </h3>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                {/* Capture and validate button */}
                <button
                  onClick={captureAndValidate}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-200"
                >
                  Capture and Validate
                </button>
                {/* Stop webcam */}
                <button
                  onClick={handleStop}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-200"
                >
                  Stop Webcam
                </button>
                {/* Show validation result */}
                {validationStatus && (
                  <p
                    className={`mt-4 text-lg font-semibold ${
                      validationStatus.includes("Success")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {validationStatus}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
