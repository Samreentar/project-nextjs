

'use client'
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const userRole = localStorage.getItem("userRole");

      if (!token) {
        router.push("/"); // Redirect to login
      } else {
        setAuthenticated(true);
        setLoading(false);

        if (userRole === "student") router.replace("/Dashboard/student");
        if (userRole === "teacher") router.replace("/Dashboard/teacher");
        if (userRole === "admin") router.replace("/Dashboard/admin");
      }
    };

    // Wait for localStorage update before checking auth
    setTimeout(checkAuth, 300);
  }, []); // Dependency array ensures it re-runs if router updates

  if (loading || !authenticated) return <>Loading...</>;

  return (
    <div className="h-screen flex">
      {/* LEFT SIDEBAR */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">Exam Tech</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT CONTENT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}







