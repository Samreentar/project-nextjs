// import React from "react";
// import Sidebar from "../../components/Dashboard/Sidebar";

// const layout = ({ children }) => {
//   return (
//     <div>
//       <Sidebar />
//       <div class="p-4 sm:ml-64">{children}</div>
//     </div>
//   );
// };

// export default layout;

'use client'
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  // useEffect to check token and redirect if necessary
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(true)
      router.push("/"); // Redirect to home if no token
    } else {
      if (role === 'student') router.push("/Dashboard/student")
      if (role === 'teacher') router.push("/Dashboard/teacher")
      if (role === 'admin') router.push("/Dashboard/admin")
      setLoading(false)
    }
  }, [router]);
  if (loading) return <>Loading</>
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">Exam Tech</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
