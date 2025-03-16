const Exam = require("../models/Exam"); // Adjust the path if needed

exports.createExam = async (req, res) => {
  try {
    console.log("📥 Received Data:", req.body); // Debugging
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json({ message: "✅ Exam created successfully!", exam });
  } catch (error) {
    console.error("❌ Error creating exam:", error); // Debugging
    res.status(500).json({ message: "Error creating exam", error });
  }
};
