"use client";

import { useState, useEffect } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data"; // Assuming role data is being fetched or passed down as a prop
import Image from "next/image";
import Link from "next/link";

type Teacher = {
  _id: string;
  fullName: string;
  email?: string;
  photo: string;
  phoneNumber: string;
  subjects: string;
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Teacher ID", accessor: "teacherId", className: "hidden md:table-cell" },
  { header: "Subjects", accessor: "subjects", className: "hidden lg:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null); // State for delete confirmation
  const [isDeleting, setIsDeleting] = useState<boolean>(false); // Track delete operation
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/teachers");
        if (!response.ok) throw new Error("Failed to fetch teacher data");
        const data = await response.json();
        setTeachers(data || []);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        setError("Failed to load teacher data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = teachers.filter((teacher) =>
        teacher.email && teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTeachers(filtered);
    } else {
      setFilteredTeachers(teachers);
    }
  }, [searchQuery, teachers]);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:8080/api/admin/teacherdelete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete teacher");

      setTeachers((prev) => prev.filter((teacher) => teacher._id !== id));
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("Failed to delete teacher. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteId(null); // Close the confirmation modal
    }
  };

  const renderRow = (items: Teacher) => {
    const subjects = items.subjects.join(", ") || "No subjects available";
    console.log(items.fullName)
    return (
      <tr
        key={items._id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="flex items-center gap-4 p-4">
          {items.photo ? (
            <Image
              src={items.photo}
              alt={`${items.fullName}'s photo`}
              width={40}
              height={40}
              className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <Image
              src="/assets/logo/image.png"
              alt="Teacher Placeholder"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-500">{items.fullName}</h3>

            <p className="text-xs text-gray-500">{items.email}</p>

          </div>
        </td>
        <td className="hidden md:table-cell">{items._id}</td>
        <td className="hidden lg:table-cell">{subjects}</td>
        <td className="hidden lg:table-cell">{items.phoneNumber}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/Dashboard/list/teachers/${items._id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                <Image src="/view.png" alt="" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <button
                onClick={() => setDeleteId(items._id)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white"
              >
                <Image src="/delete.png" alt="Delete" width={16} height={16} />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch setSearchQuery={setSearchQuery} />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={filteredTeachers} />
      <Pagination />
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>Are you sure you want to delete this teacher?</p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-black rounded-md"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherListPage;
