import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <h1>Home Page</h1>
      <p>Welcome to the home page! This component was loaded lazily.</p>

      <Link to="/about" style={styles.link}>
        Go to About →
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

export default Home;
