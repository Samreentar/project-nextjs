"use client"
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch student count
        const studentResponse = await fetch("http://localhost:8080/api/admin/student");
        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          setStudentCount(studentData.length);
        }

        // Fetch teacher count if needed
        const teacherResponse = await fetch("http://localhost:8080/api/admin/teachers");
        if (teacherResponse.ok) {
          const teacherData = await teacherResponse.json();
          setTeacherCount(teacherData.length);
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);


  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" count={studentCount} />
          <UserCard type="teacher" count={teacherCount} />


        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">

          </div>
        </div>
        {/* BOTTOM CHART */}
        {/* <div className="w-full h-[500px]">
          <FinanceChart />
        </div> */}
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
      </div>
    </div>
  );
};

export default AdminPage;
