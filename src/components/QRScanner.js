import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const API_URL = process.env.REACT_APP_URL || "http://localhost:8000";

function QRScanner() {
  const { courseId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const scannerRef = useRef(null); // Keep scanner reference
  const [isScannerActive, setIsScannerActive] = useState(false); // Control scanner state

  // Initialize the scanner when clicking the button
  const startScanner = () => {
    if (scannerRef.current) {
      // If already initialized, do nothing
      return;
    }

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(handleScan, handleError);
    scannerRef.current = scanner; // Store reference for cleanup
    setIsScannerActive(true); // Set scanner active
  };

  // Cleanup: Stop the scanner when unmounting or deactivating
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((err) => console.error("Cleanup error", err));
      }
    };
  }, []);

  const handleScan = async (decodedText) => {
    if (!decodedText) return; // Ignore empty scans

    const confirmed = window.confirm(`Scanned email: ${decodedText}. Proceed?`);

    if (confirmed) {
      if (decodedText === user.email) {
        toast.success("User Identity Verified");

        try {
          const response = await axios.post(
            `${API_URL}/api/MarkAttendanceDummy`,
            { email: decodedText, course: courseId },
            { headers: { "Content-Type": "application/json" } }
          );

          if (response.status === 200) {
            toast.success("Attendance marked successfully.");
            navigate("/dashboard", { state: { userData: courseId } });
          } else {
            toast.error(`Failed: ${response.data.message || "Error"}`);
          }
        } catch (error) {
          console.error("Error marking attendance:", error);
          toast.error("Error: Failed to mark attendance.");
        }
      } else {
        toast.error("Identity Verification Failed");
      }
    }
  };

  const handleError = (error) => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Scan your ID
        </h2>

        <div id="reader" style={{ width: "100%" }} />

        {!isScannerActive && (
          <button
            onClick={startScanner}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Scanner
          </button>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default QRScanner;
