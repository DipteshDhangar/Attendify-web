import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IDCard() {
  const { state } = useLocation();
  const { userData } = state || {};
  const idCardRef = useRef(null);
  const navigate = useNavigate();

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

  if (!userData) {
    navigate("/"); // Redirect to login if no user data is found
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        {" "}
        {/* Increased width slightly */}
        <div className="text-center">
          <button
            onClick={handleBack}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg mt-4 transition duration-200"
          >
            Back to Dashboard
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
          className="mt-6 border border-gray-300 rounded-lg p-4 shadow-lg flex"
        >
          {/* Left Side: User Image */}
          <div className="flex-shrink-0 w-1/4">
            {" "}
            {/* Decreased width */}
            <img
              src={userData.picture || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="w-full h-auto object-cover rounded-lg border-2 border-gray-300"
              style={{ maxHeight: "150px" }} // Adjust height as needed
            />
          </div>

          {/* Right Side: User Information */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="mb-2">
                <span className="font-bold">Name:</span>
                <span className="ml-3">
                  {userData.firstname} {userData.lastname}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-extrabold">Email:</span>
                <span className="ml-3">{userData.email}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold">Role:</span>
                <span className="ml-3">{userData.role}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold">P.L. No:</span>
                <span className="ml-3">{userData.licence}</span>
              </div>
            </div>

            {/* Bottom Right: QR Code */}
            <div className="flex justify-end ">
              {userData?.email && (
                <QRCodeCanvas value={userData.email} size={60} />
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default IDCard;
