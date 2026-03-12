const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

// Use auth routes
app.use("/api/auth", authRoutes);

// Use admin routes
app.use("/api/admin", adminRoutes);

const connectDB = require('./config/db');
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-in-production";

// Public API endpoint to get courses (from MongoDB)
const Course = require('./models/Course');
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching public courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root route to fix "Cannot GET /" on Render deployment
app.get('/', (req, res) => {
  res.json({
    message: 'API Server is running!',
    endpoints: {
      courses: '/api/courses',
      auth: '/api/auth (signup, login)',
      admin: '/api/admin (protected)'
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();


