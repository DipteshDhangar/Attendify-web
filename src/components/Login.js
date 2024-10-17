import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/authslice";

import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_URL;

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [license, setLicense] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Error: Please enter email and password.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/FindUserDetailsApp`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const userData = response.data.user;
        dispatch(setUser(userData)); // Dispatch the entire user data
        navigate("/table", { state: { userData } });
        toast.success(`Success: Logged in as ${userData.email}`);
      } else {
        toast.error(`Error: ${response.data.message || "Login failed"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error: Login failed.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !license || !email || !password) {
      toast.error("Error: Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/signup`,
        { firstname, lastname, license, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        dispatch(setUser(email));
        toast.success("Success: Account created successfully!");
        setIsSignup(false); // Switch to login after successful signup
      } else {
        toast.error(`Error: ${response.data.message || "Signup failed"}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Error: Signup failed.");
    }
  };

  const navigateToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form
          onSubmit={isSignup ? handleSignup : handleLogin}
          className="space-y-6"
        >
          {isSignup && (
            <>
              <div className="flex flex-col">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your license number"
                  required
                />
              </div>
            </>
          )}

          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmailState(e.target.value)}
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
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isSignup ? "Already have an account?" : "New user?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 hover:underline text-sm"
          >
            {isSignup ? "Login here" : "Sign up here"}
          </button>
        </p>

        <p className="text-center mt-4">
          {/* <button
            onClick={navigateToAdmin}
            className="text-blue-500 hover:underline text-sm"
          >
            Login as Admin
          </button> */}
        </p>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Auth;
