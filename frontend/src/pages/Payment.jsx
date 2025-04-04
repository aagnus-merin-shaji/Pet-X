import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { paymentcheckoutAPI } from "../services/paymentServices";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { adoptionId, amount } = location.state || {};
    console.log("Payment details:", { adoptionId, amount });

    const [formData, setFormData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [errors, setErrors] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: paymentcheckoutAPI,
        mutationKey: ["payment-add"],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateCardNumber = (number) => {
        // Remove spaces and check if it's 13-19 digits (common card lengths)
        const cleaned = number.replace(/\s/g, "");
        if (!/^\d{13,19}$/.test(cleaned)) return "Card number must be 13-19 digits";
        
        // Basic Luhn algorithm check
        let sum = 0;
        let isEven = false;
        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned[i], 10);
            if (isEven) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0 ? "" : "Invalid card number";
    };

    const validateExpiryDate = (date) => {
        if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(date)) {
            return "Use MM/YY format (e.g., 12/25)";
        }
        const [month, year] = date.split("/").map(Number);
        const currentDate = new Date();
        const expiryDate = new Date(2000 + year, month - 1); // Assuming 20XX years
        return expiryDate > currentDate ? "" : "Card has expired";
    };

    const validateCvv = (cvv) => {
        return /^\d{3,4}$/.test(cvv) ? "" : "CVV must be 3 or 4 digits";
    };

    const validateForm = () => {
        const newErrors = {
            cardNumber: validateCardNumber(formData.cardNumber),
            expiryDate: validateExpiryDate(formData.expiryDate),
            cvv: validateCvv(formData.cvv),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const paymentData = { id: adoptionId }; // Only sending adoptionId as per backend
                const response = await mutateAsync(paymentData);
                console.log("Payment successful:", response);
                navigate("/adopter-adoptions"); // Redirect on success
            } catch (error) {
                console.error("Payment failed:", error);
                setErrors((prev) => ({ ...prev, general: "Payment processing failed" }));
            }
        }
    };

    return (
        <PaymentWrapper>
            <Card>
                <h1>Complete Your Payment</h1>
                <p>Amount: ${amount || "N/A"}</p>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <label>Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                        />
                        {errors.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <label>Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleChange}
                        />
                        {errors.expiryDate && <ErrorMessage>{errors.expiryDate}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <label>CVV</label>
                        <input
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleChange}
                        />
                        {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
                    </InputGroup>
                    {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
                    <SubmitButton type="submit" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Pay Now"}
                    </SubmitButton>
                </form>
            </Card>
        </PaymentWrapper>
    );
};

// Styled Components
const PaymentWrapper = styled.div`
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const Card = styled.div`
    background-color: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;

    h1 {
        font-size: 1.8rem;
        color: #2d3748;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
        color: #4a5568;
        margin-bottom: 1.5rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
`;

const InputGroup = styled.div`
    text-align: left;

    label {
        font-size: 1rem;
        color: #2d3748;
        margin-bottom: 0.5rem;
        display: block;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #cbd5e0;
        border-radius: 8px;
        font-size: 1rem;
        color: #2d3748;
        outline: none;
        transition: border-color 0.3s ease;

        &:focus {
            border-color: #48bb78;
        }
    }
`;

const ErrorMessage = styled.span`
    color: #e53e3e;
    font-size: 0.85rem;
    margin-top: 0.25rem;
    display: block;
`;

const SubmitButton = styled.button`
    padding: 0.75rem;
    background-color: #48bb78;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #38a169;
        transform: translateY(-2px);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
    }
`;

export default Payment;