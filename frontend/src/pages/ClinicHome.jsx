import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled Components with Enhanced Styling
const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%); /* Softer, calming gradient */
`;

const BackgroundOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('./assets/background2.jpg') center/cover;
  z-index: 0;
  opacity: 0.6; /* Slightly more transparent for subtlety */
`;

const ContentContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 3rem auto; /* Increased margin for breathing room */
  padding: 3rem; /* More padding for comfort */
  background: rgba(255, 255, 255, 0.97); /* Slightly more opaque */
  border-radius: 25px; /* Softer corners */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); /* Softer, larger shadow */
  backdrop-filter: blur(12px); /* Enhanced blur for modern feel */
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const Section = styled(motion.div)`
  margin-bottom: 4rem; /* More spacing between sections */
  padding: 2.5rem; /* Increased padding */
  background: #ffffff;
  border-radius: 20px; /* Softer corners */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06); /* Subtle shadow */
  transition: all 0.4s ease; /* Smoother transition */

  &:hover {
    transform: translateY(-8px); /* More pronounced lift */
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12); /* Stronger hover shadow */
  }
`;

const Heading = styled(motion.h1)`
  text-align: center;
  color: #1e293b; /* Darker, richer color */
  font-size: 3.5rem; /* Slightly larger for impact */
  margin-bottom: 1.5rem;
  font-weight: 800; /* Bolder for emphasis */
  background: linear-gradient(90deg, #facc15, #fb923c); /* Warmer, vibrant gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px; /* Better readability */
`;

const SubHeading = styled(motion.p)`
  text-align: center;
  color: #475569; /* Softer gray for contrast */
  font-size: 1.5rem; /* Larger for readability */
  margin-bottom: 4rem; /* More spacing */
  font-weight: 400; /* Slightly heavier for clarity */
  line-height: 1.4; /* Improved readability */
`;

const SectionTitle = styled(motion.h2)`
  color: #1e293b; /* Darker for emphasis */
  font-size: 2rem; /* Larger for hierarchy */
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  font-weight: 600;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px; /* Wider underline */
    height: 4px; /* Thicker for visibility */
    background: linear-gradient(90deg, #34d399, #facc15); /* Vibrant, playful gradient */
    border-radius: 4px;
  }
`;

const ServiceList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Wider items */
  gap: 1.5rem; /* More spacing */
`;

const ServiceItem = styled(motion.li)`
  padding: 1.25rem; /* More padding */
  background: #f0fdf4; /* Light green for positivity */
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  transition: all 0.4s ease;
  font-size: 1.1rem; /* Larger text */
  color: #1f2937; /* Darker for readability */

  &::before {
    content: '✓';
    color: #16a34a; /* Brighter green checkmark */
    margin-right: 0.75rem;
    font-weight: bold;
    font-size: 1.2rem;
  }

  &:hover {
    background: #dbeafe; /* Light blue on hover */
    transform: translateX(8px); /* More movement */
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(90deg, #34d399, #facc15); /* Matching vibrant gradient */
  color: #ffffff;
  padding: 1.25rem 2.5rem; /* Larger button */
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 1.1rem; /* Larger text */
  font-weight: 700; /* Bolder */
  display: block;
  margin: 3rem auto 0; /* More spacing */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Stronger shadow */
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-5px); /* Higher lift */
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15); /* Deeper shadow */
  }
`;

const ContactInfo = styled(motion.p)`
  color: #475569; /* Softer gray */
  font-size: 1.1rem; /* Larger for readability */
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem; /* More spacing */
`;

const Link = styled.a`
  color: #3b82f6; /* Brighter blue */
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500; /* Slightly bolder */

  &:hover {
    color: #2563eb; /* Darker blue on hover */
    text-decoration: underline;
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const ClinicHome = () => {
  return (
    <BackgroundContainer>
      <BackgroundOverlay 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }} /* Matches new opacity */
        transition={{ duration: 1 }}
      />
      
      <ContentContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Heading variants={itemVariants}>
          PetX Clinic
        </Heading>
        <SubHeading variants={itemVariants}>
          Your trusted partner in pet health and safety.
        </SubHeading>

        {/* About Section */}
        <Section
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
        >
          <SectionTitle variants={fadeIn}>About Our Clinic</SectionTitle>
          <motion.p 
            variants={fadeIn} 
            style={{ 
              color: '#475569', /* Matches new text color */
              lineHeight: '1.8', /* More readable */
              fontSize: '1.1rem' /* Larger text */
            }}
          >
            At PetGuard Clinic, we specialize in providing comprehensive care for your pets. 
            Our state-of-the-art facilities and experienced veterinarians ensure that your 
            furry friends receive the best possible care. With the integration of PetGuard 
            technology, we offer advanced monitoring and safety solutions to keep your pets 
            healthy and secure.
          </motion.p>
        </Section>

        {/* Services Section */}
        <Section
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
        >
          <SectionTitle variants={fadeIn}>Our Services</SectionTitle>
          <ServiceList variants={containerVariants}>
            <ServiceItem variants={itemVariants}>Routine Checkups and Vaccinations</ServiceItem>
            <ServiceItem variants={itemVariants}>Emergency Care</ServiceItem>
            <ServiceItem variants={itemVariants}>PetGuard Monitoring and Tracking</ServiceItem>
            <ServiceItem variants={itemVariants}>Surgical Procedures</ServiceItem>
            <ServiceItem variants={itemVariants}>Nutritional Counseling</ServiceItem>
          </ServiceList>
        </Section>

        {/* Contact Section */}
        <Section
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
        >
          <SectionTitle variants={fadeIn}>Contact Us</SectionTitle>
          <motion.p 
            variants={fadeIn} 
            style={{ 
              color: '#475569', /* Matches new text color */
              lineHeight: '1.8', /* More readable */
              marginBottom: '2rem', /* More spacing */
              fontSize: '1.1rem' /* Larger text */
            }}
          >
            Have questions or need to schedule an appointment? Reach out to us!
          </motion.p>
          <ContactInfo variants={itemVariants}>
            📞 <Link href="tel:+1234567890">+1 (234) 567-890</Link>
          </ContactInfo>
          <ContactInfo variants={itemVariants}>
            📧 <Link href="mailto:info@petguardclinic.com">info@petguardclinic.com</Link>
          </ContactInfo>
          <ContactInfo variants={itemVariants}>
            📍 123 PetGuard Lane, Pet City, PC 12345
          </ContactInfo>
        </Section>
      </ContentContainer>
    </BackgroundContainer>
  );
};

export default ClinicHome;