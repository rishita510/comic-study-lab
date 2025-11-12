// **Activity-Section**
import Bg from "./components/bg.jsx";
import Heading from "./components/heading.jsx";
import courses from "./assets/courses.png";
import competitions from "./assets/competitions.png";
import projects from "./assets/projects.png";
import conferences from "./assets/conferences.png";
import event1 from "./assets/event1.png";
import event2 from "./assets/event2.png";
import ImagePopUp from './components/imagepopup.jsx'
import './page4.css';

function Page4() {
  
  return (
    <div>
    
    <div className="page4-container">
      <Bg style={{backgroundColor:"black"}}></Bg>
      <Heading style={{color:"white"}} />
      
      <div className="content">
        <div className="section courses">
          <h3>Courses: Intro to Comics Studies</h3>
          <ImagePopUp
            imageSrc={courses}
            title="Courses"
            description="Explore exciting courses with interactive content and creative learning paths."
          />
        </div>

        <div className="section projects">
          <h3>Projects: DC</h3>
          <ImagePopUp
            imageSrc={projects}
            title="Projects"
            description="Exciting DC-themed projects showcasing creativity and storytelling."
          />
        </div>

        <div className="section competitions">
          <h3>Competitions: 2D & 3D</h3>
          <ImagePopUp
            imageSrc={competitions}
            title="Competitions"
            description="Engage in dynamic 2D and 3D art competitions with great rewards."
          />
        </div>

        <div className="section conferences">
          <h3>Conferences</h3>
          <ImagePopUp
            imageSrc={conferences}
            title="Conferences"
            description="Join international conferences and connect with experts."
          />
        </div>

        <div className="section events">
          <h3>Events: Graphic Artist Series</h3>
          <div className="events-images">
            <ImagePopUp
              imageSrc={event1}
              title="Event 1"
              description="Graphic Artist Meet — 2024 edition."
            />
            <ImagePopUp
              imageSrc={event2}
              title="Event 2"
              description="Live Art Showcase and interactive sessions."
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Page4;
