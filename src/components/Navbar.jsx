import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="global-navbar">
  <div className="top-nav">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/page4">Activity</a></li>
      <li><a href="/page6">Creativity</a></li>
      <li><a href="/page3">Origin</a></li>
      <li><a href="/page5">Visibility</a></li>
    </ul>
  </div>
</nav>

  );
}

export default Navbar;
