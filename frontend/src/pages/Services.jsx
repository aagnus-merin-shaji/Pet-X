import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [expandedService, setExpandedService] = useState(null);

  // Service data with detailed descriptions
  const services = [
    {
      id: 1,
      title: "Pet Grooming",
      shortDescription: "Professional grooming services including bathing, haircuts, nail trimming, and ear cleaning.",
      detailedDescription: "Our professional pet grooming services include full-service baths, breed-specific haircuts, nail trimming and filing, ear cleaning, teeth brushing, and flea/tick treatments. We use only pet-safe products and our groomers are certified professionals with years of experience handling all breeds and temperaments."
    },
    {
      id: 2,
      title: "Pet Training",
      shortDescription: "Expert training programs for obedience, behavior modification, and special skills.",
      detailedDescription: "We offer comprehensive training programs including puppy training, basic obedience, advanced commands, behavior modification for issues like barking or aggression, and specialized training for service or therapy dogs. Our certified trainers use positive reinforcement techniques tailored to your pet's personality and your family's needs."
    },
    {
      id: 3,
      title: "Pet Boarding",
      shortDescription: "Safe and comfortable boarding facilities with daily exercise and personalized care.",
      detailedDescription: "Our climate-controlled boarding facilities feature spacious private suites, daily exercise sessions, and 24/7 supervision. Each pet receives individualized attention, regular meal times, and medication administration if needed. We also offer webcam access so you can check on your pet anytime during their stay."
    },
    {
      id: 4,
      title: "Pet Daycare",
      shortDescription: "Daily care and socialization with supervised playgroups and rest periods.",
      detailedDescription: "Our daycare program provides structured socialization in small, temperament-matched groups. Activities include supervised play, puzzle toys, and rest periods. We separate dogs by size and energy level, and our staff is trained in canine body language and play styles to ensure safe, positive interactions."
    },
    {
      id: 5,
      title: "Pet Nutrition Counseling",
      shortDescription: "Personalized dietary plans and nutritional advice for optimal health.",
      detailedDescription: "Our certified pet nutritionists will assess your pet's age, breed, activity level, and any health concerns to create a customized feeding plan. We provide guidance on commercial foods, homemade diets, supplements, weight management, and special needs like allergies or kidney disease."
    },
    {
      id: 6,
      title: "Pet Transportation",
      shortDescription: "Safe and comfortable transportation for vet visits or other destinations.",
      detailedDescription: "Our pet transportation service uses climate-controlled vehicles equipped with secure crates or harness systems. We provide door-to-door service for vet appointments, grooming sessions, airport transfers, or any other destination. All drivers are pet first-aid certified and trained in safe handling techniques."
    }
  ];

  const toggleServiceExpansion = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <>
      
      <div style={styles.container}>
        <h1 style={styles.heading}>Pet Services</h1>
        <p style={styles.description}>
          We offer comprehensive services to keep your pets healthy, happy, and well-groomed.
        </p>
        <div style={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} style={styles.serviceCard}>
              <h2 style={styles.serviceTitle}>{service.title}</h2>
              <p style={styles.serviceDescription}>
                {service.shortDescription}
              </p>
              {expandedService === service.id && (
                <div style={styles.detailedDescription}>
                  <p>{service.detailedDescription}</p>
                  <button
                    style={styles.contactButton}
                    onClick={() => navigate("/contact", { state: { service: service.title } })}
                  >
                    Contact About This Service
                  </button>
                </div>
              )}
              <button
                style={styles.readMoreButton}
                onClick={() => toggleServiceExpansion(service.id)}
              >
                {expandedService === service.id ? "Show Less" : "Read More"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Updated styles
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
    flexGrow: 1,
  },
  detailedDescription: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #eee",
    fontSize: "0.95rem",
    color: "#555",
  },
  readMoreButton: {
    backgroundColor: "#48bb78",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "1rem",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#38a169",
    },
  },
  contactButton: {
    backgroundColor: "#48bb78",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "1rem",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#38a169",
    },
  },
};

export default Services;