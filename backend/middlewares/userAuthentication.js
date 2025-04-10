const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const userAuthentication = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers["authorization"]?.split(" ")[1];
        
        // Check if token exists
        if (!token) {
            throw new Error("User not authenticated");
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Attach user info to request object
        req.user = {
            email: decoded.email,
            id: decoded.id
        };

        // Check if user exists and is not blocked
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error("User not found");
        }
        
        if (user.blocked) {
            throw new Error("User blocked");
        }

        // Proceed to next middleware
        next();
    } catch (error) {
        // Handle different types of errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        
        // Handle custom errors
        return res.status(401).json({ 
            message: error.message || "Authentication failed" 
        });
    }
};

module.exports = userAuthentication;