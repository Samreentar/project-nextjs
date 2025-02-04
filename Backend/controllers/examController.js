const Exam = require("../models/Exam");

// ✅ Create Exam (Only Teachers)
const createExam = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create exams" });
    }

    const { title, description, date, questions } = req.body;
    const newExam = new Exam({
      title,
      description,
      date,
      questions,
      createdBy: req.user.id, // Logged-in teacher ki ID
    });

    await newExam.save();
    res.status(201).json({ message: "Exam created successfully", exam: newExam });
  } catch (error) {
    res.status(500).json({ message: "Failed to create exam", error });
  }
};

// ✅ Get All Exams
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("createdBy", "name email"); // Teacher info bhi fetch ho gi
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exams", error });
  }
};

// ✅ Get Exam by ID
const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("createdBy", "name email");
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exam", error });
  }
};

module.exports = { createExam, getExams, getExamById };
