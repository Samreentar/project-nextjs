require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import MongoDB connection function

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Connect MongoDB
connectDB();

// Test API - Check if backend is working
app.get("/", (req, res) => {
  res.send("SmartGrader Backend is Running!");
});

// Routes
try {
  app.use("/api/auth", require("./routes/authRoutes")); // Corrected path for authRoutes
} catch (error) {
  console.error("Error loading authRoutes:", error.message);
}
try {
  app.use("/api/users", require("./routes/userRoutes")); // Ensure userRoutes path is correct
} catch (error) {
  console.error("Error loading userRoutes:", error.message);
}
try {
  app.use("/api/exams", require("./routes/examRoutes")); // Ensure examRoutes path is correct
} catch (error) {
  console.error("Error loading examRoutes:", error.message);
}

// Exam Submission Route
app.post("/api/submissions/submit", (req, res) => {
  const { studentId, examId, answers } = req.body;
  console.log("Received Submission:", studentId, examId, answers);
  res.status(200).json({ message: "Exam submitted successfully!" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
