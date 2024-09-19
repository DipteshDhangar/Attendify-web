import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_URL || "http://localhost:8000";

const AttendanceRecords = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]); // State to store selected users

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch user details for present attendance
    const fetchUsersWithAttendance = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/FetchAttendance`);
        if (response.status === 200) {
          const uniqueUsers = response.data.users.filter(
            (v, i, a) => a.findIndex((t) => t.user.email === v.user.email) === i
          );
          setUsers(uniqueUsers); // Store users with unique email addresses
          setLoading(false);
        } else {
          setError("Failed to fetch user attendance records");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching user attendance records:", err);
        setError("An error occurred while fetching attendance records");
        setLoading(false);
      }
    };

    fetchUsersWithAttendance();
  }, []);

  // Handler for selecting all users
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user.user._id)); // Select all users
    } else {
      setSelectedUsers([]); // Deselect all users
    }
  };

  // Handler for selecting individual user
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId)); // Deselect user
    } else {
      setSelectedUsers([...selectedUsers, userId]); // Select user
    }
  };

  const handlePushToAMS = () => {
    // Implement the functionality for "Push to AMS" button
    alert("Push to AMS button clicked! Date will be sent to AMS.");
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Attendance Records for Today
      </h2>
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handleBackToLogin}
        >
          Back to Login
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-3 px-4 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === users.length}
                  className="form-checkbox"
                />
              </th>
              <th className="py-3 px-4 text-left">S. No</th>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Professional License No</th>
              <th className="py-3 px-4 text-left">Scanned At</th>
              <th className="py-3 px-4 text-left">Verified</th>
            </tr>
          </thead>
          <tbody>
            {users.map((entry, index) => (
              <tr
                key={entry.user._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(entry.user._id)}
                    onChange={() => handleSelectUser(entry.user._id)}
                    className="form-checkbox"
                  />
                </td>
                <td className="py-3 px-4 text-left">{index + 1}</td>
                <td className="py-3 px-4 text-left">{entry.user.firstname}</td>
                <td className="py-3 px-4 text-left">{entry.user.lastname}</td>
                <td className="py-3 px-4 text-left">{entry.user.email}</td>
                <td className="py-3 px-4 text-left">
                  {entry.user.license || "NA"}
                </td>
                <td className="py-3 px-4 text-left">
                  {new Date(entry.scannedAt).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-left">
                  {entry.user.email_verified ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-right">
        <button
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handlePushToAMS}
        >
          Push to AMS
        </button>
      </div>
    </div>
  );
};

export default AttendanceRecords;
