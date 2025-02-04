"use client"; // Ensure it's a client component

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);  // To show feedback to the user
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract the token from the query parameters
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Token:", token); // Debugging the token value
    console.log("Password:", password);
    try {
      const res = await axios.post(
        'http://localhost:8080/reset-password',
        { token, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (res.data.Status === "Success") {
        setStatusMessage("Password reset successfully. Redirecting to Sign In...");
        setTimeout(() => {
          router.push('/signin');  // Redirect to sign-in after a short delay
        }, 3000);
      } else {
        setStatusMessage("Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 min-h-screen">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h4 className="text-lg font-bold mb-4">Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="w-full border border-gray-300 p-2 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-green-500 text-black p-2 rounded w-full">
            Update
          </button>
        </form>
        {statusMessage && (
          <p className="text-sm mt-4 text-gray-700">{statusMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
