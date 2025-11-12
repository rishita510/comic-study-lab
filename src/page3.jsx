// Origin page

import c1 from "./assets/c1.png";
import c2 from "./assets/c2.png";
import s1 from "./assets/s1.png";
import s2 from "./assets/s2.png";
import s3 from "./assets/s3.png";
import s4 from "./assets/s4.png";
import React from "react";

import Bg from "./components/bg.jsx";
import "./page3.css";

function Page3() {
  return (
    
    
     <div className="comic-container">
       <Bg style={{ backgroundColor: "Black" }}></Bg>
      <img src={c1} alt="Comic 1" className="comic-img" />
       <img src={c2} alt="Comic 2" className="comic-img" />
       <div className="characters-container">
         <img src={s1} alt="Character 1" className="character s13" />
         <img src={s2} alt="Character 2" className="character s23" />
         <img src={s3} alt="Character 3" className="character s33" />
         <img src={s4} alt="Character 4" className="character s43" />
       </div>
     </div>

  );
}
export default Page3;
