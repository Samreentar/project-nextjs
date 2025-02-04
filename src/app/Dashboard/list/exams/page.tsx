// "use client"
// import FormModal from "@/components/FormModal";
// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import { examsData, role } from "@/lib/data";
// import Image from "next/image";

// type Exam = {
//   id: number;
//   subject: string;
//   class: string;
//   teacher: string;
//   date: string;
// };

// const columns = [
//   {
//     header: "Subject Name",
//     accessor: "name",
//   },
//   {
//     header: "Class",
//     accessor: "class",
//   },
//   {
//     header: "Teacher",
//     accessor: "teacher",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Date",
//     accessor: "date",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Actions",
//     accessor: "action",
//   },
// ];

// const ExamListPage = () => {
//   const renderRow = (item: Exam) => (
//     <tr
//       key={item.id}
//       className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
//     >
//       <td className="flex items-center gap-4 p-4">{item.subject}</td>
//       <td>{item.class}</td>
//       <td className="hidden md:table-cell">{item.teacher}</td>
//       <td className="hidden md:table-cell">{item.date}</td>
//       <td>
//         <div className="flex items-center gap-2">
//           {role === "admin" || role === "teacher" && (
//             <>
//               <FormModal table="exam" type="update" data={item} />
//               <FormModal table="exam" type="delete" id={item.id} />
//             </>
//           )}
//         </div>
//       </td>
//     </tr>
//   );

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
//       {/* TOP */}
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-4 self-end">
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
//               <Image src="/filter.png" alt="" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
//               <Image src="/sort.png" alt="" width={14} height={14} />
//             </button>
//             {role === "admin" || role === "teacher" && <FormModal table="exam" type="create" />}
//           </div>
//         </div>
//       </div>
//       {/* LIST */}
//       <Table columns={columns} renderRow={renderRow} data={examsData} />
//       {/* PAGINATION */}
//       {/* <Pagination /> */}
//     </div>
//   );
// };

// export default ExamListPage;

"use client"
import ClassList from '@/components/ClassList';
import EventCalendar from '@/components/EventCalendar';
import React from 'react';


const ClassesPage: React.FC = () => {
  return (
    <div className=' space-x-5 flex gap-4 flex-col md:flex-row'>

      <div className="w-4 lg:w-2/3 flex flex-col gap-8"><ClassList />
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
      </div>
    </div>
    // <div className="min-h-screen bg-gray-100 p-8">
    //   <div className="container mx-auto">
    //     <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Classes</h1>
    //     <ClassList />
    //   </div>
    // </div>
  );
};

export default ClassesPage;
