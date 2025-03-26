require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./database/connectDB");
const cookieParser = require("cookie-parser")
const errorHandler = require("./middlewares/errorHandler")
const router = require("./routes");

const app = express();
connectDB()
// Alternatively, enable CORS for specific origins
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin// Allow specific HTTP methods
    credentials: true, // Allow cookies and credentials
    optionsSuccessStatus:200
  })
);
app.use(cookieParser())

app.use(router)


app.use(errorHandler)


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));