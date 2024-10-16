import React, { useRef, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux"; // Import useSelector
import "react-toastify/dist/ReactToastify.css";

function IDCard() {
  const navigate = useNavigate();
  const idCardRef = useRef(null);

  // Fetch user data from auth slice
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);

  // Set user data on mount and handle redirection if not available
  useEffect(() => {
    if (user) {
      setUserData(user); // Set entire user data
    } else {
      navigate("/"); // Redirect to login if no user data is found
    }
  }, [user, navigate]);

  const handleDownloadIDCard = async () => {
    if (idCardRef.current) {
      const canvas = await html2canvas(idCardRef.current);
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "id-card.png";
      link.click();
    } else {
      toast.error("Error: ID Card not available for download.");
    }
  };

  const handleBack = () => {
    navigate("/dashboard", { state: { userData } });
  };

  if (!userData) return null; // Prevent rendering if user data is not available

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="text-center">
          <button
            onClick={handleBack}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg mt-4 transition duration-200"
          >
            Back to verification
          </button>
          <button
            onClick={handleDownloadIDCard}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-200"
          >
            Download ID Card
          </button>
        </div>
        <div
          ref={idCardRef}
          className="mt-6 border border-gray-300 rounded-lg p-4 shadow-lg flex flex-col items-center relative" // Added relative for positioning QR code
        >
          <h2 className="text-lg font-bold mb-2">User ID Card</h2>

          {/* Key-Value pairs with alignment */}
          <div className="w-full flex  mb-1">
            <strong>First Name:</strong>
            <span className="ml-2">{userData.firstname}</span>
          </div>
          <div className="w-full flex  mb-1">
            <strong>Last Name:</strong>
            <span className="ml-2">{userData.lastname}</span>
          </div>
          <div className="w-full flex mb-1">
            <strong>License No:</strong>
            <span className="ml-2">{userData.license}</span>
          </div>

          {/* Position the QR Code in the bottom right corner */}
          <div className="absolute bottom-4 right-4">
            <QRCodeCanvas value={userData.email} size={80} />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default IDCard;
