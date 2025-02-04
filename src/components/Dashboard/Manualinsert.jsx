"use client";
import React, { useState } from "react";

const Manualinsert = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    class: "",
    section: "",
    questions: [{ question: "", answer: "" }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: "", answer: "" }],
    });
  };

  const deleteQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:8080/manuallyinsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Success:", data);
      alert("Data successfully saved");
      // Handle success (e.g., show a success message, clear form)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="mt-32 p-8 bg-gray-100 rounded-md bg-bgpink max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manually Insert Student Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700"
          >
            ID:
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="class"
            className="block text-sm font-medium text-gray-700"
          >
            Class:
          </label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="section"
            className="block text-sm font-medium text-gray-700"
          >
            Section:
          </label>
          <select
            id="section"
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        {formData.questions.map((q, index) => (
          <div key={index} className="space-y-2 relative">
            <div>
              <label
                htmlFor={`question${index + 1}`}
                className="block text-sm font-medium text-gray-700"
              >
                Question {index + 1}:
              </label>
              <input
                type="text"
                id={`question${index + 1}`}
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor={`answer${index + 1}`}
                className="block text-sm font-medium text-gray-700"
              >
                Answer {index + 1}:
              </label>
              <textarea
                id={`answer${index + 1}`}
                value={q.answer}
                onChange={(e) =>
                  handleQuestionChange(index, "answer", e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
              ></textarea>
            </div>
            {formData.questions.length > 1 && (
              <button
                type="button"
                onClick={() => deleteQuestion(index)}
                className="absolute top-0 right-0 px-2 py-1 bg-red-500  rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="mt-2 px-4 py-2 bg-green-500  rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add Question
        </button>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500  rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Manualinsert;
