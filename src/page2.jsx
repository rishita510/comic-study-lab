import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Bg from "./components/bg.jsx";
import Heading from "./components/heading.jsx";
import "./page2.css";
import visibility from "./assets/visibility.png";
import origin from "./assets/origin.png";
import activity from "./assets/activity.png";
import creativity from "./assets/creativity.png";
import s1 from "./assets/s1.png";
import s2 from "./assets/s2.png";
import s3 from "./assets/s3.png";
import s4 from "./assets/s4.png";


function Page2() {
  const navigate = useNavigate();

  return (
    <div>
      <Bg style={{ backgroundColor: "white" }} />
      <Heading style={{ color: "rgb(64,76,66)", fontSize: "45px" }} />

      <div className="bubbles-container">
        <div className="bubble activity">
          <img src={activity} alt="activity" />
          <div className="bubble-text">
            <Link to="/page4">Activity</Link>
          </div>
        </div>
        <div className="bubble origin">
          <img src={origin} alt="origin" />
          <div className="bubble-text">
            <Link to="/page3">Origin</Link>
          </div>
        </div>
        <div className="bubble visibility">
          <img src={visibility} alt="visibility" />
          <div className="bubble-text">
            <Link to="/page5">Visibility</Link>
          </div>
        </div>
        <div className="bubble creativity">
          <img src={creativity} alt="creativity" />
          <div className="bubble-text">
            <Link to="/page6">Creativity</Link>
          </div>
        </div>
      </div>

      <div className="statues-container">
        <img src={s1} alt="Statue 1" className="statue statue1" />
        <img src={s2} alt="Statue 2" className="statue statue2" />
        <img src={s3} alt="Statue 3" className="statue statue3" />
        <img src={s4} alt="Statue 4" className="statue statue4" />
      </div>

     
      <footer className="contact-bar">
        <div className="contact-content">
          <h2>Comics Lab | IIT Jodhpur</h2>
          <p>
            “Comics: A New Lens to See the World.”
          </p>
          <p>
            Email:{" "}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nthoudam@iitj.ac.in&su=Regarding%20Comics%20Lab&body=Hello%20Comics%20Lab%20Team,"
            target="_blank">
            nthoudam@iitj.ac.in
            </a>
          </p>
          <p>Location: Indian Institute of Technology Jodhpur, Rajasthan, India</p>

          <div className="social-icons">
            <a
              href="https://www.instagram.com/comicsstudieslabatiitj/#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://x.com/SoLA_IITJ?t=HMOu5wt1j3F5h-hTUdwltw&s=09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/posts/iit-jodhpur-department-of-humanities-and-social-sciences_the-school-of-liberal-arts-iit-jodhpur-activity-7391843164480851968-Luie?utm_source=share&utm_medium=member_android&rcm=ACoAAFJOgjgBX2QkPsJqbuT6zrDBmtBGW9un9EE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://youtube.com/@iitjodhpurofficial?si=B-oXsRt0ju1PujkB"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="https://www.facebook.com/share/1DF2a3hhb4/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>

          <p className="footer-credit">
            © 2025 Comics Studies Lab, IIT Jodhpur | Guided by Dr. N. Thoudam

          </p>
        </div>
      </footer>
    </div>
  );
}

export default Page2;
