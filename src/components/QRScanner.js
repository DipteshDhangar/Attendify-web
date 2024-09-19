import React from "react";
import { QrReader } from "react-qr-reader";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_URL || "http://localhost:8000";

function QRScanner() {
  const { state } = useLocation();
  const { userData } = state || {};
  const navigate = useNavigate();

  const handleScan = async (result) => {
    if (result?.text) {
      const scannedEmail = result.text;

      if (scannedEmail === userData?.email) {
        // Notify successful verification
        toast.success("User Identity Verified");

        // Call API to mark attendance
        try {
          const response = await axios.post(
            `${API_URL}/api/MarkAttendance`,
            { email: scannedEmail },
            { headers: { "Content-Type": "application/json" } }
          );

          if (response.status === 200) {
            toast.success("Attendance marked successfully.");
            navigate("/meeting"); // Redirect to the meeting page
          } else {
            toast.error(
              `Failed to mark attendance: ${response.data.message || "Error"}`
            );
          }
        } catch (error) {
          console.error("Error marking attendance:", error);
          toast.error("Error: Failed to mark attendance.");
        }
      } else {
        // Notify failed verification
        toast.error("Identity Verification Failed");
      }
    }
  };

  const handleError = (error) => {
    toast.error("Error scanning QR Code.");
    console.error("QR Scan Error:", error);
  };

  if (!userData) {
    navigate("/"); // Redirect to login if no user data is found
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Scan your ID
        </h2>
        <QrReader
          onResult={handleScan}
          onError={handleError}
          style={{ width: "100%" }}
        />
        <ToastContainer />
      </div>
    </div>
  );
}

export default QRScanner;
