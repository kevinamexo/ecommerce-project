import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo-section">
        <h3>The Online Store</h3>
      </div>
      <ul className="navbar__navItems">
        <li>Home</li>
        <li>Products</li>
        <li>Cart</li>
      </ul>
    </div>
  );
};

export default Navbar;
