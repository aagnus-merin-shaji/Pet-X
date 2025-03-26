// src/components/GetStartNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion"; // Import Framer Motion
import { Logo } from "../icons/index"; // Import the Logo component
import beeIcon from "../assets/bee.png"; // Import bee icon

const GetStartNavbar = () => {
  // Number of bees to display
  const numberOfBees = 50;

  // Animation variants for the bee
  const beeVariants = {
    fly: {
      x: ["-100%", "100%"], // Move from left to right
      y: ["0%", "10%", "-10%", "0%"], // Add a slight up-and-down motion
      rotate: [0, 10, -10, 0], // Add a slight rotation
      transition: {
        x: {
          duration: 8, // Time to cross the screen
          repeat: Infinity, // Loop forever
          ease: "linear", // Smooth linear movement
        },
        y: {
          duration: 1, // Time for up-and-down motion
          repeat: Infinity, // Loop forever
          ease: "easeInOut", // Smooth up-and-down motion
        },
        rotate: {
          duration: 2, // Time for rotation
          repeat: Infinity, // Loop forever
          ease: "easeInOut", // Smooth rotation
        },
      },
    },
  };

  return (
    <NavigatorWrapper>
      <nav>
        <div className="nav-left">
          <div className="logo">
            <Logo /> {/* Use the Logo component */}
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Render 50 bees with the same animation */}
        {Array.from({ length: numberOfBees }).map((_, index) => (
          <motion.img
            key={index}
            src={beeIcon}
            alt="Flying Bee"
            className="bee-icon"
            variants={beeVariants}
            animate="fly"
            style={{
              top: `${Math.random() * 100}%`, // Random vertical position
              left: `${Math.random() * 100}%`, // Random horizontal position
              width: `${20 + Math.random() * 20}px`, // Random size between 20px and 40px
              animationDelay: `${Math.random() * 5}s`, // Random delay for staggered animation
            }}
          />
        ))}
      </nav>
    </NavigatorWrapper>
  );
};

// Styled Components
const NavigatorWrapper = styled.header`
  position: relative;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Ensure the bees don't overflow the navbar */

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    position: relative; /* Ensure the bees are positioned relative to the navbar */
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    .logo {
      margin-right: 3.2rem;
    }

    .nav-links {
      display: flex;
      gap: 3.2rem;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        a {
          text-decoration: none;
          font-size: 1.5rem;
          text-transform: capitalize;
          color: hsl(var(--dark-grayish-blue));
          transition: color 0.3s ease;

          &:hover {
            color: hsl(var(--black));
          }
        }
      }
    }
  }

  .bee-icon {
    position: absolute;
    height: auto;
    z-index: 10; /* Ensure the bees are above other elements */
  }
`;

export default GetStartNavbar;