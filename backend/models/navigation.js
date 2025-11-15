import React, { useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  const pageData = {
    home: "Welcome to Comic Study Lab! Click the navigation buttons to explore.",
    activity: "Explore recent comic uploads, comments, and user engagement.",
    origin: "Discover the background, creators, and evolution of comics.",
    visibility: "Analyze popularity metrics and visibility insights.",
    creativity: "Dive into artistic techniques and creative styles behind comics.",
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 Comic Study Lab</h1>
      <nav style={styles.nav}>
        <button style={styles.button} onClick={() => setPage("activity")}>Activity</button>
        <button style={styles.button} onClick={() => setPage("origin")}>Origin</button>
        <button style={styles.button} onClick={() => setPage("visibility")}>Visibility</button>
        <button style={styles.button} onClick={() => setPage("creativity")}>Creativity</button>
      </nav>
      <div style={styles.content}>
        <h2 style={styles.pageTitle}>{page.charAt(0).toUpperCase() + page.slice(1)}</h2>
        <p>{pageData[page]}</p>
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: "Arial, sans-serif", textAlign: "center", marginTop: 50 },
  title: { fontSize: "2em", marginBottom: 20 },
  nav: { marginBottom: 30 },
  button: {
    margin: "0 10px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  content: { marginTop: 20, fontSize: "1.1em" },
  pageTitle: { color: "#333" },
};

export default App;
