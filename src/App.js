// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import IDCard from "./components/IDCard";
import QRScanner from "./components/QRScanner";
import Meeting from "./components/Meeting";
import AttendanceRecords from "./components/Attendance";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Login";
import TableList from "./components/TableList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/id-card" element={<IDCard />} />
        <Route path="/qr-scanner/:courseId" element={<QRScanner />} />
        <Route path="/meeting/:courseId" element={<Meeting />} />
        <Route path="/admin/:courseId" element={<AttendanceRecords />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table" element={<TableList />} />
      </Routes>
    </Router>
  );
}

export default App;
