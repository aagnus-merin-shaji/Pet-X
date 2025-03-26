import React, { useState } from "react";
import styled from "styled-components";
import Adoptions from "../pages/shelter/Adoptions"; // Import Adoptions component
import Reports from "../pages/shelter/Reports"; // Import Reports component

// Styled Components (unchanged)
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.aside`
  width: 16rem;
  background-color: #1f2937; /* bg-gray-900 */
  color: white;
  padding: 1.25rem;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const SidebarNav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  button {
    width: 100%;
    text-align: left;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 0;

    &:hover {
      color: #60a5fa; /* hover:text-blue-400 */
    }

    &.active {
      color: #60a5fa; /* text-blue-400 */
    }
  }

  ul ul {
    margin-left: 1rem;
    margin-top: 0.5rem;

    button {
      color: #d1d5db; /* text-gray-300 */
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 1.5rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h1 {
    font-size: 1.875rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  div {
    display: flex;
    gap: 1rem;

    button {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;

      &:first-child {
        background-color: #d1d5db; /* bg-gray-300 */
      }

      &:last-child {
        background-color: #ef4444; /* bg-red-500 */
        color: white;
      }
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    font-size: 2.25rem;
  }

  div {
    h2 {
      font-size: 1.125rem;
      font-weight: 600;
    }

    p {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }
`;

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAdoptions, setShowAdoptions] = useState(false); // State for Adoptions visibility
  const [showReports, setShowReports] = useState(false); // State for Reports visibility

  const dashboardStats = [
    { title: "Registered Pets", count: 350, icon: "🐾" },
    { title: "Lost Pet Alerts", count: 45, icon: "🔔" },
    { title: "Adoption Requests", count: 120, icon: "🏡" },
    { title: "Emergency Reports", count: 28, icon: "⚠️" },
    { title: "Total Users", count: 980, icon: "👥" },
    { title: "Monthly Analytics", count: "View Report", icon: "📊" },
  ];

  const menuItems = [
    { title: "Dashboard" },
    { title: "Users", subItems: ["View Users", "Manage Roles"] },
    { title: "Lost Pets", subItems: ["Reported Cases", "Found Pets"] },
    { title: "Adoptions", subItems: ["Pending Requests", "Approved Requests"] },
    { title: "Reports", subItems: ["View Reports", "Analytics"] },
  ];

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <SidebarTitle>PAW GURDIAN</SidebarTitle>
        <SidebarNav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className={selectedMenu === item.title ? "active" : ""}
                  onClick={() => {
                    if (item.subItems) {
                      setOpenDropdown(openDropdown === index ? null : index);
                    } else {
                      setSelectedMenu(item.title);
                      setOpenDropdown(null);
                      setShowAdoptions(false); // Hide Adoptions
                      setShowReports(false); // Hide Reports
                    }
                  }}
                >
                  {item.title}
                </button>
                {item.subItems && openDropdown === index && (
                  <ul>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <button
                          onClick={() => {
                            setSelectedMenu(subItem);
                            if (subItem === "Pending Requests") {
                              setShowAdoptions(true); // Show Adoptions
                              setShowReports(false); // Hide Reports
                            } else if (subItem === "View Reports") {
                              setShowReports(true); // Show Reports
                              setShowAdoptions(false); // Hide Adoptions
                            } else {
                              setShowAdoptions(false); // Hide Adoptions
                              setShowReports(false); // Hide Reports
                            }
                          }}
                        >
                          {subItem}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </SidebarNav>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {/* Header */}
        <Header>
          <h1>{selectedMenu}</h1>
          <div>
            <button>🔍 Search Reports</button>
            <button>Logout</button>
          </div>
        </Header>

        {/* Conditional Rendering */}
        {selectedMenu === "Dashboard" && (
          <StatsGrid>
            {dashboardStats.map((stat, index) => (
              <StatCard key={index}>
                <span>{stat.icon}</span>
                <div>
                  <h2>{stat.title}</h2>
                  <p>{stat.count}</p>
                </div>
              </StatCard>
            ))}
          </StatsGrid>
        )}

        {/* Show Adoptions when "Pending Requests" is clicked */}
        {showAdoptions && <Adoptions />}

        {/* Show Reports when "View Reports" is clicked */}
        {showReports && <Reports />}
      </MainContent>
    </Container>
  );
};

export default AdminDashboard;