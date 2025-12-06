import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div style={styles.container}>
      <h1>About Page</h1>
      <p>This page is also lazily loaded using React.lazy and Suspense.</p>

      <Link to="/" style={styles.link}>
        ← Back to Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "18px",
  },
};

export default About;
