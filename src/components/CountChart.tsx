"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CountChart = () => {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch student count
        const studentResponse = await fetch("http://localhost:8080/api/admin/student");
        const studentData = await studentResponse.json();

        // Fetch teacher count
        const teacherResponse = await fetch("http://localhost:8080/api/admin/teachers");
        const teacherData = await teacherResponse.json();

        setCounts({
          students: studentData.length,
          teachers: teacherData.length
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  // Calculate total and percentages
  const total = counts.students + counts.teachers;
  const studentPercentage = total ? Math.round((counts.students / total) * 100) : 0;
  const teacherPercentage = total ? Math.round((counts.teachers / total) * 100) : 0;

  const data = [
    {
      name: "Total",
      count: total,
      fill: "white",
    },
    {
      name: "Teachers",
      count: counts.teachers,
      fill: "#FAE27C",
    },
    {
      name: "Students",
      count: counts.students,
      fill: "#C3EBFA",
    },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Distribution</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{counts.students.toLocaleString()}</h1>
          <h2 className="text-xs text-gray-300">students ({studentPercentage}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{counts.teachers.toLocaleString()}</h1>
          <h2 className="text-xs text-gray-300">teachers ({teacherPercentage}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;