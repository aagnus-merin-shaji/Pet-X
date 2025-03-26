import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animalsviewallAPI } from '../services/animalServices';
import { useQuery } from '@tanstack/react-query';

const ClinicAnimals = () => {
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();

    const toggleReadMore = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleMedicalDetails = (pet) => {
        navigate("/clinic/animals/medical-details", { state: { pet } }); // Navigate to medical details form
    };

    const { data, isLoading, isError, error } = useQuery({
        queryFn: animalsviewallAPI,
        queryKey: ['animal-view']
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    const animals=data.animals
    return (
        <div style={styles.grid}>
            {animals.map((animal) => (
                <div key={animal.id} style={styles.card}>
                    <div style={styles.cardContent}>
                        <h2 style={styles.animalName}>{animal.name}</h2>
                        <p style={styles.animalInfo}>Breed: {animal.breed}</p>
                        <p style={styles.animalInfo}>Age: {animal.age}</p>
                        <p style={animal.vaccinated ? styles.vaccinated : styles.notVaccinated}>
                            {animal.vaccinated ? "Vaccinated ✅" : "Not Vaccinated ❌"}
                        </p>
                        <p style={styles.animalInfo}>Size: {animal.size}</p>
                        <p style={styles.animalInfo}>Status: {animal.status}</p>
                    </div>
                    <img src={animal.photos} alt={animal.name} style={styles.animalphotos} />
                    <div style={styles.cardContent}>
                        {expandedId === animal.id && (
                            <p style={styles.moreInfo}>
                                <strong>Medical History:</strong> {animal.medicalHistory}
                            </p>
                        )}
                        <button
                            style={styles.readMoreButton}
                            onClick={() => toggleReadMore(animal.id)}
                        >
                            {expandedId === animal.id ? "Read Less" : "Read More"}
                        </button>
                        <button
                            style={styles.medicalDetailsButton}
                            onClick={() => handleMedicalDetails(animal)}
                        >
                            Medical Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Inline styles (same as before)
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
    animalName: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '8px',
    },
    animalInfo: {
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
    animalphotos: {
        width: '100%',
        height: '240px',
        objectFit: 'cover',
    },
    moreInfo: {
        marginTop: '8px',
        color: '#2d3748',
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

export default ClinicAnimals;