const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Student ID
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true }, // Exam ID
  answers: [{ questionId: String, answer: String }], // Student ke answers
  score: { type: Number, default: 0 }, // Auto-graded score
  status: { type: String, enum: ["pending", "graded"], default: "pending" } // Grading Status
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);
