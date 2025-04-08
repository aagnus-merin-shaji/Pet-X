import React, { useState } from "react";
import styled from "styled-components";

const Services = () => {
  // State to track which service's "Read More" content is visible
  const [expandedService, setExpandedService] = useState(null);

  // Function to handle "Read More" button click
  const handleReadMoreClick = (service) => {
    // Toggle the expanded service; if it's already expanded, collapse it
    setExpandedService(expandedService === service ? null : service);
  };

  // Additional content for each service
  const readMoreContent = {
    "Routine Checkups": "Our routine checkups include a thorough physical examination, weight monitoring, and preventative care advice tailored to your pet’s age and breed.",
    "Vaccinations": "We offer a full schedule of core and non-core vaccines, administered based on your pet’s lifestyle and risk factors, ensuring optimal protection.",
    "Dental Care": "Our dental services include teeth cleaning, polishing, and extractions if needed, all performed under safe anesthesia to keep your pet comfortable.",
    "Surgery": "From spaying/neutering to complex orthopedic procedures, our skilled surgeons use advanced techniques and post-operative care for quick recovery.",
    "Emergency Care": "Our 24/7 emergency services include diagnostics, stabilization, and treatment for accidents, sudden illnesses, or critical conditions.",
    "Pet Nutrition Counseling": "We provide personalized diet plans, addressing weight management, allergies, and specific health conditions to optimize your pet’s vitality."
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
          {expandedService === "Routine Checkups" && (
            <p className="read-more-content">{readMoreContent["Routine Checkups"]}</p>
          )}
          <button onClick={() => handleReadMoreClick("Routine Checkups")}>
            {expandedService === "Routine Checkups" ? "Show Less" : "Read More"}
          </button>
        </div>

        {/* Service Card 2: Vaccinations */}
        <div className="service-card">
          <h2>Vaccinations</h2>
          <p>
            Comprehensive vaccination programs to protect your pet from common diseases and ensure
            their long-term health.
          </p>
          {expandedService === "Vaccinations" && (
            <p className="read-more-content">{readMoreContent["Vaccinations"]}</p>
          )}
          <button onClick={() => handleReadMoreClick("Vaccinations")}>
            {expandedService === "Vaccinations" ? "Show Less" : "Read More"}
          </button>
        </div>

        {/* Service Card 3: Dental Care */}
        <div className="service-card">
          <h2>Dental Care</h2>
          <p>
            Professional dental cleaning and care to maintain your pet's oral health and prevent
            dental diseases.
          </p>
          {expandedService === "Dental Care" && (
            <p className="read-more-content">{readMoreContent["Dental Care"]}</p>
          )}
          <button onClick={() => handleReadMoreClick("Dental Care")}>
            {expandedService === "Dental Care" ? "Show Less" : "Read More-doctor"}
          </button>
        </div>

        {/* Service Card 4: Surgery */}
        <div className="service-card">
          <h2>Surgery</h2>
          <p>
            Advanced surgical procedures performed by experienced veterinarians to treat injuries,
            illnesses, and other conditions.
          </p>
          {expandedService === "Surgery" && (
            <p className="read-more-content">{readMoreContent["Surgery"]}</p>
          )}
          <button onClick={() => handleReadMoreClick("Surgery")}>
            {expandedService === "Surgery" ? "Show Less" : "Read More"}
          </button>
        </div>

        {/* Service Card 5: Emergency Care */}
        <div className="service-card">
          <h2>Emergency Care</h2>
          <p>
            Immediate medical attention for emergencies, available 24/7 to ensure your pet receives
            the care they need.
          </p>
          {expandedService === "Emergency Care" && (
            <p className="read-more-content">{readMoreContent["Emergency Care"]}</p>
          )}
          <button onClick={() => handleReadMoreClick("Emergency Care")}>
            {expandedService === "Emergency Care" ? "Show Less" : "Read More"}
          </button>
        </div>

        {/* Service Card 6: Pet Nutrition Counseling */}
        <div className="service-card">
          <h2>Pet Nutrition Counseling</h2>
          <p>
            Expert advice on pet nutrition to ensure your pet maintains a healthy diet and lifestyle.
          </p>
          {expandedService === "Pet Nutrition Counseling" && (
            <p className="read-more-content">{readMoreContent["Pet Nutrition Counseling"]}</p>
          )}
          <button onClick={() => handleReadMoreClick("Pet Nutrition Counseling")}>
            {expandedService === "Pet Nutrition Counseling" ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
    </ServicesWrapper>
  );
};

// Styled Components with Enhanced Styling
const ServicesWrapper = styled.div`
  padding: 3rem; /* Increased padding for breathing room */
  max-width: 1300px; /* Slightly wider container */
  margin: 0 auto;
  text-align: center;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); /* Subtle, calming gradient */

  h1 {
    font-size: 3rem; /* Larger for impact */
    color: #1e293b; /* Darker, richer color */
    margin-bottom: 1.5rem;
    font-weight: 700; /* Bolder for emphasis */
    background: linear-gradient(90deg, #34d399, #facc15); /* Vibrant gradient */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.5px; /* Better readability */
  }

  .description {
    font-size: 1.3rem; /* Larger for readability */
    color: #475569; /* Softer gray for contrast */
    margin-bottom: 3rem; /* More spacing */
    line-height: 1.6; /* Improved readability */
    font-weight: 400;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* Wider cards */
    gap: 2.5rem; /* More spacing between cards */
  }

  .service-card {
    background-color: #ffffff;
    border-radius: 16px; /* Softer corners */
    padding: 2rem; /* More internal padding */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08); /* Softer shadow */
    transition: transform 0.4s ease, box-shadow 0.4s ease; /* Smoother transition */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:hover {
      transform: translateY(-8px); /* More pronounced lift */
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); /* Stronger hover shadow */
      background: #f0fdf4; /* Light green tint on hover */
    }

    h2 {
      font-size: 1.75rem; /* Larger for hierarchy */
      color: #1e293b; /* Darker for emphasis */
      margin-bottom: 1.25rem;
      font-weight: 600; /* Slightly bolder */
    }

    p {
      font-size: 1.1rem; /* Larger for readability */
      color: #475569; /* Softer, readable gray */
      margin-bottom: 2rem; /* More spacing */
      line-height: 1.8; /* Improved readability */
      flex-grow: 1; /* Ensures description takes up space */
    }

    .read-more-content {
      font-size: 1rem; /* Slightly smaller for distinction */
      color: #1f2937; /* Darker for emphasis */
      margin-bottom: 2rem;
      line-height: 1.7;
      font-style: italic; /* Subtle distinction from main text */
    }

    button {
      background: linear-gradient(90deg, #34d399, #facc15); /* Vibrant gradient */
      color: #ffffff;
      padding: 0.9rem 2rem; /* Slightly larger button */
      border: none;
      border-radius: 10px; /* Softer corners */
      cursor: pointer;
      font-size: 1.1rem; /* Larger text */
      font-weight: 600; /* Bolder */
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */

      &:hover {
        background: linear-gradient(90deg, #16a34a, #eab308); /* Darker gradient on hover */
        transform: translateY(-3px); /* Slight lift */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* Stronger shadow */
      }
    }
  }
`;

export default Services;