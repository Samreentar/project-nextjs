"use client";

import { useState, useEffect } from "react";
import BigCalendar from "@/components/BigCalender";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
const SingleTeacherPage = () => {
  const { id } = useParams(); // Extract the teacher ID from the URL
  const [teacher, setTeacher] = useState<any>(null); // To store teacher data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [teacherData, setTeacherData] = useState({
    _id:'',
    name: '',
    email: '',
    contactNumber: '',
    classes: '',
    subjects: ''
    // Add other fields as necessary
  });
  type Teacher = {
    _id: string;
    name: string;
    email: string;
    contactNumber:string;
    classes:string;
    subjects:string;
  };
  // Fetch teacher data from the backend
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/teachers/${id}`); // Adjust URL to match your API
        if (!response.ok) {
          throw new Error("Failed to fetch teacher data");
        }
        const data = await response.json();
        setTeacher(data); // Set the teacher data
        setTeacherData({
          _id:data._id,
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          classes: data.classes,
          subjects: data.subjects,
        }); // Initialize the teacherData state
        setLoading(false); // Loading complete
      } catch (err: any) {
        setError(err.message);
        setLoading(false); // Stop loading even on error
      }
    };
    fetchTeacher();
  }, [id]);

  // Handle form update for teacher
  const handleUpdateTeacher = async (updatedTeacher: Teacher) => {
    try {
      console.log("Updating subject:"+ updatedTeacher._id, updatedTeacher);

      const response = await axios.put(
        `http://localhost:8080/api/admin/teacherupdate/${updatedTeacher._id}`,
        updatedTeacher
      );
      const updatedData = response.data;

      setTeacher((prevTeachers: Teacher[]) =>
        prevTeachers.map((teacher: { _id: any; }) =>
          teacher._id === updatedData._id ? updatedData : teacher
        )
      );
      alert("Subject updated successfully!");
    } catch (error) {
      console.error("Error updating subject:", error);
      setError("Failed to update subject. Please try again.");
    }
  };
  // Handle changes to form inputs
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading teacher data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="/assets/logo/image.png"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">{teacher?.name}</h1>
                {role === "admin" && (
                  <FormModal
                    table="teacher"
                    type="update"
                    data={teacherData}
                    onSubmit={handleUpdateTeacher} // Pass the update handler to FormModal
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">
                {teacher?.bio || "No bio available for this teacher."}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{teacher?.dateOfBirth || "12/03/1995"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{teacher?.email || "No email available"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{teacher?.contactNumber || "No phone available"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{teacher?.classes}</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-2 w-full md:w-[55%] xl:w-[65%] 2xl:w-[75%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h2 className="text-xl font-semibold">Authentic Credentials</h2>
                <span className="text-sm text-gray-400">Username:{teacher?.username}</span>
                <br></br>
                <span className="text-sm text-gray-400">password:{teacher?.password}</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[55%] xl:w-[65%] 2xl:w-[75%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{teacher?.subjects}</h1>
                <span className="text-sm text-gray-400">Subjects</span>
              </div>
            </div>
          </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Teacher&apos;s Classes
            </Link>
          </div>
        </div>
        <Performance />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
