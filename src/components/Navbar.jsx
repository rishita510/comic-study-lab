import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";


function Navbar() {
  return (
    <nav className="global-navbar">
  <div className="top-nav">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/page4">Activity</Link></li>
      <li><Link to="/page6">Creativity</Link></li>
      <li><Link to="/page3">Origin</Link></li>
      <li><Link to="/page5">Visibility</Link></li>
    </ul>
  </div>
</nav>

  );
}

export default Navbar;
