import React, { useState } from "react";
import styled from "styled-components";
import { usersforgotAPI } from "../services/userServices";
import { useMutation } from "@tanstack/react-query";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: usersforgotAPI,
    mutationKey: ["forgot-password"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync({ email: email });
      setTimeout(() => {
        setMessage(`If an account with ${email} exists, a reset link has been sent.`);
      }, 1000);
    } catch (err) {
      console.error("Reset password error:", err);
    }
  };

  return (
    <ForgotPasswordWrapper>
      <div className="form-container">
        <h2>Forgot Password</h2>
        <p>Enter your email address to reset your password.</p>

        {message ? (
          <div className="success-message">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={isPending}>
              {isPending ? "Sending..." : "Reset Password"}
            </button>
            {isError && (
              <p className="error-message">
                {error?.message || "An error occurred"}
              </p>
            )}
          </form>
        )}
      </div>
    </ForgotPasswordWrapper>
  );
};

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

      .error-message {
        color: red;
        font-size: 0.9rem;
      }
    }

    .success-message {
      background-color: #e6ffed;
      color: #228b22;
      border: 1px solid #b5e2b5;
      padding: 1rem;
      border-radius: 8px;
      font-weight: 500;
    }
  }
`;

export default ForgotPassword;
