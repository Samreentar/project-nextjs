"use client";
import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import axios from "axios";
import Link from "next/link";

interface Exam {
  id: string; // Add a unique ID to identify each exam
  title: string;
  section: string;
  teacherName: string;
  instructorImage: string;
}

const ClassList: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    // Replace 'BSSE' with the student's class (e.g., fetched from authentication or profile data)
    const studentClass = "BSSE";

    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/exams/student-class/${studentClass}`
        );
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {exams.map((exam) => (
        <Link 
          key={exam.id} 
          href={`/Dashboard/list/StudentAttempt`} // Dynamic route for the exam attempt page
        >
          
            <ClassCard
              title={exam.title}
              section={exam.section}
              instructor={exam.teacherName}
              instructorImage="/profile.png"
            />
         
        </Link>
      ))}
    </div>
  );
};

export default ClassList;
