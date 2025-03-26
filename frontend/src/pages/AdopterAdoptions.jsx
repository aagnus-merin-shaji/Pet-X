import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigator from "../layout/Navigator"; // Import the Navigator component

const AdopterAdoptions = () => {
  const navigate = useNavigate();

  // State to track payment status and contract signing
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [isContractSignedByAdopter, setIsContractSignedByAdopter] = useState(false);

  // Dummy data for ordered pets (replace with actual data from API)
  const orderedPets = [
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      shelter: "Happy Paws Shelter",
      status: "Approved",
    },
    {
      id: 2,
      name: "Mittens",
      type: "Cat",
      breed: "Siamese",
      shelter: "Furry Friends Shelter",
      status: "Pending",
    },
  ];

  // Handle payment button click
  const handlePayment = (petId) => {
    console.log(`Proceeding to payment for pet ID: ${petId}`);
    setIsPaymentDone(true); // Simulate payment completion
    navigate("/payment"); // Redirect to Payment page
  };

  // Handle contract button click
  const handleContract = (petId) => {
    console.log(`Proceeding to contract signing for pet ID: ${petId}`);
    navigate("/contract-sign?signer=adopter"); // Redirect to Contract Signing page for adopter
  };

  // Handle view contract button click
  const handleViewContract = (petId) => {
    console.log(`Viewing contract for pet ID: ${petId}`);
    navigate("/view-contract"); // Redirect to View Contract page
  };

  return (
    <>
      {/* Include the Navigator navbar */}
      <Navigator />

      <AdopterAdoptionsWrapper>
        <h1>Adopter Adoptions</h1>
        <p>Here are the details of the pets you have ordered:</p>

        <div className="pet-list">
          {orderedPets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <h2>{pet.name}</h2>
              <p>
                <strong>Type:</strong> {pet.type}
              </p>
              <p>
                <strong>Breed:</strong> {pet.breed}
              </p>
              <p>
                <strong>Shelter:</strong> {pet.shelter}
              </p>
              <p>
                <strong>Status:</strong> {pet.status}
              </p>

              {/* Payment and Contract Buttons */}
              {pet.status === "Approved" && (
                <div className="button-group">
                  {/* Proceed to Payment Button */}
                  {!isPaymentDone && (
                    <button
                      className="payment-button"
                      onClick={() => handlePayment(pet.id)}
                    >
                      Proceed to Payment
                    </button>
                  )}

                  {/* Contract Button (enabled only after payment) */}
                  <button
                    className="contract-button"
                    onClick={() => handleContract(pet.id)}
                    disabled={!isPaymentDone} // Disable until payment is done
                  >
                    Sign Contract
                  </button>
                </div>
              )}

              {/* View Contract Button (shown only after both parties sign) */}
              {isContractSignedByAdopter && (
                <button
                  className="view-contract-button"
                  onClick={() => handleViewContract(pet.id)}
                >
                  View Contract
                </button>
              )}
            </div>
          ))}
        </div>
      </AdopterAdoptionsWrapper>
    </>
  );
};

// Styled Components
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