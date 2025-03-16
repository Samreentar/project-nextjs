"use client";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

// Define the Exam and Question Types
interface Question {
  questionText: string;
  options: string[];
  marks: number;
}

interface Exam {
  _id: string;
  title: string;
  language: string;
  teacherName: string;
  description: string;
  marks?: number;
  questions: Question[];
}

const ExamView = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/exams");
        if (!response.ok) throw new Error("Failed to fetch exams");

        const result = await response.json();
        console.log("API Response:", result);

        if (result.success && Array.isArray(result.exams)) {
          setExams(result.exams);
        } else {
          setExams([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load exams. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleDownloadPDF = async (exam: Exam) => {
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Exam Details", 10, 10);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    let y = 20; // Initial Y position for content

    // Calculate total marks
    const totalMarks = exam.questions.reduce((sum, q) => sum + (q.marks || 0), 0);

    // Add exam details using template literals correctly
    pdf.text(`Exam Title: ${exam.title || "N/A"}`, 10, y);
    y += 10;
    pdf.text(`Language: ${exam.language || "N/A"}`, 10, y);
    y += 10;
    pdf.text(`Teacher Name: ${exam.teacherName || "N/A"}`, 10, y);
    y += 10;
    pdf.text(`Description: ${exam.description || "No description provided."}`, 10, y);
    y += 10;
    pdf.text(`Total Marks: ${totalMarks}`, 10, y);
    y += 15;

    // Include questions in the PDF
    if (exam.questions.length > 0) {
      pdf.setFont("helvetica", "bold");
      pdf.text("Questions:", 10, y);
      pdf.setFont("helvetica", "normal");
      y += 10;

      exam.questions.forEach((q, index) => {
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }

        pdf.text(`${index + 1}. ${q.questionText}`, 10, y);
        y += 8;

        q.options?.forEach((option, optIndex) => {
          if (y > 270) {
            pdf.addPage();
            y = 20;
          }
          pdf.text(`   ${String.fromCharCode(65 + optIndex)}. ${option}`, 15, y);
          y += 6;
        });

        y += 10;
      });
    } else {
      pdf.text("No questions available", 10, y);
    }

    // Save the PDF with a sanitized file name
    pdf.save(`${exam.title.replace(/\s+/g, "_")}_Exam.pdf`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Exam Details</h2>

        {/* Loading and Error Handling */}
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading exam details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : exams.length > 0 ? (
          exams.map((exam) => {
            const totalMarks = exam.questions.reduce((sum, q) => sum + (q.marks || 0), 0);

            return (
              <div key={exam._id} className="mb-6 p-4 border rounded-lg shadow-sm">
                <div className="text-gray-700 text-lg space-y-2">
                  <p><strong>Exam Title:</strong> {exam.title || "N/A"}</p>
                  <p><strong>Language:</strong> {exam.language || "N/A"}</p>
                  <p><strong>Teacher Name:</strong> {exam.teacherName || "N/A"}</p>
                  <p><strong>Description:</strong> {exam.description || "No description provided."}</p>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownloadPDF(exam)}
                  className="mt-4 w-full border-2 border-purple-600 text-purple-600 px-5 py-2 rounded-lg text-lg font-semibold bg-transparent hover:bg-purple-100 transition-all duration-300 shadow-md"
                >
                  Download Exam
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No exam details found.</p>
        )}
      </div>
    </div>
  );
};

export default ExamView;
