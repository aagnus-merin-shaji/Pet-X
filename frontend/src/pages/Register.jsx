import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { usersregisterAPI } from "../services/userServices"; // Ensure this path is correct

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mutation for registering a user
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: usersregisterAPI, // Ensure this function is defined in userServices.js
    mutationKey: ["register-user"],
  });

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(5, "Username must be at least 5 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "individual", // Default role for new users
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = await mutateAsync(values);   
localStorage.setItem("userToken", token);
const decodedData = jwtDecode(token);
dispatch(loginUserAction(decodedData));

          resetForm(); // Reset the form
          navigate("/home"); // Redirect to home page
        } 
      catch (error) {
        console.error("Signup Error:", error.response ? error.response.data : error.message); // Log detailed error
        alert("An error occurred during registration. Please try again.");
      }
    },
  });

  return (
    <PageWrapper>
      <RegisterWrapper>
        <h1>Adopter Register</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Username Field */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.username && formik.errors.username && (
              <ErrorMessage>{formik.errors.username}</ErrorMessage>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
            )}
          </div>

          {/* Display Mutation Error */}
          {isError && <ErrorMessage>{error.message}</ErrorMessage>}

          <button type="submit" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </RegisterWrapper>
    </PageWrapper>
  );
};

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/src/assets/background14.jpg") no-repeat center center fixed; /* Add your background image path here */
  background-size: cover; /* Ensure the image covers the entire page */
`;

const RegisterWrapper = styled.div`
  max-width: 400px; /* Adjusted to fit the larger padding */
  margin: 7rem; /* 10rem margin on all sides */
  padding: 7rem; /* 10rem padding on all sides */
  border: 1px solid hsl(var(--divider));
  border-radius: 1rem;
  background: hsla(0, 0.00%, 100.00%, 0.32); /* Semi-transparent white background for the form */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 2.5rem; /* Increased font size for better proportion */
  }

  .form-group {
    margin-bottom: 1.5rem; /* Slightly increased margin for better spacing */

    label {
      display: block;
      margin-bottom: 0.75rem; /* Increased margin for better spacing */
      font-size: 1.25rem; /* Increased font size for better proportion */
    }

    input {
      width: 100%;
      padding: 0.75rem; /* Increased padding for better proportion */
      border: 1px solid hsl(var(--divider));
      border-radius: 0.5rem;
      font-size: 1rem; /* Adjusted font size */
    }
  }

  button {
    width: 100%;
    padding: 1rem; /* Increased padding for better proportion */
    background-color: hsl(var(--orange));
    color: hsl(var(--white));
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.25rem; /* Increased font size for better proportion */
    font-weight: 700;

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      background-color: hsl(var(--orange), 0.5);
      cursor: not-allowed;
    }
  }

  p {
    text-align: center;
    margin-top: 1.5rem; /* Increased margin for better spacing */
    font-size: 1.25rem; /* Increased font size for better proportion */

    a {
      color: hsl(var(--orange));
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem; /* Increased font size */
  margin-bottom: 1.5rem; /* Increased margin */
  text-align: center;
`;

export default Register;