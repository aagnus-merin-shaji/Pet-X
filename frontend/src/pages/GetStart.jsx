import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Import background images
import background1 from "../assets/background1.jpg";
import background2 from "../assets/background2.jpg";
import background3 from "../assets/background3.jpg";

const GetStart = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the Login page
  };

  return (
    <GetStartWrapper>
      <section className="hero">
        <h1>Welcome to Pet-X</h1>
        <p>Your one-stop solution for pet adoption, care, and community support.</p>
        <button onClick={handleGetStarted} className="get-started-button">
          Get Started
        </button>
      </section>
    </GetStartWrapper>
  );
};

// Keyframes for background animation
const backgroundAnimation = keyframes`
  0% {
    background-image: url(${background1});
  }
  33% {
    background-image: url(${background2});
  }
  66% {
    background-image: url(${background3});
  }
  100% {
    background-image: url(${background1});
  }
`;

const GetStartWrapper = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background-image: url(${background1});
  background-size: cover;
  background-position: center;
  animation: ${backgroundAnimation} 15s infinite; // Apply the animation

  .hero {
    text-align: center;
    margin-bottom: 4rem;
    padding-top: 19rem; // Add padding to center the hero section

    h1 {
      font-size: 7rem;
      color: hsl(var(--white));
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); // Add text shadow for better visibility
    }

    p {
      font-size: 1.4rem;
      color: hsl(var(--white));
      margin-bottom: 1.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); // Add text shadow for better visibility
    }

    .get-started-button {
      padding: 0.75rem 1.5rem;
      background-color: yellow;
      color: hsl(var(--black));
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.3s ease, background-color 0.3s ease;

      &:hover {
        opacity: 0.9;
        background-color: #ADFF2F;
      }
    }
  }
`;

export default GetStart;