import React, { useState } from "react";
import styled from "styled-components";
import { adminusersAPI, totalanimalAPI, totalusersAPI } from "../services/adminServices";
import { useQuery } from "@tanstack/react-query";
import Logout from "./Logout";

// Styled Components
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
  background-color: #1f2937;
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
      color: #60a5fa;
    }

    &.active {
      color: #60a5fa;
    }
  }

  ul ul {
    margin-left: 1rem;
    margin-top: 0.5rem;

    button {
      color: #d1d5db;
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
        background-color: #d1d5db;
      }

      &:last-child {
        background-color: #ef4444;
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

const UsersContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-top: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    background-color: #f9fafb;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  tr:hover {
    background-color: #f9fafb;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;

  &.active {
    background-color: #dcfce7;
    color: #166534;
  }

  &.inactive {
    background-color: #fee2e2;
    color: #991b1b;
  }

  &.pending {
    background-color: #fef3c7;
    color: #92400e;
  }
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  margin-right: 0.5rem;
  cursor: pointer;

  &.edit {
    background-color: #dbeafe;
    color: #1e40af;
    border: 1px solid #bfdbfe;
  }

  &.delete {
    background-color: #fee2e2;
    color: #b91c1c;
    border: 1px solid #fecaca;
  }

  &.role {
    background-color: #e0e7ff;
    color: #4338ca;
    border: 1px solid #c7d2fe;
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 1.5rem;

  input {
    flex: 1;
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    margin-right: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;

  div {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    background-color: white;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.active {
      background-color: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }
  }
`;

const UsersView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const { data, isLoading, isError, error } = useQuery({
    queryFn: adminusersAPI,
    queryKey: ['users-view']
});
console.log(data);



  const filteredUsers = data
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditUser = (userId) => {
    
  };

  const handleDeleteUser = (userId) => {
    
  };

  const handleChangeRole = (userId) => {
    
  };

  return (
    <UsersContainer>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers?.length > 0 ? (
            currentUsers?.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <StatusBadge className={user.status?.toLowerCase()}>
                    {user.status}
                  </StatusBadge>
                </td>
                <td>{user.registered}</td>
                <td>{user.pets}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "2rem" }}>
                No users found matching your search criteria
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {filteredUsers?.length > 0 && (
        <Pagination>
          <div>
            Showing {indexOfFirstUser + 1} to{" "}
            {Math.min(indexOfLastUser, filteredUsers?.length)} of{" "}
            {filteredUsers?.length} users
          </div>
          <div>
            
          </div>
        </Pagination>
      )}
    </UsersContainer>
  );
};

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const { data:totalusers} = useQuery({
    queryFn: totalusersAPI,
    queryKey: ['view-totalusers']
  });
  console.log(totalusers);

  const { data:totalanimal} = useQuery({
    queryFn: totalanimalAPI,
    queryKey: ['view-totalanimal']
  });
  
  
const total=totalusers?.length
const pets=totalanimal?.animals?.length
console.log(totalanimal);
  const dashboardStats = [
    { title: "Shelter Pets",  icon: "🐾",count:pets },
    { title: "Lost Pet Alerts", count: 45, icon: "🔔" },
    { title: "Adoption Requests", count: 120, icon: "🏡" },
    { title: "Total Users", icon: "👥" ,count:total},
    { title: "Monthly Analytics", count: "View Report", icon: "📊" },
  ];

  const menuItems = [
    { title: "Dashboard" },
    { title: "Users", subItems: ["View Users",] },
    { title: "Lost Pets", subItems: ["Reported Cases", "Found Pets"] },
    { title: "Adoptions", subItems: ["Approved Requests"] },
    { title: "Reports", subItems: ["View Reports"] },
  ];

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>PET-X</SidebarTitle>
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
                    }
                  }}
                >
                  {item.title}
                </button>
                {item.subItems && openDropdown === index && (
                  <ul>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <button onClick={() => setSelectedMenu(subItem)}>
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

      <MainContent>
        <Header>
          <h1>{selectedMenu}</h1>
          <div>
            <button>🔍 Search Reports</button>
            <Logout/> 
          </div>
        </Header>

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

        {(selectedMenu === "Users" || selectedMenu === "View Users") && (
          <UsersView />
        )}
      </MainContent>
    </Container>
  );
};

export default AdminDashboard;