import React, { useState } from "react";  // Add useState import
import styled from "styled-components";
import { usersforgotAPI } from "../services/userServices";
import { useMutation } from "@tanstack/react-query";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");  // Add state for email

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: usersforgotAPI,
    mutationKey: ["forgot-password"],  // Changed mutationKey to be more specific
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync({ email: email });  // Send email as an object
      alert("Password reset link sent to your email!");
    } catch (err) {
      console.error("Reset password error:", err);
      alert("Failed to send reset link. Please try again.");
    }
  };

  return (
    <ForgotPasswordWrapper>
      <div className="form-container">
        <h2>Forgot Password</h2>
        <p>Enter your email address to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}  // Bind value to state
              onChange={(e) => setEmail(e.target.value)}  // Update state on change
              required
            />
          </div>
          <button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Reset Password"}
          </button>
          {isError && (
            <p style={{ color: "red" }}>
              {error?.message || "An error occurred"}
            </p>
          )}
        </form>
      </div>
    </ForgotPasswordWrapper>
  );
};

// Styled Components remain unchanged
const ForgotPasswordWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url("/src/assets/background14.jpg");
  background-size: cover;
  background-position: center;
  padding: 2rem;

  .form-container {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;

    h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      color: #666;
      margin-bottom: 2rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        label {
          font-size: 1rem;
          color: #444;
          font-weight: 500;
        }

        input {
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.3s ease;

          &:focus {
            border-color: #007bff;
          }
        }
      }

      button {
        padding: 0.75rem;
        background-color: rgb(253, 157, 3);
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #0056b3;
        }

        &:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      }
    }
  }
`;

export default ForgotPassword;