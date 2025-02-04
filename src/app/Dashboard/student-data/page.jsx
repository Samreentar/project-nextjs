"use client";
import { useEffect } from "react"; // Import useEffect
import { useRouter } from "next/navigation";
// import StudentData from "../../Dashboard/student-data";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // Redirect to home if no token
    }
  }, [router]);

  // return <StudentData />;
};

export default Page;
