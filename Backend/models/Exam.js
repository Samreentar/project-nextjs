const mongoose = require("mongoose");

const SubjectiveQuestionSchema = new mongoose.Schema({
  questionText: String,
  marks: Number,
  correctAnswer: String,
  questionType: String,
});

const ExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  classes: String,
  section: String,
  subjects: String,
  teacherName: String,
  questions: [SubjectiveQuestionSchema],
});

module.exports = mongoose.model("Exam", ExamSchema);