// src/components/LoginNavbar.js
import React from "react";

const LoginNavbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img
          src="/logo.png" // Replace with your logo path
          alt="Logo"
          style={styles.logo}
        />
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Glassy background
    backdropFilter: "blur(10px)", // Glass effect
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "40px", // Adjust as needed
    width: "auto",
  },
};

export default LoginNavbar;