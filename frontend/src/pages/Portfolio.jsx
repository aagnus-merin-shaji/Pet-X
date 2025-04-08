import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animalsviewallAPI } from '../services/animalServices';
import { adoptionaddAPI, adoptionmatchesAPI } from '../services/adoptionServices';
import { useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";

const Portfolio = () => {
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: animalsviewallAPI,
        queryKey: ['animal-view']
    });
    
    const { mutateAsync, isPending } = useMutation({
        mutationFn: adoptionaddAPI,
        mutationKey: ["add-request"],
    });
    
    const { data: matches } = useQuery({
        queryFn: adoptionmatchesAPI,
        queryKey: ['animal-matches']
    });
    
    const userId = useSelector((state) => state.user.id);

    const toggleReadMore = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleAdoptClick = async (petId) => {
        await mutateAsync(petId);
        alert("You have chosen to adopt this pet! Please proceed to complete the adoption process.");
        navigate('', { state: { petId } });
    };
    const handleMedicalViewClick = (pet) => {
        navigate('/adopter/medical-details', { state: { pet: pet._id } });
    };

    if (isLoading) return <div style={styles.loading}>Loading pets...</div>;
    if (isError) return <div style={styles.error}>Error: {error.message}</div>;
    
    const pets = data.animals;

    return (
        <>
            <div>
                <h1>
                    <FaStar style={{ marginRight: "10px", verticalAlign: "middle" }} />
                    Suggested for You
                </h1> 
                <div style={styles.grid}>
                    {matches?.map((animal) => (
                        <div key={animal.pet._id} style={styles.card}>
                            <div style={styles.cardContent}>
                                <h2 style={styles.petName}>{animal.pet.name}</h2>
                                <p style={styles.petInfo}>Breed: {animal.pet.breed}</p>
                                <p style={styles.petInfo}>Age: {animal.pet.age}</p>
                                <p style={animal.pet.vaccinated ? styles.vaccinated : styles.notVaccinated}>
                                    {animal.pet.vaccinated ? "Vaccinated ✅" : "Not Vaccinated ❌"}
                                </p>
                                <p style={styles.petInfo}>Size: {animal.pet.size}</p>
                                <p style={styles.petInfo}>Adoption Fee: {animal.pet.adoptionFee}</p>
                            </div>
                            <img src={animal.pet.photos} alt={animal.pet.name} style={styles.petphotos} />
                            <div style={styles.cardContent}>
                                <p style={styles.petInfo}>Status: {animal.pet.status}</p>
                                {expandedId === animal.pet._id && (
                                    <p style={styles.moreInfo}>
                                        <strong>Description:</strong> {animal.pet.description}
                                    </p>
                                )}
                                <button
                                    style={styles.readMoreButton}
                                    onClick={() => toggleReadMore(animal.pet._id)}
                                >
                                    {expandedId === animal.pet._id ? "Read Less" : "Read More"}
                                </button>
                                <button
                                    style={styles.adoptButton}
                                    onClick={() => handleAdoptClick(animal.pet._id)}
                                >
                                    Adopt
                                </button>
                                <button
                                    style={styles.medicalViewButton}
                                    onClick={() => handleMedicalViewClick(animal.pet)}
                                >
                                    Medical View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>       
            </div>
            <h1>Other Animals</h1>
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
                            <p style={styles.petInfo}>Adoption Fee: {pet.adoptionFee}</p>
                        </div>
                        <img src={pet.photos} alt={pet.name} style={styles.petphotos} />
                        <div style={styles.cardContent}>
                            <p style={styles.petInfo}>Status: {pet.status}</p>
                            {expandedId === pet._id && (
                                <p style={styles.moreInfo}>
                                    <strong>Description:</strong> {pet.description}
                                </p>
                            )}
                            <button
                                style={styles.readMoreButton}
                                onClick={() => toggleReadMore(pet._id)}
                            >
                                {expandedId === pet._id ? "Read Less" : "Read More"}
                            </button>
                            <button
                                style={styles.adoptButton}
                                onClick={() => handleAdoptClick(pet._id)}
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
        </>
    );
};

const styles = {
    // ... (keep all your existing styles exactly the same)
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
    loading: {
        textAlign: 'center',
        padding: '20px',
        fontSize: '18px'
    },
    error: {
        textAlign: 'center',
        padding: '20px',
        fontSize: '18px',
        color: 'red'
    }
};

export default Portfolio;