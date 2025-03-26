import React from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const { pet } = location.state || { pet: null };

    if (!pet) {
        return <div>No pet selected for adoption.</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Adopt {pet.name}</h1>
            <p style={styles.info}>Breed: {pet.breed}</p>
            <p style={styles.info}>Adoption Fee: {pet.adoptionFee}</p>
            <form style={styles.form}>
                <input type="text" placeholder="Card Number" style={styles.input} />
                <input type="text" placeholder="Expiry Date" style={styles.input} />
                <input type="text" placeholder="CVV" style={styles.input} />
                <button type="submit" style={styles.submitButton}>Pay Now</button>
            </form>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
    },
    heading: {
        fontSize: '2rem',
        color: '#2d3748',
        marginBottom: '1rem',
    },
    info: {
        fontSize: '1.2rem',
        color: '#4a5568',
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '0.75rem',
        borderRadius: '8px',
        border: '2px solid #cbd5e0',
        fontSize: '1rem',
    },
    submitButton: {
        padding: '0.75rem',
        backgroundColor: '#48bb78',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
    },
};

export default Payment;