import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_URL || "http://localhost:8000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Error: Please enter email and password.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/FindUserDetailsApp`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const userData = response.data.user;
        navigate("/dashboard", { state: { userData } });
        toast.success(`Success: Logged in as ${userData.email}`);
      } else {
        toast.error(`Error: ${response.data.message || "Login failed"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error: Login failed.");
    }
  };

  const navigateToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          <button
            onClick={navigateToAdmin}
            className="text-blue-500 hover:underline text-sm"
          >
            Login as Admin
          </button>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
