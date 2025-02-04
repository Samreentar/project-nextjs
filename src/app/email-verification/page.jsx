"use client";
import OtpInput from "@/components/Email-Verification/email-verification";

import { useSearchParams } from "next/navigation";

const OtpPage = () => {
  const searchParams = useSearchParams(); // For extracting query params
  const email = searchParams.get("email"); // Get the "email" query parameter

  return (
    <div>
      {email ? (
        <OtpInput email={email} />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-center">
            No email provided. Please register first.
          </p>
        </div>
      )}
    </div>
  );
};

export default OtpPage;
