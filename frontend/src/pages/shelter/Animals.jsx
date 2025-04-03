import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { animalsviewallAPI } from '../../services/animalServices';

const Animals = () => {
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: animalsviewallAPI,
        queryKey: ['animal-view']
    });

    const toggleReadMore = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleMedicalDetails = (pet) => {
        navigate('/adopter/medical-details', { state: { pet: pet._id } });
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    const pets = data.animals;

    return (
        <div style={styles.grid}>
            {pets.map((pet) => (
                <div key={pet._id} style={styles.card}>
                    <div style={styles.cardContent}>
                        <h2 style={styles.petName}>{pet.name}</h2>
                        <p style={styles.petInfo}>Breed: {pet.breed}</p>
                        <p style={styles.petInfo}>Age: {pet.age}</p>
                        <p style={pet.vaccinated ? styles.vaccinated : styles.notVaccinated}>
                            {pet.vaccinated ? "Vaccinated ✅" : "Not Vaccinated ❌"}
                        </p>
                        <p style={styles.petInfo}>Size: {pet.size}</p>
                        <p style={styles.petInfo}>Status: {pet.status}</p>
                    </div>
                    <img src={pet.photos} alt={pet.name} style={styles.petImage} />
                    <div style={styles.cardContent}>
                        <p style={styles.moreInfo}>
                            {expandedId === pet._id && (
                                <>
                                    <strong>Description:</strong> {pet.description}
                                </>
                            )}
                        </p>
                        <button
                            style={styles.readMoreButton}
                            onClick={() => toggleReadMore(pet._id)}
                        >
                            {expandedId === pet._id ? "Read Less" : "Read More"}
                        </button>
                        <button
                            style={styles.medicalDetailsButton}
                            onClick={() => handleMedicalDetails(pet)}
                        >
                            Medical Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Rest of your styles remain exactly the same
const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#f7fafc',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },
    cardContent: {
        padding: '16px',
    },
    petName: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '8px',
    },
    petInfo: {
        color: '#4a5568',
        marginBottom: '8px',
    },
    vaccinated: {
        color: '#38a169',
        marginBottom: '8px',
    },
    notVaccinated: {
        color: '#e53e3e',
        marginBottom: '8px',
    },
    petImage: {
        width: '100%',
        height: '240px',
        objectFit: 'cover',
    },
    moreInfo: {
        marginTop: '8px',
        color: '#2d3748',
        minHeight: '24px' // Added to prevent layout shift
    },
    readMoreButton: {
        width: '100%',
        backgroundColor: '#4299e1',
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '12px',
    },
    medicalDetailsButton: {
        width: '100%',
        backgroundColor: '#48bb78',
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '8px',
    },
};

export default Animals;