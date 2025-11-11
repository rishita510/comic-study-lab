import React from "react";
import { Routes, Route } from "react-router-dom";
import Page1 from "./page1.jsx";
import Page2 from "./page2.jsx";
import Page3 from "./page3.jsx";
import Page4 from "./page4.jsx";
import Page5 from "./page5.jsx";
import Page6 from "./page6.jsx";
import Page7 from "./page7.jsx";
import AdminDashboard from "./adminDashboard.jsx";
import PostsPage from "./postsPage.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/page3" element={<Page3 />} />
      <Route path="/page4" element={<Page4 />} />
      <Route path="/page5" element={<Page5 />} />
      <Route path="/page6" element={<Page6 />} />
      <Route path="/page7" element={<Page7 />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
  <Route path="/posts" element={<PostsPage />} />
    </Routes>
  );
}

export default App;