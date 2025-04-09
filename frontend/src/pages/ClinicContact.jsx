import React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components with enhanced styles
const Banner = styled.div`
  background-color: #2d3748;
  color: white;
  padding: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
    img {
      width: 4rem;
      height: auto;
      margin-right: 0.5rem;
      border-radius: 50%;
    }
    span {
      color: #4299e1;
      font-weight: 700;
    }
  }
`;

const TopDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  p {
    color: #cbd5e0;
    font-style: italic;
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 0.5rem;
  input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 2px solid #cbd5e0;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    &:focus {
      border-color: #4299e1;
      box-shadow: 0 0 8px rgba(66, 153, 225, 0.5);
      outline: none;
    }
  }
  button {
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #4299e1;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    &:hover {
      background-color: #3182ce;
      transform: translateY(-2px);
    }
  }
`;

const Navbar = styled.nav`
  margin-top: 1.5rem;
  ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
    li a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease, border-bottom 0.3s ease;
      &:hover {
        color: #4299e1;
        border-bottom: 2px solid #4299e1;
      }
    }
  }
`;

const ContactSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
`;

const ContactTop = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2d3748;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .breadcrumb {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    a {
      color: #4299e1;
      text-decoration: none;
      transition: color 0.3s ease;
      &:hover {
        color: #2b6cb0;
      }
    }
  }
`;

const ContactBottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
`;

const MapContainer = styled.div`
  width: 100%;
  max-width: 600px;
  iframe {
    width: 100%;
    height: 16rem;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.02);
    }
  }
`;

const ContactText = styled.div`
  width: 100%;
  max-width: 600px;
  h5 {
    font-size: 1.25rem;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }
  p {
    color: #4a5568;
    line-height: 1.6;
    span {
      display: block;
      color: #718096;
    }
    a {
      color: #4299e1;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  input,
  textarea {
    padding: 0.75rem;
    border: 2px solid #cbd5e0;
    border-radius: 0.5rem;
    width: 100%;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    &:focus {
      border-color: #4299e1;
      box-shadow: 0 0 8px rgba(66, 153, 225, 0.3);
      outline: none;
    }
  }
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  button {
    padding: 0.75rem;
    background-color: #4299e1;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease;
    &:hover {
      background-color: #3182ce;
      transform: translateY(-2px);
    }
  }
`;

const Footer = styled.footer`
  background-color: #2d3748;
  color: white;
  padding: 2rem 0;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
`;

const FooterGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  width: 100%;
  max-width: 300px;
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #ecc94b;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li a {
      color: white;
      text-decoration: none;
      transition: color 0.3s ease;
      &:hover {
        color: #ecc94b;
      }
    }
  }
`;

const SocialIcons = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  a {
    color: #4299e1;
    text-decoration: none;
    font-size: 1.5rem;
    transition: color 0.3s ease, transform 0.2s ease;
    &:hover {
      color: #ecc94b;
      transform: scale(1.2);
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  color: #cbd5e0;
  margin-top: 2rem;
  a {
    color: #4299e1;
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: #ecc94b;
    }
  }
`;

const ClinicContact = () => {
  return (
    <div>
      {/* Contact Section */}
      <ContactSection>
        <Container>
          <ContactTop>
            <h2>Contact</h2>
            <div className="breadcrumb">
              {/* <li><a href="index.html">Home</a></li>
              <li>Contact</li> */}
            </div>
          </ContactTop>
          <ContactBottom>
            <MapContainer>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6632.248000703498!2d151.265683!3d-33.7832959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12abc7edcbeb07%3A0x5017d681632bfc0!2sManly+Vale+NSW+2093%2C+Australia!5e0!3m2!1sen!2sin!4v1433329298259"
                allowFullScreen
              ></iframe>
            </MapContainer>
            <ContactText>
              <div className="contact-right">
                <div className="address">
                  <h5>Address</h5>
                  <p>The Pet-X Clinic, <span>123 pet-x Lane petcity pc 12345</span></p>
                </div>
                <div className="address">
                  <h5>Contact Info</h5>
                  <p>
                    Tel: +1(234)567 890 <span>Fax: 190-4509-494</span>
                    Email: <a href="mailto:contact@example.com">info@pet-xclinic.com</a>
                  </p>
                </div>
              </div>
              {/* <ContactForm>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Phone" />
                <textarea placeholder="Message" />
                <button type="submit">Submit</button>
              </ContactForm> */}
            </ContactText>
          </ContactBottom>
        </Container>
      </ContactSection>
    </div>
  );
};

export default ClinicContact;