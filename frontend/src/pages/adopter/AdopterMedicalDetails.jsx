import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { recordssearchAPI } from '../../services/medicalRecordServices';

const AdopterMedicalDetails = () => {
    // Styles
    const styles = {
        container: {
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        title: {
            color: '#2c3e50',
            textAlign: 'center',
            marginBottom: '30px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px'
        },
        sectionTitle: {
            color: '#3498db',
            margin: '25px 0 15px',
            paddingBottom: '5px',
            borderBottom: '1px solid #ddd'
        },
        detailsContainer: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        },
        detailItem: {
            margin: '12px 0',
            padding: '8px',
            borderBottom: '1px solid #eee',
            display: 'flex'
        },
        label: {
            fontWeight: 'bold',
            minWidth: '180px'
        },
        arrayItem: {
            backgroundColor: '#f5f5f5',
            padding: '10px',
            margin: '5px 0',
            borderRadius: '4px'
        },
        errorMessage: {
            color: '#e74c3c',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#fdecea',
            borderRadius: '5px',
            margin: '20px 0'
        },
        loadingMessage: {
            textAlign: 'center',
            padding: '20px',
            color: '#3498db'
        }
    };

    const location = useLocation();
    const { pet } = location.state || {};
    
    if (!pet) {
        return <div style={styles.errorMessage}>No pet details available.</div>;
    }

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => recordssearchAPI({ pet: pet }), // Changed to petId
        queryKey: ['record-view', pet]
    });
  
    
    if (isLoading) return <div style={styles.loadingMessage}>Loading medical records...</div>;
    if (isError) return <div style={styles.errorMessage}>Error: {error.message}</div>;
    if (!data) return <div style={styles.errorMessage}>No medical records found</div>;

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{data.petId.name}'s Medical Details</h1>
            
            <div style={styles.detailsContainer}>
                {/* Basic Information */}
                <h3 style={styles.sectionTitle}>Basic Information</h3>
                {[
                    { label: 'Breed', value: data.petId.breed },
                    { label: 'Age', value:data.petId.age },
                    { label: 'Status', value:data.petId.status }
                ].map((item, index) => (
                    <div key={`basic-${index}`} style={styles.detailItem}>
                        <span style={styles.label}>{item.label}:</span>
                        <span>{item.value || 'N/A'}</span>
                    </div>
                ))}

                {/* Medical Record */}
                <h3 style={styles.sectionTitle}>Medical Record</h3>
                {[
                    { label: 'Checkup Date', value: formatDate(data.checkupDate) },
                    { label: 'Diagnosis', value: data.diagnosis },
                    { label: 'Treatment', value: data.treatment },
                    { label: 'Special Needs', value: data.specialNeeds },
                    { label: 'Notes', value: data.notes }
                ].map((item, index) => (
                    <div key={`record-${index}`} style={styles.detailItem}>
                        <span style={styles.label}>{item.label}:</span>
                        <span>{item.value || 'N/A'}</span>
                    </div>
                ))}

                {/* Medications */}
                <h3 style={styles.sectionTitle}>Medications</h3>
                {data.medications?.length > 0 ? (
                    data.medications.map((med, index) => (
                        <div key={`med-${index}`} style={styles.arrayItem}>
                            <div style={styles.detailItem}>
                                <span style={styles.label}>Name:</span>
                                <span>{med.name || 'N/A'}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.label}>Dosage:</span>
                                <span>{med.dosage || 'N/A'}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.label}>Frequency:</span>
                                <span>{med.frequency || 'N/A'}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={styles.detailItem}>No medications recorded</div>
                )}

                {/* Vaccinations */}
                <h3 style={styles.sectionTitle}>Vaccinations</h3>
                {data.vaccinations?.length > 0 ? (
                    data.vaccinations.map((vaccine, index) => (
                        <div key={`vaccine-${index}`} style={styles.arrayItem}>
                            <div style={styles.detailItem}>
                                <span style={styles.label}>Name:</span>
                                <span>{vaccine.name || 'N/A'}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.label}>Date Given:</span>
                                <span>{formatDate(vaccine.dateGiven)}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.label}>Next Due Date:</span>
                                <span>{formatDate(vaccine.nextDueDate)}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={styles.detailItem}>No vaccinations recorded</div>
                )}
            </div>
        </div>
    );
};

export default AdopterMedicalDetails;