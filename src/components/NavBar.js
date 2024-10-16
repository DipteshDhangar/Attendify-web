import React, { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa"; // For the hamburger and user icons

const Navbar = () => {
  // State to handle dropdown visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the dropdown menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between p-4">
        {/* Company Name */}
        <div className="text-white text-xl font-semibold">Fast Pass</div>

        {/* Right side: User Icon or Hamburger */}
        <div className="relative">
          {/* Hamburger Menu for mobile */}
          <div className="md:hidden">
            <FaBars
              className="text-white cursor-pointer text-2xl"
              onClick={toggleMenu}
            />
          </div>

          {/* User Icon for desktop */}
          <div className="hidden md:block">
            <FaUserCircle
              className="text-white cursor-pointer text-2xl"
              onClick={toggleMenu}
            />
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-gray-700 rounded-md shadow-lg w-48">
              <ul className="py-2">
                <li className="px-4 py-2 text-white hover:bg-gray-600 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 text-white hover:bg-gray-600 cursor-pointer">
                  Home
                </li>
                <li className="px-4 py-2 text-white hover:bg-gray-600 cursor-pointer">
                  About
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
