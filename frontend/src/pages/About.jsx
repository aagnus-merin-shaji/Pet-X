// import React from "react";
// import styled from "styled-components";

// const About = () => {
//   return (
//     <AboutWrapper>
//       <h2>About Us</h2>
//       <h3>A New Way For Working For Many Of Professionals.</h3>
//       <p>
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry’s standard dummy text ever
//         since the 1500s, when an unknown printer took a galley of type and
//         scrambled it to make a type specimen book.
//       </p>
//       <p>
//         It has survived not only five centuries, but also the leap into
//         electronic typesetting, remaining essentially unchanged. It was
//         popularized in the 1960s with the release of Letraset sheets containing
//         Lorem Ipsum passages, and more recently with desktop publishing software
//         like Aldus PageMaker including versions of Lorem Ipsum.
//       </p>
//     </AboutWrapper>
//   );
// };

// const AboutWrapper = styled.section`
//   padding: 4rem 2rem;
//   background-color: hsl(var(--light-grayish-blue));
//   border-radius: 1rem;
//   text-align: center;

//   h2 {
//     font-size: 2rem;
//     color: hsl(var(--black));
//     margin-bottom: 1rem;
//   }

//   h3 {
//     font-size: 1.5rem;
//     color: hsl(var(--dark-grayish-blue));
//     margin-bottom: 1.5rem;
//   }

//   p {
//     font-size: 1rem;
//     color: hsl(var(--dark-grayish-blue));
//     line-height: 1.6;
//     margin-bottom: 1rem;
//     text-align: left;
//   }
// `;

// export default About;
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import about from "../assets/about.jpg"; // Import the new image for PetX

const About = () => {
  return (
    <AboutWrapper>
      {/* About Us Content */}
      <AboutContent>
        <AboutImage src={about} alt="About PetX" />
        <AboutText>
          <AboutHeading>About PetX</AboutHeading>
          <AboutDescription>
            Your Trusted Pet 
            Welcome to PetX, a next-generation platform dedicated to connecting pet lovers with everything they need for their furry friends. From pet adoption to pet supplies, grooming services, and veterinary care, PetX is your one-stop destination for all things pets. Our platform empowers pet owners, breeders, and service providers to connect seamlessly while ensuring a safe and enjoyable experience for all.
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

// Styled Components (unchanged)
const AboutWrapper = styled.div`
  padding: 2rem;
  font-family: "Kumbh Sans", sans-serif;
  background-color: hsl(var(--white));
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  background-color: hsl(var(--light-grayish-blue));
  border-bottom: 1px solid hsl(var(--divider));
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  color: hsl(var(--dark-grayish-blue));
  transition: color 0.3s ease;

  &:hover {
    color: hsl(var(--orange));
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4rem;
  margin: 4rem auto;
  max-width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AboutImage = styled.img`
  width: 100%;
  max-width: 400px; // Increased image size
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AboutText = styled.div`
  flex: 1;
`;

const AboutHeading = styled.h1`
  font-size: 2.5rem; // Increased heading size
  color: hsl(var(--black));
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const AboutDescription = styled.p`
  font-size: 2.2rem; // Increased text size
  color: hsl(var(--dark-grayish-blue));
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const Highlight = styled.span`
  color: hsl(var(--orange));
  font-weight: 700;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 4rem auto;
  max-width: 1200px;
`;

const Box = styled.div`
  background-color: hsl(var(--white));
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 280px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const BoxIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const BoxTitle = styled.h2`
  font-size: 1.5rem;
  color: hsl(var(--black));
  margin-bottom: 1rem;
  font-weight: 700;
`;

const BoxText = styled.p`
  font-size: 1rem;
  color: hsl(var(--dark-grayish-blue));
  line-height: 1.6;
`;

export default About;