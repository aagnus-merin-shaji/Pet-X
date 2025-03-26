import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Services = () => {
  const navigate = useNavigate();

  // Function to handle contact button click
  const handleContactClick = (service) => {
    // Navigate to a contact page or form, passing the service name as a parameter
    navigate("/contact", { state: { service } });
  };

  return (
    <ServicesWrapper>
      <h1>Our Clinic Services</h1>
      <p className="description">
        We provide a range of veterinary services to ensure the health and well-being of your pets.
      </p>
      <div className="services-grid">
        {/* Service Card 1: Routine Checkups */}
        <div className="service-card">
          <h2>Routine Checkups</h2>
          <p>
            Regular health checkups to monitor your pet's overall health and detect any potential
            issues early.
          </p>
          <button onClick={() => handleContactClick("Routine Checkups")}>
            Contact Us
          </button>
        </div>

        {/* Service Card 2: Vaccinations */}
        <div className="service-card">
          <h2>Vaccinations</h2>
          <p>
            Comprehensive vaccination programs to protect your pet from common diseases and ensure
            their long-term health.
          </p>
          <button onClick={() => handleContactClick("Vaccinations")}>
            Contact Us
          </button>
        </div>

        {/* Service Card 3: Dental Care */}
        <div className="service-card">
          <h2>Dental Care</h2>
          <p>
            Professional dental cleaning and care to maintain your pet's oral health and prevent
            dental diseases.
          </p>
          <button onClick={() => handleContactClick("Dental Care")}>
            Contact Us
          </button>
        </div>

        {/* Service Card 4: Surgery */}
        <div className="service-card">
          <h2>Surgery</h2>
          <p>
            Advanced surgical procedures performed by experienced veterinarians to treat injuries,
            illnesses, and other conditions.
          </p>
          <button onClick={() => handleContactClick("Surgery")}>
            Contact Us
          </button>
        </div>

        {/* Service Card 5: Emergency Care */}
        <div className="service-card">
          <h2>Emergency Care</h2>
          <p>
            Immediate medical attention for emergencies, available 24/7 to ensure your pet receives
            the care they need.
          </p>
          <button onClick={() => handleContactClick("Emergency Care")}>
            Contact Us
          </button>
        </div>

        {/* Service Card 6: Pet Nutrition Counseling */}
        <div className="service-card">
          <h2>Pet Nutrition Counseling</h2>
          <p>
            Expert advice on pet nutrition to ensure your pet maintains a healthy diet and lifestyle.
          </p>
          <button onClick={() => handleContactClick("Pet Nutrition Counseling")}>
            Contact Us
          </button>
        </div>
      </div>
    </ServicesWrapper>
  );
};

// Styled Components
const ServicesWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .service-card {
    background-color: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    h2 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      color: #666;
      margin-bottom: 1.5rem;
      flex-grow: 1; /* Ensures the description takes up remaining space */
    }

    button {
      background-color: #48bb78;
      color: #fff;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #38a169;
      }
    }
  }
`;

export default Services;