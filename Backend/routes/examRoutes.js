const express = require("express");
const { createExam, getExams, getExamById } = require("../controllers/examController");
const protect = require("../middleware/authMiddleware"); // JWT Authentication Middleware

const router = express.Router();

// ✅ Create Exam (Only for Teachers)
router.post("/create", protect, createExam);

// ✅ Get All Exams (Students aur Teachers dono dekh sakein)
router.get("/", protect, getExams);

// ✅ Get Single Exam by ID
router.get("/:id", protect, getExamById);

module.exports = router;
