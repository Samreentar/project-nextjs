"use client";
import React, { useState } from "react";

export default function Insertpaper() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [extractedText, setExtractedText] = useState(
    "Initial extracted text goes here"
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [answers, setAnswers] = useState([]);
  const [grades, setGrades] = useState(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
  };

  const handleAddAnswerField = () => {
    setAnswers([
      ...answers,
      { question: "", answer: "", correct_answer: "", total_marks: "", predicted_marks: "" },
    ]);
  };

  const handleInputChange = (field, value, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index][field] = value;
    setAnswers(updatedAnswers);
  };

  const handleRemoveAnswerField = (index) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleGradeNow = async () => {
    setError(null);
    setGrades(null);

    // Prepare data for the inference API
    const payload = answers.map((item) => ({
      question: item.question,
      answer: item.answer,
      correct_answer: item.correct_answer,
      total_marks: item.total_marks,
    }));

    try {
      const response = await fetch("http://localhost:5000/inference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Send the array of objects to the API
      });

      const data = await response.json();

      if (response.ok) {
        setGrades(data);
        setSuccess("Grades calculated successfully!");
        
        // Update predicted_marks for each answer with the response from the API
        const updatedAnswers = answers.map((item, index) => ({
          ...item,
          predicted_marks: data[index]?.marks || 0, // Assuming marks come in the same order
        }));
        setAnswers(updatedAnswers);  // Update state with predicted marks
      } else {
        setError(data.error || "An unknown error occurred while grading.");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setExtractedText("");
    const formData = new FormData();

    selectedImages.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("name", studentName);
    formData.append("id", studentID);
    formData.append("class", className);
    formData.append("section", section);
    formData.append("answers", JSON.stringify(answers));

    try {
      const response = await fetch(
        "http://localhost:8080/extracttextfromimage",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setExtractedText(JSON.stringify(data.data, null, 2));
      } else {
        setError(data.error || "An unknown error occurred");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="rounded-lg mt-5 shadow-2xl">
      <h1 className="text-2xl flex justify-center m-5 font-bold text-black">
        Extract Text from Image
      </h1>
      <div className="rounded-xl p-2">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="p-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="box-border border-2 w-full h-12 rounded pl-4 border-gray-200 outline-none text-black text-md"
            />
          </div>

          <div className="p-2">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              className="box-border border-2 w-full h-12 rounded pl-4 border-gray-200 outline-none text-black text-md"
            />
          </div>

          <div className="p-2">
            <label htmlFor="class">Class:</label>
            <input
              type="text"
              id="class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="box-border border-2 w-full h-12 rounded pl-4 border-gray-200 outline-none text-black text-md"
            />
          </div>

          <div className="p-2">
            <label htmlFor="section">Section:</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="box-border border-2 w-full h-12 rounded pl-4 border-gray-200 outline-none text-black text-md"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="p-2">
            <label htmlFor="fileInput">Upload Image Files:</label>
            <input
              type="file"
              name="files"
              accept="image/*"
              id="fileInput"
              multiple
              onChange={handleImageUpload}
            />
          </div>

          <div className="p-2">
            <h3>Questions and Answers</h3>
            {answers.map((item, index) => (
              <div key={index} className="mb-4">
                <textarea
                  placeholder="Question"
                  value={item.question}
                  onChange={(e) =>
                    handleInputChange("question", e.target.value, index)
                  }
                  className="box-border border-2 w-full h-12 rounded pl-4 mb-2 border-gray-200 outline-none text-black text-md"
                ></textarea>
                <textarea
                  placeholder="Answer"
                  value={item.answer}
                  onChange={(e) =>
                    handleInputChange("answer", e.target.value, index)
                  }
                  className="box-border border-2 w-full h-12 rounded pl-4 mb-2 border-gray-200 outline-none text-black text-md"
                ></textarea>
                <textarea
                  placeholder="Correct Answer"
                  value={item.correct_answer}
                  onChange={(e) =>
                    handleInputChange("correct_answer", e.target.value, index)
                  }
                  className="box-border border-2 w-full h-12 rounded pl-4 mb-2 border-gray-200 outline-none text-black text-md"
                ></textarea>
                <input
                  type="number"
                  placeholder="Total Marks"
                  value={item.total_marks}
                  onChange={(e) =>
                    handleInputChange("total_marks", e.target.value, index)
                  }
                  className="box-border border-2 w-full h-12 rounded pl-4 mb-2 border-gray-200 outline-none text-black text-md"
                />
                <input
                  type="number"
                  placeholder="Predicted Marks"
                  value={item.predicted_marks}
                  readOnly
                  className="box-border border-2 w-full h-12 rounded pl-4 mb-2 border-gray-200 outline-none text-black text-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnswerField(index)}
                  className="text-red-500 text-2xl"
                >
                  ✖
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAnswerField}
              className="bg-blue-500 text-black rounded px-4 py-2"
            >
              + Add Question
            </button>
          </div>

          <button
            type="submit"
            className="mt-5 w-full h-12 rounded bg-blue-500 text-black"
          >
            Extract Text from Images
          </button>
        </form>

        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
        <textarea
          className="w-full mt-4"
          id="extractedText"
          cols="120"
          rows="5"
          value={extractedText}
          onChange={(e) => setExtractedText(e.target.value)}
        ></textarea>
        <button
          onClick={handleGradeNow}
          className="mt-5 w-full h-12 rounded bg-green-500 text-black"
        >
          Grade Now
        </button>
        {grades && (
          <div className="mt-4">
            <h3>Grades</h3>
            <ul>
              {grades.map((grade, index) => (
                <li key={index}>
                  <strong>Question:</strong> {grade.question} <br />
                  <strong>Answer:</strong> {grade.answer} <br />
                  <strong>Predicted Marks:</strong> {grade.marks} <br />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
