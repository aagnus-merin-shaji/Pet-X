import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { adminadoptionsAPI } from "../services/adminServices";

// Styled Components (reused from Adoptions with minimal changes)
const ApprovedAdoptionsContainer = styled.div`
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
  background-color: #d4edda;
  color: #155724;
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
`;

const ApprovedAdoptionsView = () => {
  const navigate = useNavigate();
  const [approvedRequests, setApprovedRequests] = useState([]);

  const { data, isLoading } = useQuery({
      queryFn: adminadoptionsAPI,
      queryKey: ["approvedrequest-view"],
    });
    console.log(data);
  useEffect(() => {
    if (data?.adoption) {
      // Filter for only Approved requests
      const approved = data.adoption.filter(
        (request) => request.adoptionStatus === "Approved"
      );
      setApprovedRequests(approved);
    }
  }, [data]);

console.log(approvedRequests);

  // Handle contract button click
  const handleContract = (petId) => {
    navigate("/shelter/contract", { state: { petId } });
  };

  return (
    <ApprovedAdoptionsContainer>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AdoptionList>
          {approvedRequests.length > 0 ? (
            approvedRequests.map((request) => (
              <AdoptionCard key={request._id}>
                <h2>{request.animalId?.name || "Unknown Pet"}</h2>
                <p>
                  <strong>Breed:</strong> {request.animalId?.breed || "N/A"}
                </p>
                <p>
                  <strong>Applicant Name:</strong>{" "}
                  {request.applicantId?.username || "N/A"}
                </p>
                <p>
                  <strong>Applicant Email:</strong>{" "}
                  {request.applicantId?.email || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <StatusBadge>{request.adoptionStatus}</StatusBadge>
                </p>
              </AdoptionCard>
            ))
          ) : (
            <p>No approved adoption requests found.</p>
          )}
        </AdoptionList>
      )}
    </ApprovedAdoptionsContainer>
  );
};

export default ApprovedAdoptionsView;