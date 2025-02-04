"use client";  // This makes the component a Client Component 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);  // For feedback
  const [errorMessage, setErrorMessage] = useState(null);    // For error feedback
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);  // Clear any previous error messages

    try {
      const res = await axios.post('http://localhost:8080/forgot-password', { email });

      if (res.data.Status === 'Success') {
        setStatusMessage("If your email is registered, you'll receive a reset link shortly.");
        
        // Redirect to sign-in page after a brief delay
        setTimeout(() => {
          router.push('/signin');
        }, 3000);
      } else {
        setErrorMessage("Error: Unable to send reset link.");
      }
    } catch (err) {
      console.error("Error during forgot-password request:", err);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <div className="bg-white p-6 rounded w-1/4">
        <h4 className="text-lg font-bold mb-4">Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-black font-semibold py-2 px-4 w-full rounded hover:bg-green-600 transition-colors"
          >
            Send
          </button>
        </form>
        
        {statusMessage && (
          <p className="text-sm mt-4 text-green-600">{statusMessage}</p>
        )}
        {errorMessage && (
          <p className="text-sm mt-4 text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}


