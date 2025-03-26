import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="footer-content">
        {/* Section 1: About PetGuard */}
        <div className="footer-section">
          <h3>About PetGuard</h3>
          <ul>
            <li>Our Mission</li>
            <li>How It Works</li>
            <li>Success Stories</li>
            <li>Press Releases</li>
          </ul>
        </div>

        {/* Section 2: Connect with Us */}
        <div className="footer-section">
          <h3>Connect with Us</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>YouTube</li>
          </ul>
        </div>

        {/* Section 3: Resources */}
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>Pet Care Tips</li>
            <li>Adoption Guides</li>
            <li>Pet Health & Safety</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Section 4: Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Donate to Shelters</li>
            <li>Report an Issue</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PetGuard. All rights reserved.</p>
      </div>
    </FooterWrapper>
  );
};

// Styled Components
const FooterWrapper = styled.footer`
  background-color:black; /* Semi-transparent black background */
  color: hsl(var(--white));
  padding: 2rem;
  margin-top: auto; /* Push footer to the bottom of the page */
  backdrop-filter: blur(100px); /* Add a blur effect to the background */
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  border-radius: 0px; /* Optional: rounded corners for a smoother look 
  background-size: cover; /* Make sure the image covers the entire footer */
  background-position: top; /* Center the background image */

  .footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 0;
  }

  .footer-section {
    flex: 1;
    min-width: 200px;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: hsl(var(--orange));
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .footer-bottom {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid hsl(var(--divider));

    p {
      font-size: 0.8rem;
      color: hsl(var(--light-grayish-blue));
    }
  }
`;

export default Footer;
