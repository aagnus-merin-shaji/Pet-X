import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animalsviewallAPI } from '../services/animalServices';
import { adoptionaddAPI } from '../services/adoptionServices';
import { useSelector } from 'react-redux';

const Portfolio = () => {
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: animalsviewallAPI,
        queryKey: ['animal-view']
    });
    
    const { mutateAsync, isPending, } = useMutation({
        mutationFn: adoptionaddAPI, // Ensure this function is defined in userServices.js
        mutationKey: ["add-request"],
      });

      const userId = useSelector((state) => state.user.id);
      console.log(userId);

    const toggleReadMore = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleAdoptClick = async(pet) => {
        console.log("clicked");
        
       await mutateAsync(pet)
        navigate('/adopter-adoptions', { state: { pet } });
    };

    const handleMedicalViewClick = (pet) => {
        console.log(pet._id);
        
        navigate('/adopter/medical-details', { state: { pet: pet._id } });
    };

    if (isLoading) return <div style={styles.loading}>Loading pets...</div>;
    if (isError) return <div style={styles.error}>Error: {error.message}</div>;
    const pets=data.animals
    return (
        <div style={styles.grid}>
            {pets.map((pet) => (
                <div key={pet._id || pet.id} style={styles.card}>
                    <div style={styles.cardContent}>
                        <h2 style={styles.petName}>{pet.name}</h2>
                        <p style={styles.petInfo}>Breed: {pet.breed}</p>
                        <p style={styles.petInfo}>Age: {pet.age}</p>
                        <p style={pet.vaccinated ? styles.vaccinated : styles.notVaccinated}>
                            {pet.vaccinated ? "Vaccinated ✅" : "Not Vaccinated ❌"}
                        </p>
                        <p style={styles.petInfo}>Size: {pet.size}</p>
                        <p style={styles.petInfo}>Adoption Fee: {pet.adoptionFee}</p>
                    </div>
                    <img src={pet.photos} alt={pet.name} style={styles.petphotos} />
                    <div style={styles.cardContent}>
                        <p style={styles.petInfo}>Status: {pet.status}</p>
                        {expandedId === pet.id && (
                            <p style={styles.moreInfo}>
                                <strong>Medical History:</strong> {pet.medicalHistory}
                            </p>
                        )}
                        <button
                            style={styles.readMoreButton}
                            onClick={() => toggleReadMore(pet._id || pet.id)}
                        >
                            {expandedId === pet._id ? "Read Less" : "Read More"}
                        </button>
                        <button
    style={styles.adoptButton}
    onClick={() => {
        handleAdoptClick(pet._id); // Your existing adoption function
    }}
>
    Adopt
</button>
                        <button
                            style={styles.medicalViewButton}
                            onClick={() => handleMedicalViewClick(pet)}
                        >
                            Medical View
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Add these new styles to your existing styles object
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
    petphotos: {
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
    adoptButton: {
        width: '100%',
        backgroundColor: '#48bb78',
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '8px',
    },
    medicalViewButton: {
        width: '100%',
        backgroundColor: '#e53e3e',
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '8px',
    },
};

export default Portfolio;