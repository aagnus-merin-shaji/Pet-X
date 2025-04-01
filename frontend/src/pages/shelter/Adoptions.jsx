import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { adoptionaddAPI, adoptionviewallAPI } from "../../services/adoptionServices";
import { useMutation, useQuery } from "@tanstack/react-query";

const Adoptions = () => {
  const navigate = useNavigate();
 
 const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: adoptionaddAPI,
    mutationKey: ["adoption-request"],
  });
  const { data, isLoading } = useQuery({
    queryFn: adoptionviewallAPI,
    queryKey: ['request-view']
});

const [adoptionRequests, setAdoptionRequests] = useState([]);

useEffect(() => {
    if (data?.applications) {
        setAdoptionRequests(data.applications);
    }
}, [data]); // Runs whenever `data` changes

console.log(adoptionRequests);


  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(""); // "accept" or "reject"

  // Handle adoption request status (Accept/Reject)
  const handleAdoptionStatus = async (id, status) => {
    try {
      // Call the API mutation
      await mutateAsync({ requestId: id, status });
      
      // Update local state only after successful API call
      
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update adoption status:", error);
      // Optionally show error to user
    }
  };

  // Handle contract button click
  const handleContract = (petId) => {
    console.log(`Proceeding to contract signing for pet ID: ${petId}`);
    navigate("/contract-sign?signer=shelter"); // Redirect to Contract Signing page for shelter
  };

  // Open confirmation modal
  const openConfirmationModal = (id, type) => {
    setSelectedRequestId(id);
    setActionType(type);
    setShowModal(true);
  };

  return (
    <AdoptionsContainer>
      <h1>Adoption Requests</h1>
      <p>Manage adoption requests for animals in the shelter.</p>

      {/* Adoption Requests List */}
      <AdoptionList>
        {adoptionRequests?.map((request) => (
          <AdoptionCard key={request._id}>
            <h2>{request.animalId?.name}</h2>
            <p>
              <strong>Breed:</strong> {request.animalId?.breed}
            </p>
            <p>
              <strong>Applicant Name:</strong> {request.applicantId.username}
            </p>
            <p>
              <strong>Applicant Email:</strong> {request.applicantId.email}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <StatusBadge status={request.adoptionStatus}>{request.adoptionStatus}</StatusBadge>
            </p>

            {/* Accept, Reject, and Contract Buttons */}
            <ButtonGroup>
              <AcceptButton
                onClick={() => openConfirmationModal(request.id, "accept")}
                disabled={request.adoptionStatus !== "Pending"}
              >
                Accept
              </AcceptButton>
              <RejectButton
                onClick={() => openConfirmationModal(request.id, "reject")}
                disabled={request.adoptionStatus !== "Pending"}
              >
                Reject
              </RejectButton>
              <ContractButton
                onClick={() => handleContract(request.id)}
                disabled={request.adoptionStatus !== "Accepted"}
              >
                Sign Contract
              </ContractButton>
            </ButtonGroup>
          </AdoptionCard>
        ))}
      </AdoptionList>

      {/* Confirmation Modal */}
      {showModal && (
        <ModalOverlay>
          <Modal>
            <h3>
              Are you sure you want to {actionType} this adoption request?
            </h3>
            <p>This action cannot be undone.</p>
            <ModalButtonGroup>
            <button
    onClick={async () => {
      await handleAdoptionStatus(
        selectedRequestId, 
        actionType === "accept" ? "Accepted" : "Rejected"
      );
    }}
    disabled={isPending}
  >
    {isPending ? "Processing..." : "Confirm"}
  </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </ModalButtonGroup>
          </Modal>
        </ModalOverlay>
      )}
    </AdoptionsContainer>
  );
};

// Styled Components
const AdoptionsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AdoptionList = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const AdoptionCard = styled.div`
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
    color: #333;
  }

  p {
    margin: 0.5rem 0;
    color: #555;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: ${({ status }) =>
    status === "Accepted"
      ? "#d4edda"
      : status === "Rejected"
      ? "#f8d7da"
      : "#fff3cd"};
  color: ${({ status }) =>
    status === "Accepted"
      ? "#155724"
      : status === "Rejected"
      ? "#721c24"
      : "#856404"};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const AcceptButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const RejectButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #c82333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ContractButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #3182ce;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;

  h3 {
    margin-top: 0;
  }

  p {
    margin-bottom: 1.5rem;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:first-child {
      background-color: #28a745;
      color: white;

      &:hover {
        background-color: #218838;
      }
    }

    &:last-child {
      background-color: #dc3545;
      color: white;

      &:hover {
        background-color: #c82333;
      }
    }
  }
`;

export default Adoptions;