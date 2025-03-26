import React from 'react';

const ClinicPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>PetGuard Clinic</h1>
            <p style={styles.subHeading}>
                Your trusted partner in pet health and safety.
            </p>

            {/* Clinic Information Section */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>About Our Clinic</h2>
                <p style={styles.sectionText}>
                    At PetGuard Clinic, we specialize in providing comprehensive care for your pets. Our state-of-the-art facilities and experienced veterinarians ensure that your furry friends receive the best possible care. With the integration of PetGuard technology, we offer advanced monitoring and safety solutions to keep your pets healthy and secure.
                </p>
            </div>

            {/* Services Section */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Our Services</h2>
                <ul style={styles.serviceList}>
                    <li style={styles.serviceItem}>Routine Checkups and Vaccinations</li>
                    <li style={styles.serviceItem}>Emergency Care</li>
                    <li style={styles.serviceItem}>PetGuard Monitoring and Tracking</li>
                    <li style={styles.serviceItem}>Surgical Procedures</li>
                    <li style={styles.serviceItem}>Nutritional Counseling</li>
                </ul>
            </div>

            {/* PetGuard Integration Section */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>PetGuard Integration</h2>
                <p style={styles.sectionText}>
                    PetGuard is a revolutionary product that helps you monitor your pet's health and location in real-time. At our clinic, we use PetGuard to:
                </p>
                <ul style={styles.serviceList}>
                    <li style={styles.serviceItem}>Track your pet's activity and health metrics.</li>
                    <li style={styles.serviceItem}>Provide real-time alerts for emergencies.</li>
                    <li style={styles.serviceItem}>Ensure your pet's safety with GPS tracking.</li>
                </ul>
                <button style={styles.ctaButton}>Learn More About PetGuard</button>
            </div>

            {/* Contact Section */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Contact Us</h2>
                <p style={styles.sectionText}>
                    Have questions or need to schedule an appointment? Reach out to us!
                </p>
                <p style={styles.contactInfo}>
                    📞 Phone: <a href="tel:+1234567890" style={styles.link}>+1 (234) 567-890</a>
                </p>
                <p style={styles.contactInfo}>
                    📧 Email: <a href="mailto:info@petguardclinic.com" style={styles.link}>info@petguardclinic.com</a>
                </p>
                <p style={styles.contactInfo}>
                    📍 Address: 123 PetGuard Lane, Pet City, PC 12345
                </p>
            </div>
        </div>
    );
};

// Inline CSS styles
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        fontSize: '36px',
        marginBottom: '10px',
    },
    subHeading: {
        textAlign: 'center',
        color: '#666',
        fontSize: '18px',
        marginBottom: '40px',
    },
    section: {
        marginBottom: '40px',
    },
    sectionTitle: {
        color: '#333',
        fontSize: '24px',
        marginBottom: '16px',
    },
    sectionText: {
        color: '#555',
        fontSize: '16px',
        lineHeight: '1.6',
        marginBottom: '16px',
    },
    serviceList: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        color: '#555',
    },
    serviceItem: {
        marginBottom: '8px',
        fontSize: '16px',
    },
    ctaButton: {
        backgroundColor: '#48bb78',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '16px',
    },
    contactInfo: {
        color: '#555',
        fontSize: '16px',
        marginBottom: '8px',
    },
    link: {
        color: '#4299e1',
        textDecoration: 'none',
    },
};

export default ClinicPage;