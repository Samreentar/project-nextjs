const express = require("express");
const { createExam, getExams, getExamById } = require("../controllers/examController");  
const protect = require("../middleware/authMiddleware"); // JWT Authentication Middleware
const { Exam } = require("../models/Exam"); 
const router = express.Router();

/* 
📌 Exam Routes - Accessible Based on Role 
----------------------------------------
🔹 GET    /api/exams/test     →  Test Route (Check if Exam Routes are Working)
🔹 POST   /api/exams/create   →  Create Exam (Teachers Only)
🔹 GET    /api/exams/all      →  Get All Exams (Students & Teachers)
🔹 GET    /api/exams/:id      →  Get Single Exam by ID (Students & Teachers)
*/


// ✅ Create Exam (Only for Teachers)
router.post("/create",protect, createExam);


module.exports = router;


// ✅ Test Route (Check if routes are working)
router.get("/test", (req, res) => {
  res.json({ success: true, message: "📚 Exam Routes are Working!" });
});

// ✅ Get All Exams (Students & Teachers)
router.get("/", async (req, res) => {  // 🔴 FIX: Changed "/all" to "/"
  try {
    const exams = await Exam.find(); // Fetch exams from database
    res.json({ success: true, exams }); // Send exams as JSON response
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ✅ Get a Single Exam by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const exam = await getExamById(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: "Exam not found" });
    }
    res.json({ success: true, exam });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;