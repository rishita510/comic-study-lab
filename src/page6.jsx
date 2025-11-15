import React from "react";
import "./page6.css";
import Bg from "./components/bg.jsx";
import { Link } from "react-router-dom";
import s1 from "./assets/s1.png";
import s2 from "./assets/s2.png";
import Navbar from "./components/Navbar.jsx"
function Page6() {
  return (
    <div className="page6-container">
      <Bg />
        <Navbar/>
      <h1 className="page6-heading">
        Comics Studies
        <br />
        Lab@IITJ
      </h1>

      <div className="register-section">
        {/* Rotating figure - left */}
        <div className="rotating-figure">
          <img src={s1} alt="Hologram Left" />
        </div>

        {/* Center clickable text */}
        <div className="register-link">
          <Link to="/page7">Click here to register</Link>
        </div>

        {/* Rotating figure - right */}
        <div className="rotating-figure reverse">
          <img src={s1} alt="Hologram Right" />
        </div>
      </div>
    </div>
  );
}

export default Page6;
