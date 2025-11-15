import React from "react";
import Bg from "./components/bg";
import Heading from "./components/heading";
import { Link } from "react-router-dom";
import s1 from "./assets/s1.png";
import s2 from "./assets/s2.png";
import s3 from "./assets/s3.png";
import s4 from "./assets/s4.png";
import iitjlogo from "./assets/iitjlogo.png"
import "./page1.css";
import Navbar from "./components/Navbar.jsx"
function Page1() {
  return (
    <div>
      <Bg />
      <Heading />
      <img src={iitjlogo} className="IITJ" />
      <p id="p1-main">Our Home in the World of Comics</p>
      <Navbar/>
      {/* Proper working link */}
      <Link id="p1-end" to="/page2">
        Enter
      </Link>

      {/* Character images section */}
<div className="characters-container">
  <img src={s1} alt="Character 1" className="character s11" />
  <img src={s2} alt="Character 2" className="character s21" />
  <img src={s3} alt="Character 3" className="character s31" />
  <img src={s4} alt="Character 4" className="character s41" />
</div>

    </div>
  );
}

export default Page1;
