import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaEye } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const TableList = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetch("http://localhost:8000/api/getTable")
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching table data:", error));
  }, []);

  const handleMarkAttendance = (courseId) => {
    // Navigate to dashboard and pass the courseId in the state
    navigate("/dashboard", { state: { userData: courseId } });
  };

  const handleFetchAttendance = (courseId) => {
    alert(`Fetching attendance for Course ID: ${courseId}`);
    // Add any logic to fetch attendance data if needed
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Class List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Sr No</th>
              <th className="border border-gray-300 px-4 py-2">Class Name</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item, index) => (
                <tr
                  key={item._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-center space-x-4">
                      <FaCheckCircle
                        className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600"
                        onClick={() => handleMarkAttendance(item._id)}
                        title="Mark Attendance"
                      />
                      <FaEye
                        className="text-green-500 text-2xl cursor-pointer hover:text-green-600"
                        onClick={() => handleFetchAttendance(item._id)}
                        title="Fetch Attendance"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;
