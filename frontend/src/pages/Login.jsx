import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { usersloginAPI } from "../services/userServices"; // Ensure this path is correct
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { loginUserAction } from "../redux/userSlice"

const Login = () => {
  const navigate = useNavigate();

  // Mutation for logging in a user
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: usersloginAPI, // Ensure this function is defined in userServices.js
    mutationKey: ["login-user"],
  });

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
  });
    
const dispatch = useDispatch();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const token = await mutateAsync(values);   
sessionStorage.setItem("userToken", token);
const decodedData = jwtDecode(token);
dispatch(loginUserAction(decodedData));

          resetForm(); // Reset the form
          console.log(decodedData.role);
          
          // Role-based navigation
          if (decodedData.role === "shelter") {
            navigate("/shelterhome");
          } else if (decodedData.role === "individual") {
            navigate("/home");
          } else if (decodedData.role === "admin") {
            navigate("/admin/dashboard");
          }else
          {
            navigate("/clinic/home")
          }
        } 
  });

  return (
    <PageWrapper>
      <LoginWrapper>
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
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

          {/* Display Mutation Error */}
          {isError && <ErrorMessage>{error.message}</ErrorMessage>}

          <button type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button>
          
        </form>
        <div>
          Don't have an account?{" "}
          <div className="register-options">
            <Link to="/register">Register as Adopter</Link>
            <Link to="/shelter-register">Register as Shelter</Link>
          </div>
        </div>
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </LoginWrapper>
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

const LoginWrapper = styled.div`
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

  .register-options {
    display: flex;
    justify-content: space-between;
    gap: 2rem; /* Add space between the links */
    margin-top: 1rem;

    a {
      color: hsl(var(--orange));
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: left;
`;

export default Login;