"use client";
import ResetPassword from "../components/Reset-password/reset-password"; // Go up two levels to reach the component
import { useParams } from 'next/navigation';

function ResetPasswordPage() {
  const {  token } = useParams(); // Access dynamic route parameters
  
   
   

  return (
    <div>
      <ResetPassword  token={token} />
    </div>
  );
}

export default ResetPasswordPage;
