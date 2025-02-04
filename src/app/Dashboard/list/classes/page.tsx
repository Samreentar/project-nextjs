"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";

type Class = {
  _id: string;
  className: string;
  teacherName: string;
  grade: number;
};

const columns = [
  { header: "Class Name", accessor: "className" },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },
  { header: "Class Teacher", accessor: "teacherName", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

const ClassListPage = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null); // Selected class for update

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/classes");
        setClasses(response.data);
      } catch (error) {
        setError("Failed to fetch classes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleUpdate = async (updatedClass: Class) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/admin/class/${updatedClass._id}`,
        updatedClass
      );
      setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem._id === updatedClass._id ? response.data : classItem
        )
      );
      alert("Class updated successfully!");
    } catch (error) {
      console.error("Error updating class:", error);
      setError("Failed to update class. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this class?");
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:8080/api/admin/class/${id}`);
      setClasses((prevClasses) => prevClasses.filter((classItem) => classItem._id !== id));
      alert("Class deleted successfully!");
    } catch (error) {
      console.error("Error deleting class:", error);
      setError("Failed to delete class. Please try again.");
    }
  };

  const renderRow = (item: Class) => (
    <tr key={item._id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">{item.className}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.teacherName}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              {/* Update Modal */}
              <FormModal
                table="class"
                type="update"
                data={item} // Pre-filling data for update
                onSubmit={handleUpdate} // Pass the update function
                onOpen={() => setSelectedClass(item)} // Set selected class
              />
              {/* Delete Button */}
              <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="class" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={classes} />
      <Pagination page={0} count={0} />
    </div>
  );
};

export default ClassListPage;
