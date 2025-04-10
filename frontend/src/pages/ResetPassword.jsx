import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usersresetAPI } from "../services/userServices";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: usersresetAPI,
    mutationKey: ["reset-password"],
  });

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      await mutateAsync({
        email: email,
        token: token,
        newPassword: password,
      });
      setMessage("Password successfully reset! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Failed to reset password. Please try again.");
    }
  };

  return (
    <ResetPasswordWrapper>
      <div className="form-container">
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>

        {message ? (
          <div className="success-message">{message}</div>
        ) : (
          <form onSubmit={handleReset}>
            <div className="input-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={isPending}>
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
            {errorMsg && (
              <p className="error-message">{errorMsg}</p>
            )}
          </form>
        )}
      </div>
    </ResetPasswordWrapper>
  );
};

const ResetPasswordWrapper = styled.div`
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
    width: 30%;
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
        text-align: center;
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

export default ResetPassword;
