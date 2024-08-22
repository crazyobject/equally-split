// src/components/TopBar.js
import React from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import "./TopBar.css"; // Import CSS for the top bar

function TopBar() {
  return (
    <div className="top-bar">
      <div className="logo">
        <img src="/equally-logo.png" alt="Equally Logo" />
      </div>
      <div className="menu-icons">
        <FaUserCircle className="icon user-icon" />
        <FaBars className="icon menu-icon" />
      </div>
    </div>
  );
}

export default TopBar;
