import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  // Function to handle contact button click
  const handleContactClick = (service) => {
    // Navigate to a contact page or form, passing the service name as a parameter
    navigate("/contact", { state: { service } });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Our Services</h1>
      <p style={styles.description}>
        We provide a range of services to ensure the safety, health, and happiness of your pets.
      </p>
      <div style={styles.servicesGrid}>
        <div style={styles.serviceCard}>
          <h2 style={styles.serviceTitle}>Pet Health Monitoring</h2>
          <p style={styles.serviceDescription}>
            Track your pet's health in real-time with our advanced monitoring system. Get alerts for
            any unusual activity or health issues.
          </p>
          <button
            style={styles.contactButton}
            onClick={() => handleContactClick("Pet Health Monitoring")}
          >
            Contact Us
          </button>
        </div>
        <div style={styles.serviceCard}>
          <h2 style={styles.serviceTitle}>Pet Sitting & Walking</h2>
          <p style={styles.serviceDescription}>
            Reliable and professional pet sitters and walkers to take care of your pet when you're
            busy or away.
          </p>
          <button
            style={styles.contactButton}
            onClick={() => handleContactClick("Pet Sitting & Walking")}
          >
            Contact Us
          </button>
        </div>
        <div style={styles.serviceCard}>
          <h2 style={styles.serviceTitle}>Emergency Vet Assistance</h2>
          <p style={styles.serviceDescription}>
            Immediate access to veterinary assistance in case of emergencies. We connect you with the
            nearest vet instantly.
          </p>
          <button
            style={styles.contactButton}
            onClick={() => handleContactClick("Emergency Vet Assistance")}
          >
            Contact Us
          </button>
        </div>
        <div style={styles.serviceCard}>
          <h2 style={styles.serviceTitle}>Pet Training</h2>
          <p style={styles.serviceDescription}>
            Professional training programs to help your pet learn good behavior and new skills.
          </p>
          <button
            style={styles.contactButton}
            onClick={() => handleContactClick("Pet Training")}
          >
            Contact Us
          </button>
        </div>
        <div style={styles.serviceCard}>
          <h2 style={styles.serviceTitle}>Pet Insurance</h2>
          <p style={styles.serviceDescription}>
            Affordable insurance plans to cover your pet's medical expenses and ensure they receive
            the best care.
          </p>
          <button
            style={styles.contactButton}
            onClick={() => handleContactClick("Pet Insurance")}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#333",
    textAlign: "center",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    color: "#666",
    textAlign: "center",
    marginBottom: "2rem",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
  },
  serviceTitle: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "1rem",
  },
  serviceDescription: {
    fontSize: "1rem",
    color: "#666",
    flexGrow: 1, // Ensures the description takes up remaining space
  },
  contactButton: {
    backgroundColor: "#48bb78",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "1rem",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#38a169",
    },
  },
};

export default Services;