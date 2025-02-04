"use client"
import React, { useState, useEffect } from 'react';
import { Clock, BookOpen } from 'lucide-react';

interface SubjectiveQuestion {
  questionText: string;
}

interface Exam {
  title: string;
  description: string;
  questions: SubjectiveQuestion[];
}

const StudentExamView: React.FC = () => {
  const [exam, setExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/exams/67638e8924f4b0b53f25ba90'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch exam details');
        }
        const data: Exam = await response.json();
        setExam(data);
        setAnswers(data.questions.map(() => ''));
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, []);

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmitExam = () => {
    if (!exam) return;

    const submissionData = {
      examTitle: exam.title,
      answers: answers,
    };
    console.log('Exam Submission:', submissionData);
    alert('Exam submitted successfully!');
  };

  if (loading) {
    return <div className="text-center mt-10">Loading exam details...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!exam) {
    return <div className="text-center mt-10">No exam details available.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{exam.title}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Clock className="mr-2" size={20} />
              <span>Exam Duration: 2 hrs</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <BookOpen className="mr-2" size={20} />
            Exam Description
          </h3>
          <p className="text-gray-700">{exam.description}</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
            Questions
          </h3>
          {exam.questions.map((question, index) => (
            <div
              key={index}
              className="bg-gray-100 p-5 rounded-lg border border-gray-200"
            >
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">
                  Question {index + 1}
                </p>
                <p className="text-gray-700">{question.questionText}</p>
              </div>
              <textarea
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md min-h-[150px] focus:ring-2 focus:ring-blue-200"
                placeholder="Write your answer here..."
              ></textarea>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSubmitExam}
            className="bg-lamaSky text-black px-10 py-3 rounded-md hover:bg-blue-600 transition text-lg font-semibold"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentExamView;
