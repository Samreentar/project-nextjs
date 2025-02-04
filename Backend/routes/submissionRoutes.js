const express = require("express");
const { submitExam, getSubmissions } = require("../controllers/submissionController");
const protect = require("../middleware/authMiddleware"); // JWT authentication middleware

const router = express.Router();

// ✅ Student submits exam
router.post("/submit", protect, submitExam);

// ✅ Teacher checks submissions
router.get("/submissions", protect, getSubmissions);

module.exports = router;
