import React from "react";
import "./bgd.css";
import star from '../assets/star.png'
import leaf from '../assets/leaf.png'
import swirl from '../assets/curl.png'



function Bg(props) {
  return (
    <div className="bg-container" style = {props.style}>
      {/* Stars */}
      <img src={star} alt="star" className="bg-item star1" />
      <img src={star} alt="star" className="bg-item star2" />
      <img src={star} alt="star" className="bg-item star3" />
      <img src={star}alt="star" className="bg-item star4" />

      {/* Leaves */}
      <img src={leaf} alt="leaf" className="bg-item leaf1" />
      <img src={leaf}alt="leaf" className="bg-item leaf2" />
      <img src={leaf} alt="leaf" className="bg-item leaf3" />

      {/* Swirls */}
      <img src={swirl} alt="swirl" className="bg-item swirl1" />
      <img src={swirl} alt="swirl" className="bg-item swirl2" />
    </div>
  );
}

export default Bg; 
  