import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../icons"; // Assuming you have a Logo component

// Styled Components
const NavWrapper = styled.header`
  position: relative;
  padding: 2.4rem;
  border-bottom: 1px solid hsl(var(--divider));

  img,
  svg {
    display: block;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  .menu-btn {
    display: block;
    background: none;
    border: none;
    cursor: pointer;

    @media only screen and (min-width: 768px) {
      display: none;
    }
  }

  .logo {
    margin-right: 3.2rem;
  }

  .nav-links {
    display: none;

    @media only screen and (min-width: 768px) {
      display: flex;
      gap: 3.2rem;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        position: relative;

        a {
          text-decoration: none;
          font-size: 1.5rem;
          text-transform: capitalize;
          color: hsl(var(--dark-grayish-blue));
          transition: color 0.3s ease;

          &:hover {
            color: hsl(var(--black));
          }
        }
      }
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  .search-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .notification-container {
    position: relative;
  }

  .notification-btn {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
      fill: none;
      stroke: hsl(var(--black));
    }

    .notification-badge {
      user-select: none;
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
      background-color: hsl(var(--orange));
      font-weight: 700;
      color: hsl(var(--white));
      border-radius: 50%;
      padding: 0.2rem 0.6rem;
      font-size: 0.8rem;
    }
  }

  .cart-btn {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;

    svg,
    path {
      fill: hsl(var(--black));
    }

    span {
      user-select: none;
      position: absolute;
      top: -1rem;
      right: -1rem;
      background-color: hsl(var(--orange));
      font-weight: 700;
      color: hsl(var(--white));
      border-radius: 50%;
      padding: 0.3rem 0.8rem;
      font-size: 1.1rem;
    }
  }

  .avatar-btn {
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 50%;
    border: 2px solid transparent;
    background: none;
    cursor: pointer;
    transition: border-color 0.3s ease;

    img {
      width: 100%;
      border-radius: 50%;
    }

    &:hover {
      border-color: hsl(var(--orange));
    }
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid hsl(var(--divider));
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 200px;

  &:focus {
    outline: none;
    border-color: yellow;
  }
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: yellow;
  color: hsl(var(--black));
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
    background-color:lightgreen;
  }
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: yellow;
  color: hsl(var(--black));
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
    background-color: red;
  }
`;

const ClinicNavbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchQuery, setSearchQuery] = React.useState("");

  // Handle logout button click
  const handleLogout = () => {
    // Add logout logic here (e.g., clear user session)
    navigate("/login"); // Redirect to login page after logout
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`); // Navigate to search results page
    }
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <NavWrapper>
      <nav>
        <NavLeft>
          <Logo />
          <ul className="nav-links">
            <li>
              <Link to="/clinic/home">Home</Link>
            </li>
            <li>
              <Link to="/clinic/animals">Animals</Link>
            </li>
            <li>
              <Link to="/clinic/services">Services</Link>
            </li>
            <li>
              <Link to="/clinic/contact">Contact</Link>
            </li>
          </ul>
        </NavLeft>
        <NavRight>
          <div className="search-container">
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <SearchButton onClick={handleSearch}>Search</SearchButton>
          </div>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavRight>
      </nav>
    </NavWrapper>
  );
};

export default ClinicNavbar;