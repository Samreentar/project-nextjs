const Submission = require("../models/Submission");
const Exam = require("../models/Exam");

// ✅ Student submits an exam
const submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;
    const studentId = req.user.id;

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // Auto-Grading Logic (Basic Matching)
    let score = 0;
    answers.forEach((ans) => {
      const question = exam.questions.find(q => q._id.toString() === ans.questionId);
      if (question && question.correctAnswer === ans.answer) {
        score += 1; // Correct answer = 1 point
      }
    });

    const submission = new Submission({
      student: studentId,
      exam: examId,
      answers,
      score,
      status: "graded"
    });

    await submission.save();
    res.status(201).json({ message: "Exam submitted successfully!", score });
  } catch (error) {
    res.status(500).json({ message: "Exam submission failed", error });
  }
};

// ✅ Teacher gets all submissions
const getSubmissions = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can view submissions" });
    }

    const submissions = await Submission.find().populate("student", "name email").populate("exam", "title");
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch submissions", error });
  }
};

module.exports = { submitExam, getSubmissions };
