"use client";
import Link from "next/link";
import React from "react";

const ClassList: React.FC = () => {
  return (
    <div className="flex items-start justify-center h-screen bg-gray-100 pt-10">
      <div className="p-10 bg-white rounded-xl shadow-lg w-full max-w-2xl border border-gray-300">
        {/* Title */}
        <h2 className="text-3xl font-bold text-purple-900 text-center mb-8">
          Exam Portal
        </h2>

        {/* Links */}
        <div className="grid grid-cols-1 gap-6">
          <Link
            href="/Dashboard/list/exams/ExamView"
            className="flex items-center justify-between p-5 bg-purple-600 text-gray-200 rounded-lg text-lg font-medium shadow-md hover:bg-purple-700 transition-all duration-300"
          >
            View Exam Papers
            <span className="text-xl">➡️</span>
          </Link>
          <Link
            href="/Dashboard/list/exams/ExamSubmission"
            className="flex items-center justify-between p-5 bg-purple-500 text-gray-200 rounded-lg text-lg font-medium shadow-md hover:bg-purple-600 transition-all duration-300"
          >
            Submit Exam
            <span className="text-xl">✍️</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassList;
