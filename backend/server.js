require("dotenv").config();
const express = require("express");

const cors = require("cors");
const path = require("path");
const { appendFile } = require("fs");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware to handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/taks", taskRoutes);
// app.use("/api/reports", reportRoutes);

// Start server
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Connect to the database first
    await connectDB();
    console.log("Database connected successfully");

    // Start the server only after DB is connected
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
