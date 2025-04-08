import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
  const { logoutUser } = useGlobalContext(); // Access logout function from context
  const navigate = useNavigate(); // For navigation
const dispatch=useDispatch()
  const handleLogout = () => {
    logoutUser(); // Clear context
    dispatch(logoutAction()); // Clear Redux state
    sessionStorage.clear(); // Clear all local storage
    navigate("/login", { replace: true }); // Redirect and replace history
  };

  return (
    <LogoutWrapper>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </LogoutWrapper>
  );
};

// Styled Components for Logout
const LogoutWrapper = styled.div`
  .logout-btn {
    background-color:yellow;
    color: hsl(var(--black));
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color:pink;
    }
  }
`;

export default Logout;