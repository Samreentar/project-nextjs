"use client";

import { useEffect, useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import axios from "axios";

type Subject = {
  _id: string;
  name: string;
  teacher: string[];
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const SubjectListPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/subjects");
        setSubjects(response.data);
      } catch (error) {
        setError("Failed to fetch subjects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Update Subject Function
  const handleUpdate = async (updatedSubject: Subject) => {
    try {
      console.log("Updating subject:", updatedSubject._id, updatedSubject);

      const response = await axios.put(
        `http://localhost:8080/api/admin/subjectupdate/${updatedSubject._id}`,
        updatedSubject
      );
      const updatedData = response.data;

      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject._id === updatedData._id ? updatedData : subject
        )
      );
      alert("Subject updated successfully!");
    } catch (error) {
      console.error("Error updating subject:", error);
      setError("Failed to update subject. Please try again.");
    }
  };

  // Delete Subject Function
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/admin/subjectdelete/${id}`);
      setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject._id !== id));
      alert("Subject deleted successfully!");
    } catch (error) {
      console.error("Error deleting subject:", error);
      setError("Failed to delete subject. Please try again.");
    }
  };

  const renderRow = (item: Subject) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.teacher.join(",")}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal
                table="subject"
                type="update"
                data={item}
                onSubmit={handleUpdate} // Pass the update handler here
              />
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  if (loading) {
    return <p>Loading subjects...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={subjects} />
      {/* PAGINATION */}
      <Pagination page={0} count={0} />
    </div>
  );
};

export default SubjectListPage;
