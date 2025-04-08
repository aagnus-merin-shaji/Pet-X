import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { animalbyidAPI } from "../../services/animalServices";
import { contracteditAPI } from "../../services/adoptionContractServices";

const ShelterContract = () => {
  const location = useLocation();
  const { petId } = location.state || {};

  useEffect(() => {
    console.log("Location state:", location.state);
    console.log("petId from location:", petId);
  }, [location]);

  const animalId = petId?._id;

  const { data: animal, isLoading: animalLoading, error: animalError } = useQuery({
    queryFn: () => animalbyidAPI(petId),
    queryKey: ["animal-view", petId]
  });
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: contracteditAPI,
    mutationKey: ["sign-contract"],
  });
    
  const contractTerms = `
    1. The adopter agrees to provide a safe and loving home for ${animal?.name}.
    2. The adopter agrees to cover all medical expenses for ${animal?.name}.
    3. The adopter agrees to return ${animal?.name} to the shelter if unable to care for them.
    4. The shelter agrees to provide all necessary medical records and support.
  `;

  console.log(animal);

  const handleSignContract = async () => {
    console.log("Contract signing requested (no actual changes made)");
    alert("Contract signed");
    await mutateAsync({ id: petId });
  };

  return (
    <ContractViewWrapper>
      <h1>Adoption Contract </h1>
      <p>This contract has been signed by the adopter: <strong>{animal?.adopterId.username || "Unknown Adopter"}</strong>.</p>

      <section>
        <h2>Pet Details</h2>
        <ul>
          <li><strong>Name:</strong> {animal?.name}</li>
          <li><strong>Breed:</strong> {animal?.breed}</li>
          <li><strong>Age:</strong> {animal?.age}</li>
          <li><strong>Adoption Fee:</strong> {animal?.adoptionFee}</li>
        </ul>
      </section>

      <section>
        <h2>Contract Terms</h2>
        <pre>{contractTerms}</pre>
      </section>

      <section>
        <h2>Adopter Information</h2>
        <ul>
          <li><strong>Adopter Name:</strong> {animal?.adopterId.username || "Not provided"}</li>
          <li><strong>Date Signed:</strong> {animal?.signatureDate}</li>
          <li><strong>Contract Status:</strong> {animal?.adopterId.status || "Pending"}</li>
        </ul>
      </section>

      <SignButton onClick={handleSignContract}>
        Sign Contract
      </SignButton>
    </ContractViewWrapper>
  );
};

// Styled Components remain unchanged
const ContractViewWrapper = styled.div`
  padding: 3rem;
  max-width: 900px;
  margin: 2rem auto;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  position: relative;

  h1 {
    font-size: 2.5rem;
    color: #1e293b;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 700;
    background: linear-gradient(90deg, #34d399, #facc15);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.5px;
  }

  h2 {
    font-size: 1.75rem;
    color: #1e293b;
    margin-bottom: 1.25rem;
    font-weight: 600;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(90deg, #34d399, #facc15);
      border-radius: 3px;
    }
  }

  p {
    font-size: 1.2rem;
    color: #475569;
    text-align: center;
    margin-bottom: 2.5rem;
    line-height: 1.6;

    strong {
      color: #1e293b;
      font-weight: 600;
    }
  }

  section {
    margin-bottom: 3rem;
    background: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 1.1rem;
        color: #475569;
        margin-bottom: 0.75rem;
        line-height: 1.7;

        strong {
          color: #1e293b;
          font-weight: 600;
        }
      }
    }

    pre {
      background-color: #f9fafb;
      padding: 1.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      color: #1f2937;
      white-space: pre-wrap;
      line-height: 1.8;
    }
  }
`;

const SignButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(90deg, #34d399, #10b981);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(90deg, #10b981, #34d399);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export default ShelterContract;