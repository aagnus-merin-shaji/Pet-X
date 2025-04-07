import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { adoptionviewAPI } from "../services/adoptionServices";

const AdopterAdoptions = () => {
    const navigate = useNavigate();
    const [isContractSignedByAdopter, setIsContractSignedByAdopter] = useState(false);

    const { data, isLoading } = useQuery({
        queryFn: adoptionviewAPI,
        queryKey: ["request"],
    });
    const orderedPets = data?.applications || [];

    const handlePayment = (adoptionId) => {
        console.log(`Proceeding to payment for adoption ID: ${adoptionId}`);
        const amount = 100; // Replace with dynamic amount if available
        navigate("/payment", { state: { adoptionId, amount } });
    };

    const handleContract = (petId) => {
        console.log(`Proceeding to contract signing for pet ID: ${petId}`);
        navigate("/contract-sign",{ state: {petId} });
    };

    const handleViewContract = (petId) => {
        console.log(`Viewing contract for pet ID: ${petId}`);
        navigate("/view-contract");
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <AdopterAdoptionsWrapper>
            <h1>Adopter Adoptions</h1>
            <p>Here are the details of the pets you have ordered:</p>
            <div className="pet-list">
                {orderedPets?.map((pet) => (
                    <div key={pet._id} className="pet-card">
                        <h2>{pet.animalId?.name}</h2>
                        <p><strong>Breed:</strong> {pet.animalId?.breed}</p>
                        <p><strong>Status:</strong> {pet.adoptionStatus}</p>
                        {pet.adoptionStatus === "Approved" && (
                            <div className="button-group">
                                <button
                                    className="payment-button"
                                    onClick={() => handlePayment(pet._id)}
                                    disabled={pet.paymentStatus === "completed"} // Disable if completed
                                >
                                    Proceed to Payment
                                </button>
                                <button
                                    className="contract-button"
                                    onClick={() => handleContract(pet.animalId)}
                                    disabled={pet.paymentStatus !== "completed"} // Enable if completed
                                >
                                    Sign Contract
                                </button>
                            </div>
                        )}
                        {isContractSignedByAdopter && (
                            <button
                                className="view-contract-button"
                                onClick={() => handleViewContract(pet.animalId)}
                            >
                                View Contract
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </AdopterAdoptionsWrapper>
    );
};

// Styled Components (unchanged except ensuring :disabled styling)
const AdopterAdoptionsWrapper = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
        font-size: 2rem;
        color: #333;
        margin-bottom: 1rem;
    }

    .pet-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .pet-card {
        background-color: #f9f9f9;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        h2 {
            font-size: 1.5rem;
            color: #444;
            margin-bottom: 0.5rem;
        }

        p {
            font-size: 1rem;
            color: #666;
            margin: 0.5rem 0;
        }

        .button-group {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }

        .payment-button,
        .contract-button,
        .view-contract-button {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            transition: background-color 0.3s ease, transform 0.2s ease;

            &:hover {
                transform: translateY(-2px);
            }

            &:active {
                transform: translateY(0);
            }
        }

        .payment-button {
            background-color: #48bb78;
            color: #fff;

            &:hover {
                background-color: #38a169;
            }

            &:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
        }

        .contract-button {
            background-color: #4299e1;
            color: #fff;

            &:hover {
                background-color: #3182ce;
            }

            &:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
        }

        .view-contract-button {
            background-color: #6c757d;
            color: #fff;

            &:hover {
                background-color: #5a6268;
            }
        }
    }
`;

export default AdopterAdoptions;