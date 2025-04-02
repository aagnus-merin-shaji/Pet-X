import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled Components
const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const BackgroundOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('./assets/background2.jpg') center/cover;
  z-index: 0;
`;

const ContentContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const Section = styled(motion.div)`
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const Heading = styled(motion.h1)`
  text-align: center;
  color: #2d3748;
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(90deg,rgb(248, 245, 60),rgb(243, 194, 96));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubHeading = styled(motion.p)`
  text-align: center;
  color: #4a5568;
  font-size: 1.25rem;
  margin-bottom: 3rem;
  font-weight: 300;
`;

const SectionTitle = styled(motion.h2)`
  color: #2d3748;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg,rgb(139, 250, 124),rgb(243, 239, 124));
    border-radius: 3px;
  }
`;

const ServiceList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const ServiceItem = styled(motion.li)`
  padding: 1rem;
  background: #f7fafc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  &::before {
    content: '✓';
    color: #48bb78;
    margin-right: 0.5rem;
    font-weight: bold;
  }

  &:hover {
    background: #ebf8ff;
    transform: translateX(5px);
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(90deg,rgb(145, 244, 152),rgb(248, 246, 121));
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: block;
  margin: 2rem auto 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ContactInfo = styled(motion.p)`
  color: #4a5568;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Link = styled.a`
  color: #4299e1;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #3182ce;
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
                animate={{ opacity: 0.7 }}
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
                    <motion.p variants={fadeIn} style={{ color: '#4a5568', lineHeight: '1.6' }}>
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

                {/* PetGuard Integration Section */}
                <Section
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                >
                    <SectionTitle variants={fadeIn}>PetGuard Integration</SectionTitle>
                    <motion.p variants={fadeIn} style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '1rem' }}>
                        PetGuard is a revolutionary product that helps you monitor your pet's health and 
                        location in real-time. At our clinic, we use PetGuard to:
                    </motion.p>
                    <ServiceList variants={containerVariants}>
                        <ServiceItem variants={itemVariants}>Track your pet's activity and health metrics</ServiceItem>
                        <ServiceItem variants={itemVariants}>Provide real-time alerts for emergencies</ServiceItem>
                        <ServiceItem variants={itemVariants}>Ensure your pet's safety with GPS tracking</ServiceItem>
                    </ServiceList>
                </Section>

                {/* Contact Section */}
                <Section
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                >
                    <SectionTitle variants={fadeIn}>Contact Us</SectionTitle>
                    <motion.p variants={fadeIn} style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '1.5rem' }}>
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