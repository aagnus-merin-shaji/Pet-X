import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { animalbyidAPI } from "../services/animalServices";
import {  contractaddAPI, } from "../services/adoptionContractServices";

const ContractSign = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { petId } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const [signer, setSigner] = useState("");

  useEffect(() => {
    console.log("Location state:", location.state);
    console.log("petId from location:", petId);
  }, [location]);
  const id = petId?._id;

  const { data: animal, isLoading, error } = useQuery({
    queryFn: () => animalbyidAPI(id),
    queryKey: ["contract-view", petId],
    enabled: !!petId,
  });
  
  

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: contractaddAPI,
    mutationKey: ["contract"],
  });

  const contractTerms = `
    1. The adopter agrees to provide a safe and loving home for ${animal?.name}.
    2. The adopter agrees to cover all medical expenses for ${animal?.name}.
    3. The adopter agrees to return ${animal?.name} to the shelter if unable to care for them.
    4. The shelter agrees to provide all necessary medical records and support.
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signer) {
      alert("Please enter your signature.");
      return;
    }
    await mutateAsync({id:animal._id});
    console.log(`Contract signed by ${signer} with signature: ${signer}`);
    alert(`Contract signed successfully by ${signer}!`);
  };  

  return (
    <ContractSignWrapper>
      <h1>Pet Adoption Contract</h1>
      <p>You are signing the contract as the {signer || "adopter"}.</p>

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

      <form onSubmit={handleSubmit}>
        <label>
          Enter your full name as a signature:
          <input
            type="text"
            value={signer}
            onChange={(e) => setSigner(e.target.value)}
            placeholder="Your full name"
            required
          />
        </label>
        <button
         type="submit"
         
         >
          Sign Contract
          </button>
      </form>
    </ContractSignWrapper>
  );
};

// Styled Components with Enhanced Styling
const ContractSignWrapper = styled.div`
  padding: 3rem; /* Increased padding for breathing room */
  max-width: 900px; /* Slightly wider container */
  margin: 2rem auto; /* Added top/bottom margin */
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); /* Subtle gradient */
  border-radius: 12px; /* Softer corners */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08); /* Softer, larger shadow */

  h1 {
    font-size: 2.5rem; /* Larger for impact */
    color: #1e293b; /* Darker, richer color */
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 700; /* Bolder for emphasis */
    background: linear-gradient(90deg, #34d399, #facc15); /* Vibrant gradient */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.5px; /* Better readability */
  }

  h2 {
    font-size: 1.75rem; /* Larger for hierarchy */
    color: #1e293b; /* Darker for emphasis */
    margin-bottom: 1.25rem;
    font-weight: 600; /* Slightly bolder */
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(90deg, #34d399, #facc15); /* Vibrant underline */
      border-radius: 3px;
    }
  }

  p {
    font-size: 1.2rem; /* Larger for readability */
    color: #475569; /* Softer gray for contrast */
    text-align: center;
    margin-bottom: 2.5rem; /* More spacing */
    line-height: 1.6; /* Improved readability */
  }

  section {
    margin-bottom: 3rem; /* More spacing between sections */
    background: #ffffff; /* White background for sections */
    padding: 2rem; /* Internal padding */
    border-radius: 10px; /* Softer corners */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Subtle shadow */
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* Stronger hover shadow */
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 1.1rem; /* Larger for readability */
        color: #475569; /* Softer gray */
        margin-bottom: 0.75rem;
        line-height: 1.7; /* Improved readability */

        strong {
          color: #1e293b; /* Darker for emphasis */
          font-weight: 600;
        }
      }
    }

    pre {
      background-color: #f9fafb; /* Lighter background */
      padding: 1.5rem; /* More padding */
      border: 1px solid #e5e7eb; /* Softer border */
      border-radius: 8px;
      font-size: 1rem; /* Larger for readability */
      color: #1f2937; /* Darker for contrast */
      white-space: pre-wrap;
      line-height: 1.8; /* Improved readability */
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* More spacing */
    background: #ffffff; /* White background */
    padding: 2rem; /* Internal padding */
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    label {
      font-size: 1.1rem; /* Larger for readability */
      color: #475569; /* Softer gray */
      font-weight: 500;
    }

    input {
      padding: 1rem; /* Larger padding */
      font-size: 1.1rem; /* Larger text */
      border: 1px solid #d1d5db; /* Softer border */
      border-radius: 8px; /* Softer corners */
      margin-top: 0.75rem;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #34d399; /* Vibrant focus color */
        outline: none;
        box-shadow: 0 0 5px rgba(52, 211, 153, 0.3); /* Subtle glow */
      }
    }

    button {
      padding: 1rem 2rem; /* Larger button */
      background: linear-gradient(90deg, #34d399, #facc15); /* Vibrant gradient */
      color: #ffffff;
      border: none;
      border-radius: 10px; /* Softer corners */
      cursor: pointer;
      font-size: 1.1rem; /* Larger text */
      font-weight: 600; /* Bolder */
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */

      &:hover {
        background: linear-gradient(90deg, #16a34a, #eab308); /* Darker gradient */
        transform: translateY(-3px); /* Slight lift */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* Stronger shadow */
      }
    }
  }
`;

export default ContractSign;