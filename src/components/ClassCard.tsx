"use client"
import React from 'react';

interface ClassCardProps {
  title: string;
  section: string;
  instructor: string;
  instructorImage: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ title, section, instructor, instructorImage }) => {
  return (
    <div className="m-4 p-4 border rounded shadow-lg w-64">
      <img src={instructorImage} alt={instructor} className="w-16 h-16 rounded-full mx-auto mb-4" />
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <p className="text-center text-gray-600">Class: {section}</p>
      <p className="text-center text-gray-600">Instructor: {instructor}</p>
    </div>
  );
};

export default ClassCard;
