import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentData = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/students");
        setStudents(response.data);
        setFilteredStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch student data");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) => {
      const studentId =
        student.extractedData?.id?.toString().toLowerCase() || "";
      return studentId.includes(searchId.toLowerCase());
    });
    setFilteredStudents(filtered);
  }, [searchId, students]);

  const handleSearch = (e) => {
    setSearchId(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-24 bg-lightpink mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Data</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md w-full max-w-md"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Section</th>
              <th className="px-4 py-2">Marks</th>
              <th className="px-4 py-2">Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">
                  {student.extractedData?.name || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {student.extractedData?.id || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {student.extractedData?.class || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {student.extractedData?.section || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {calculateMarks(student.extractedData)}
                </td>
                <td className="border px-4 py-2">
                  {calculateTotalMarks(student.extractedData)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const calculateMarks = (data) => {
  if (!data) return 0;
  let marks = 0;
  for (let key in data) {
    if (key.startsWith("answer")) {
      marks += 1; // Assuming each answer is worth 1 mark
    }
  }
  return marks;
};

const calculateTotalMarks = (data) => {
  if (!data) return 0;
  let total = 0;
  for (let key in data) {
    if (key.startsWith("question")) {
      total += 1; // Assuming each question is worth 1 mark
    }
  }
  return total;
};

export default StudentData;
