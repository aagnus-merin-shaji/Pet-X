import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import about from "../assets/about.jpg";

const About = () => {
  return (
    <AboutWrapper>
      {/* About Us Content */}
      <AboutContent>
        <AboutImage src={about} alt="About PetX" />
        <AboutText>
          <AboutHeading>About <Highlight>PetX</Highlight></AboutHeading>
          <AboutDescription>
            Your Trusted Pet Platform
            <br /><br />
            Welcome to PetX, a next-generation platform dedicated to connecting pet lovers with everything they need for their furry friends. From pet adoption to pet supplies, grooming services, and veterinary care, PetX is your one-stop destination for all things pets.
            <br /><br />
            Our platform empowers pet owners, breeders, and service providers to connect seamlessly while ensuring a safe and enjoyable experience for all.
          </AboutDescription>
        </AboutText>
      </AboutContent>

      {/* Four Horizontal Boxes */}
      <BoxContainer>
        <Box>
          <BoxIcon>🐾</BoxIcon>
          <BoxTitle>Who We Are</BoxTitle>
          <BoxText>
            Welcome to <Highlight>PetX</Highlight>, a dedicated platform for pet lovers. Whether you're looking to adopt a pet, find the best pet supplies, or connect with trusted pet service providers, PetX is here to make your journey easier and more enjoyable.
          </BoxText>
        </Box>

        <Box>
          <BoxIcon>❤️</BoxIcon>
          <BoxTitle>Our Mission</BoxTitle>
          <BoxText>
            Our mission is to create a vibrant community where pet lovers can find everything they need in one place. We aim to simplify pet care by offering a user-friendly platform that connects pet owners with trusted breeders, service providers, and suppliers.
          </BoxText>
        </Box>

        <Box>
          <BoxIcon>🛒</BoxIcon>
          <BoxTitle>What We Offer</BoxTitle>
          <BoxText>
            At <Highlight>PetX</Highlight>, we offer a wide range of services and products for pets. From pet adoption and supplies to grooming, training, and veterinary care, we provide a comprehensive solution for all your pet-related needs.
          </BoxText>
        </Box>

        <Box>
          <BoxIcon>🏅</BoxIcon>
          <BoxTitle>Why Choose Us?</BoxTitle>
          <BoxText>
            We stand out because of our commitment to quality, safety, and customer satisfaction. With secure transactions, verified listings, and exceptional customer support, <Highlight>PetX</Highlight> is your trusted partner in pet care.
          </BoxText>
        </Box>
      </BoxContainer>
    </AboutWrapper>
  );
};

// Styled Components with attractive proportions
const AboutWrapper = styled.div`
  padding: 3rem 2rem;
  font-family: "Kumbh Sans", sans-serif;
  background-color: hsl(var(--white));
  max-width: 1400px;
  margin: 0 auto;
`;

const AboutContent = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  margin: 2rem auto 4rem;
  max-width: 1200px;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 3rem;
    text-align: center;
  }
`;

const AboutImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  object-fit: cover;
  aspect-ratio: 1/1;

  @media (max-width: 992px) {
    max-width: 400px;
  }
`;

const AboutText = styled.div`
  flex: 1;
`;

const AboutHeading = styled.h1`
  font-size: 2.8rem;
  color: hsl(var(--black));
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const AboutDescription = styled.p`
  font-size: 1.2rem;
  color: hsl(var(--dark-grayish-blue));
  line-height: 1.8;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Highlight = styled.span`
  color: hsl(var(--orange));
  font-weight: 700;
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin: 4rem auto;
  max-width: 1200px;
`;

const Box = styled.div`
  background-color: hsl(var(--white));
  padding: 2.2rem 1.8rem;
  border-radius: 16px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid hsl(var(--divider));

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: hsl(var(--orange));
  }
`;

const BoxIcon = styled.div`
  font-size: 2.8rem;
  margin-bottom: 1.2rem;
`;

const BoxTitle = styled.h2`
  font-size: 1.5rem;
  color: hsl(var(--black));
  margin-bottom: 1.2rem;
  font-weight: 700;
`;

const BoxText = styled.p`
  font-size: 1.05rem;
  color: hsl(var(--dark-grayish-blue));
  line-height: 1.7;
`;

export default About;