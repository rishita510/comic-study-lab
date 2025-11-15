import React, { useState } from "react";
import Bg from "./components/bg.jsx";
import "./page5.css";
import Navbar from "./components/Navbar.jsx"
// Faculty images
import p1 from "./assets/p1.png";
import p2 from "./assets/p2.png";
import p3 from "./assets/p3.png";
import p4 from "./assets/p4.png";
import p5 from "./assets/p5.png";
import p6 from "./assets/p6.png";
import p7 from "./assets/p7.png";
import p8 from "./assets/p8.png";
import p9 from "./assets/p9.png";
import p10 from "./assets/p10.png";
import p11 from "./assets/p11.png";
import p12 from "./assets/p12.png";
import p13 from "./assets/p13.png";
import p14 from "./assets/p14.png";

// Artist images
import Artist1 from "./assets/Artist1.png";
import Artist2 from "./assets/Artist2.png";
import Artist3 from "./assets/Artist3.png";
import Artist4 from "./assets/Artist4.png";
import Artist5 from "./assets/Artist5.png";
import Artist6 from "./assets/Artist6.png";
import Artist7 from "./assets/Artist7.png";
import Artist8 from "./assets/Artist8.png";
import Artist9 from "./assets/Artist9.png";
import Artist10 from "./assets/Artist10.png";
import Artist11 from "./assets/Artist11.png";
import Artist12 from "./assets/Artist12.png";
import Artist13 from "./assets/Artist13.png";
import Artist14 from "./assets/Artist14.png";
import Artist15 from "./assets/Artist15.png";
import Artist16 from "./assets/Artist16.png";
import Artist17 from "./assets/Artist17.png";
import Artist18 from "./assets/Artist18.png";
import Artist19 from "./assets/Artist19.png";
import Artist20 from "./assets/Artist20.png";
import Artist21 from "./assets/Artist21.png";
import Artist22 from "./assets/Artist22.png";
import Artist23 from "./assets/Artist23.png";
import Artist24 from "./assets/Artist24.png";
import Artist25 from "./assets/Artist25.png";

// ✅ Faculty data (same as before)
const facultyData = [
  { img: p1, name: "Anuj Pal Kapoor", link: "https://www.iitj.ac.in/People/Profile/3046eafb-3221-44c9-a527-3e5ea1795659", domain: "" },
  { img: p2, name: "Ashish Pathak", link: "https://www.iitj.ac.in/People/Profile/ff0be18d-bc39-49b8-b01c-eb8627ef7a98", domain: "" },
  { img: p3, name: "Avinash Sharma", link: "https://www.iitj.ac.in/People/Profile/bc795393-557c-4140-8c14-932a5953a6a1", domain: "" },
  { img: p4, name: "Bhaskar Kumar Kakati", link: "https://www.iitj.ac.in/People/Profile/ad3ffc2b-3584-45fd-ba35-6df22730752d", domain: "" },
  { img: p5, name: "Tekcham Gishan Singh", link: "https://www.iitj.ac.in/People/Profile/7add6e5a-c957-4fa1-919c-5261a5b11427", domain: "" },
  { img: p6, name: "Jayant Kumar", link: "https://www.iitj.ac.in/People/Profile/b5d0ced7-bfcf-4e23-90c6-825932f6994f", domain: "" },
  { img: p7, name: "Natasha Thoudam", link: "https://www.iitj.ac.in/People/Profile/5865953b-a756-4109-8f81-d9d4a2a3e1bf", domain: "" },
  { img: p8, name: "Pranjal Protim Bohra", link: "https://www.iitj.ac.in/People/Profile/4655e252-8e25-4d9a-938c-c0e2d062c21b", domain: "" },
  { img: p9, name: "Prasenjeet A. Tribhuvan", link: "https://www.iitj.ac.in/People/Profile/c0082c31-6c2a-4f7f-9405-e123d7b05342", domain: "" },
  { img: p10, name: "Romi Banerjii", link: "https://www.iitj.ac.in/People/Profile/cbfae589-0b31-43d8-8a49-4990247e8628", domain: "" },
  { img: p11, name: "Shiv Kumar Verma", link: "https://www.iitj.ac.in/People/Profile/5ec81473-67aa-48ed-9533-b2ecd2456e32", domain: "" },
  { img: p12, name: "Sumit Kalra", link: "https://www.iitj.ac.in/People/Profile/fcf966fb-01fe-4660-9fb3-fa692911a86a", domain: "Assistant Professor, Department of CSE" },
  { img: p13, name: "Sunil Kumar Lohar", link: "https://www.iitj.ac.in/People/Profile/5ee5e2a2-ebcc-471c-9287-3987cdac57e2", domain: "" },
  { img: p14, name: "Tonisha Guin", link: "https://www.iitj.ac.in/People/Profile/f67cd3f4-1f9c-4e00-b460-57e0f1752ae5", domain: "" },
];

// ✅ Artist data (only names where provided)
const artistData = [
  { img: Artist1, name: "Aaron Kashtan", link: "https://writing.charlotte.edu/people/aaron-kashtan/" },
  { img: Artist2, name: "Dr Ann Miller", link: "https://le.ac.uk/people/ann-miller" },
  { img: Artist3, name: "Antonio Paoliello Palermo", link: "https://portalrecerca.uab.cat/en/persons/antonio-paoliello-palermo/" },
  { img: Artist4, name: "Anthony Y. H. Fung", link: "https://www.com.cuhk.edu.hk/people/fung-anthony-y-h/" },
  { img: Artist5, name: "", link: "https://www.hkiaps.cuhk.edu.hk/people/" },
  { img: Artist6, name: "", link: "https://www.tandfonline.com/journals/rcom20/about-this-journal#editorial-board" },
  { img: Artist15, name: "Claudia-ccerulo", link: "https://it.linkedin.com/in/claudia-cerulo" },
  { img: Artist7, name: "", link: "https://www.letiarts.com/about-us/" },
  { img: Artist8, name: "Felipe Muhr", link: "https://www.comics.ugent.be/felipe-muhr/" },
  { img: Artist9, name: "Héctor Fernández-L'Hoeste", link: "https://cas.gsu.edu/profile/hector-fernandez-lhoeste/" },
  { img: Artist10, name: "", link: "https://www.tandfonline.com/journals/rcom20/about-this-journal#editorial-board" },
  { img: Artist11, name: "Dr. Kinko Ito", link: "https://ualr.edu/sociology/faculty/ito/" },
  { img: Artist12, name: "Maaheen Ahmed", link: "https://research.flw.ugent.be/en/maaheen.ahmed" },
  { img: Artist13, name: "Makayla Lewis", link: "https://makaylalewis.co.uk/" },
  { img: Artist14, name: "Natasha Thoudam", link: "https://www.iitj.ac.in/People/Profile/5865953b-a756-4109-8f81-d9d4a2a3e1bf" },
  { img: Artist16, name: "Nasreen Sultana Mitu", link: "https://en.wikipedia.org/wiki/Nasreen_Sultana_Mitu" },
  { img: Artist17, name: "Nick Sousanis", link: "https://liberalstudies.sfsu.edu/people/nick-sousanis" },
  { img: Artist18, name: "Nigar Nazar", link: "https://en.wikipedia.org/wiki/Nigar_Nazar" },
  { img: Artist19, name: "Promina Shrestha", link: "https://np.linkedin.com/in/promina-shrestha-7ab09550" },
  { img: Artist20, name: "Reynaldo Anderson", link: "https://liberalarts.temple.edu/directory/reynaldo-anderson" },
  { img: Artist21, name: "Sachie Diriweera", link: "https://ae.linkedin.com/in/sachiediriweera" },
  { img: Artist22, name: "Sean Eedy", link: "https://www.trentu.ca/history/sean-eedy" },
  { img: Artist23, name: "Stephan Packard", link: "https://mekuwi.phil-fak.uni-koeln.de/en/personen/professor-innen/prof-dr-stephan-packard" },
  { img: Artist24, name: "Tahneer Oksman", link: "https://www.mmm.edu/live/profiles/342-tahneer-oksman" },
  { img: Artist25, name: "Tessa Pijnaker", link: "https://www.uu.nl/staff/TPijnaker" },
];

function Page5() {
  const [hoveredFaculty, setHoveredFaculty] = useState(null);
  const [hoveredArtist, setHoveredArtist] = useState(null);

  return (
    <div className="page5-container">
      <Bg style={{ backgroundColor: "white" }} />
       <Navbar/>
      <h1 className="page5-heading">
        Comics Studies<br />Lab@IITJ
      </h1>

      {/* === Faculty Section === */}
      <div className="faculty-section">
        <h2 className="faculty-title">IITJ Faculty</h2>
        <div className="faculty-grid">
          {facultyData.map((faculty, index) => (
            <div
              key={index}
              className="faculty-card"
              onMouseEnter={() => setHoveredFaculty(faculty)}
              onMouseLeave={() => setHoveredFaculty(null)}
            >
              <a href={faculty.link} target="_blank" rel="noopener noreferrer">
                <img src={faculty.img} alt={faculty.name} />
              </a>
            </div>
          ))}
        </div>

        {hoveredFaculty && (
          <div className="info-box">
            <h3>{hoveredFaculty.name}</h3>
            <p>{hoveredFaculty.domain}</p>
          </div>
        )}
      </div>

      {/* === Students Section === */}
      <div className="students-section" style={{ marginTop: "30px" }}>
        <h2 className="student-title">IITJ Students</h2>
        <p>75 students & alumni</p>
      </div>

      {/* === Artists Section === */}
      <div className="artists-section">
        <h2 className="artist-title">Comics Artists & Scholars</h2>

        <div className="faculty-grid">
          {artistData.map((artist, index) => (
            <div
              key={index}
              className="faculty-card"
              onMouseEnter={() =>
                artist.name ? setHoveredArtist(artist) : setHoveredArtist(null)
              }
              onMouseLeave={() => setHoveredArtist(null)}
            >
              <a href={artist.link} target="_blank" rel="noopener noreferrer">
                <img src={artist.img} alt={artist.name || "Artist"} />
              </a>
            </div>
          ))}
        </div>

        {hoveredArtist && hoveredArtist.name && (
          <div className="info-box">
            <h3>{hoveredArtist.name}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page5;
