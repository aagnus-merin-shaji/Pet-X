import React from "react";
import styled from "styled-components";

const Reports = () => {
  // Sample data for the shelter report
  const reportData = {
    totalAnimals: 50,
    adoptedAnimals: 30,
    pendingAdoptions: 10,
    availableAnimals: 10,
    recentAdoptions: [
      { id: 1, petName: "Bella", applicantName: "John Doe", date: "2023-10-01" },
      { id: 2, petName: "Max", applicantName: "Jane Smith", date: "2023-10-05" },
    ],
  };

  return (
    <ReportsContainer>
      <h1>Shelter Reports</h1>
      <p>View reports and analytics for the shelter.</p>

      {/* Key Metrics */}
      <MetricsGrid>
        <MetricCard>
          <h3>Total Animals</h3>
          <p>{reportData.totalAnimals}</p>
        </MetricCard>
        <MetricCard>
          <h3>Adopted Animals</h3>
          <p>{reportData.adoptedAnimals}</p>
        </MetricCard>
        <MetricCard>
          <h3>Pending Adoptions</h3>
          <p>{reportData.pendingAdoptions}</p>
        </MetricCard>
        <MetricCard>
          <h3>Available Animals</h3>
          <p>{reportData.availableAnimals}</p>
        </MetricCard>
      </MetricsGrid>

      {/* Recent Adoptions Table */}
      <RecentAdoptions>
        <h2>Recent Adoptions</h2>
        <Table>
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Applicant Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reportData.recentAdoptions.map((adoption) => (
              <tr key={adoption.id}>
                <td>{adoption.petName}</td>
                <td>{adoption.applicantName}</td>
                <td>{adoption.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </RecentAdoptions>
    </ReportsContainer>
  );
};

// Styled Components
const ReportsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const MetricCard = styled.div`
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin-top: 0;
    color: #333;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #28a745; // Green color for positive metrics
  }
`;

const RecentAdoptions = styled.div`
  margin-top: 3rem;

  h2 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f7f7f7;
    font-weight: bold;
    color: #333;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

export default Reports;