const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Exam ka naam
  description: { type: String }, // Optional
  date: { type: Date, required: true }, // Exam ki date
  questions: [
    {
      questionText: { type: String, required: true }, // Sawal
      options: [{ type: String }], // MCQ k liye options (agar hain)
      correctAnswer: { type: String, required: true }, // Correct answer
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Teacher ka ID
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);
