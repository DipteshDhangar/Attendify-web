// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import IDCard from "./components/IDCard";
import QRScanner from "./components/QRScanner";
import Meeting from "./components/Meeting";
import AttendanceRecords from "./components/Attendance";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/id-card" element={<IDCard />} />
        <Route path="/qr-scanner" element={<QRScanner />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/admin" element={<AttendanceRecords />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
