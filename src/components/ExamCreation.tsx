"use client";
import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle } from "lucide-react";
import axios from "axios";


// Interfaces and data structures
interface SubjectiveQuestion {
  questionText: string;
  marks: number;
  correctAnswer: string;
  questionType: string;
}

interface Exam {
  title: string;
  description: string;
  classes: string;
  section: string;
  subjects: string;
  teacherName: string;
  questions: SubjectiveQuestion[];
}

interface ClassOption {
  _id: string;
  className: string;
  teacherName: string;
  grade: string;
}


const ExamCreationForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [classes, setClasses] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [subjects, setSubjects] = useState<string>("");
  const [teacherName, setTeacherName] = useState<string>("");
  const [questions, setQuestions] = useState<SubjectiveQuestion[]>([]);
  const [classOptions, setClassOptions] = useState<ClassOption[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/admin/classes") 
      .then((res) => setClassOptions(res.data))
      .catch((err) => console.error("Error fetching class options:", err));
  }, []);
  

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: "", marks: 0, correctAnswer: "", questionType: "Subjective" }]);
  };

  const handleRemoveQuestion = (indexToRemove: number) => {
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

  const handleQuestionChange = (index: number, field: keyof SubjectiveQuestion, value: string | number) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, [field]: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken"); // Get authToken from localStorage
  
    const exam: Exam = { title, description, classes, section, subjects, teacherName, questions };
    
    try {
      const response = await axios.post(
        "http://localhost:4000/api/exams/create", 
        exam, 
        {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}` // Pass authToken in headers
          }
        }
      );
  
      console.log(response.data);
      alert("Exam created successfully!");
    } catch (error) {
      console.error("Error creating exam:", error);
      alert("Error creating exam. Please try again.");
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Exam Creation</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Exam Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter exam title" required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Language</label>
            <input type="text" value={subjects} onChange={(e) => setSubjects(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter subjects" required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Teacher Name</label>
            <input type="text" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter teacher name" required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Exam Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Provide a brief description of the exam" rows={4} required></textarea>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Questions</h3>
              <button type="button" onClick={handleAddQuestion} className="flex items-center bg-lamaSky text-black px-4 py-2 rounded-md hover:bg-blue-600 transition">
                <PlusCircle className="mr-2 text-purple" size={20} /> Add Question
              </button>
            </div>
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="bg-gray-100 p-5 rounded-lg border border-gray-200 relative space-y-4">
                <button type="button" onClick={() => handleRemoveQuestion(qIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-700" title="Remove Question">
                  <Trash2 size={20} />
                </button>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Question Text</label>
                  <textarea value={question.questionText} onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter question text" required></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Marks</label>
                  <input type="number" value={question.marks} onChange={(e) => handleQuestionChange(qIndex, "marks", parseInt(e.target.value))} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter marks" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Correct Answer</label>
                  <input type="text" value={question.correctAnswer} onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter correct answer" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button type="submit" className="bg-green-500 text-black px-8 py-3 rounded-md hover:bg-green-600 transition text-lg font-semibold">Create Exam</button>
          </div>
        </form>
      </div>
    </div>
  );
};




export default ExamCreationForm;
