require("dotenv").config(); // Load environment variables

// Import required modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // MongoDB connection function
const authMiddleware = require("./middleware/authMiddleware"); // Import Auth Middleware

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const examRoutes = require("./routes/examRoutes");


// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow frontend ports
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Connect to MongoDB
connectDB();

// Test API - Check if backend is working
app.get("/", (req, res) => {
  res.send("SmartGrader Backend is Running!");
});

// Add this route to your server.js file
app.get("/api/admin/classes", (req, res) => {
  // Example: Fetch classes from a database or return mock data
  const classes = [
    { id: 1, name: "Class A" },
    { id: 2, name: "Class B" },
  ];
  res.status(200).json(classes);
});

// Use Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/exams", examRoutes); // Exam routes 

// Secure Exam Submission Route
app.post("/api/submissions/submit", authMiddleware, (req, res) => {
  const { studentId, examId, answers } = req.body;
  console.log("Received Submission:", studentId, examId, answers);
  res.status(200).json({ message: " Exam submitted successfully!" });
});

// Error Handling Middleware (catch-all for errors)
app.use((err, req, res, next) => {
  console.error(" Error:", err.stack);
  res.status(500).json({ message: "Something went wrong on the server!" });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
