import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const ContractSign = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const signer = queryParams.get("signer"); // "adopter" or "shelter"

  // State for signature
  const [signature, setSignature] = useState("");

  // Mock pet details (replace with actual data from your backend or state)
  const petDetails = {
   
  };

  // Mock contract terms (replace with actual terms)
  const contractTerms = `
    1. The adopter agrees to provide a safe and loving home for ${petDetails.name}.
    2. The adopter agrees to cover all medical expenses for ${petDetails.name}.
    3. The adopter agrees to return ${petDetails.name} to the shelter if unable to care for them.
    4. The shelter agrees to provide all necessary medical records and support.
  `;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signature) {
      alert("Please enter your signature.");
      return;
    }

    console.log(`Contract signed by ${signer} with signature: ${signature}`);
    alert(`Contract signed successfully by ${signer}!`);

    // Redirect based on the signer
    navigate(signer === "adopter" ? "/adopter-adoptions" : "/shelter/adoptions");
  };

  return (
    <ContractSignWrapper>
      <h1>Pet Adoption Contract</h1>
      <p>You are signing the contract as the {signer}.</p>

      {/* Pet Details */}
      <section>
        <h2>Pet Details</h2>
        <ul>
          <li><strong>Name:</strong> {petDetails.name}</li>
          <li><strong>Type:</strong> {petDetails.type}</li>
          <li><strong>Breed:</strong> {petDetails.breed}</li>
          <li><strong>Age:</strong> {petDetails.age}</li>
          <li><strong>Shelter:</strong> {petDetails.shelter}</li>
          <li><strong>Adoption Fee:</strong> {petDetails.adoptionFee}</li>
        </ul>
      </section>

      {/* Contract Terms */}
      <section>
        <h2>Contract Terms</h2>
        <pre>{contractTerms}</pre>
      </section>

      {/* Signature Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Enter your full name as a signature:
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Your full name"
            required
          />
        </label>
        <button type="submit">Sign Contract</button>
      </form>
    </ContractSignWrapper>
  );
};

// Styled Components
const ContractSignWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
  }

  h2 {
    font-size: 1.5rem;
    color: #444;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #666;
    text-align: center;
    margin-bottom: 2rem;
  }

  section {
    margin-bottom: 2rem;

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 1rem;
        color: #666;
        margin-bottom: 0.5rem;
      }
    }

    pre {
      background-color: #fff;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.9rem;
      color: #555;
      white-space: pre-wrap;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      font-size: 1rem;
      color: #666;
    }

    input {
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      margin-top: 0.5rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      background-color: #48bb78;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #38a169;
      }
    }
  }
`;

export default ContractSign;