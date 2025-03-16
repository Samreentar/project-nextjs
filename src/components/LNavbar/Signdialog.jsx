"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { useRouter } from "next/navigation";

const SigninSignupModal = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setError("");
    setIsSignup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const url = isSignup
  //       ? "http://localhost:4000/api/users/register"
  //       : "http://localhost:4000/api/users/login";

  //     const payload = isSignup
  //       ? { ...formData, role }
  //       : { email: formData.email, password: formData.password, role };

  //     const response = await axios.post(url, payload);
  //     const { token, userType } = response.data;

  //     localStorage.setItem("authToken", token);
  //     localStorage.setItem("userRole", userType);
  //     alert(isSignup ? "Account created successfully!" : "Login successful!");

  //     closeModal(); // Ensure modal closes before navigation

  //     // Delay navigation slightly to avoid state update issues
  //     setTimeout(() => {
  //       if (userType === "student") router.replace("/Dashboard/student");
  //       else if (userType === "teacher") router.replace("/Dashboard/teacher");
  //       else if (userType === "admin") router.replace("/Dashboard/admin");
  //     }, 300);
  //   } catch (error) {
  //     setError(error.response?.data?.message || "An error occurred");
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const url = isSignup
  //       ? "http://localhost:4000/api/users/register"
  //       : "http://localhost:4000/api/users/login";

  //     const payload = isSignup
  //       ? { ...formData, role }
  //       : { email: formData.email, password: formData.password, role };

  //     const response = await axios.post(url, payload);
  //     const userType = response.data.user.role;
  //     const { token } = response.data;
  //     console.log(response.data);
  //     console.log("user roleeeeeeee:", userType);

  //     // Ensure the token is set in localStorage
  //     localStorage.setItem("authToken", token);
  //     localStorage.setItem("userRole", userType);

  //     alert(isSignup ? "Account created successfully!" : "Login successful!");

  //     if (userType === "student") {
  //       router.replace("/Dashboard/student");
  //     } else if (userType === "teacher") {
  //       router.replace("/Dashboard/teacher");
  //     } else if (userType === "admin") {
  //       router.replace("/Dashboard/admin");
  //     }

  //     // Close the modal before navigating
  //     closeModal();

  //     // Now navigate to the correct dashboard based on the user type
  //   } catch (error) {
  //     setError(error.response?.data?.message || "An error occurred");
  //   }
  //   // } finally {
  //   //   if (userType === "student") {
  //   //     router.replace("/Dashboard/student");
  //   //   } else if (userType === "teacher") {
  //   //     router.replace("/Dashboard/teacher");
  //   //   } else if (userType === "admin") {
  //   //     router.replace("/Dashboard/admin");
  //   //   }
  //   // }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? "http://localhost:4000/api/users/register"
        : "http://localhost:4000/api/users/login";
  
      const payload = isSignup
        ? { ...formData, role }
        : { email: formData.email, password: formData.password, role };
  
      const response = await axios.post(url, payload);
      const userType = response.data.user.role;
      const { token } = response.data;
      console.log("User Role:", userType);
  
      // Store token and role safely
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", userType);
  
      alert(isSignup ? "Account created successfully!" : "Login successful!");
  
      // Close modal before navigation
      closeModal();
  
      // Wait for localStorage to update before redirecting
      setTimeout(() => {
        if (userType === "student") {
          router.replace("/Dashboard/student");
        } else if (userType === "teacher") {
          router.replace("/Dashboard/teacher");
        } else if (userType === "admin") {
          router.replace("/Dashboard/admin");
        }
      }, 300);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
    
  };
  
  

  return (
    <>
      <button
        className="bg-purple w-full text-white py-2 px-4 rounded hover:bg-purple-dark"
        onClick={openModal}
      >
        {isSignup ? "Sign Up" : "Sign In"}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 flex items-center justify-center p-4 text-center">
            <Transition.Child>
              <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <img
                    className="mx-auto h-12"
                    src="/assets/logo/exam1.png"
                    alt="ExamTech"
                  />
                  <h2 className="mt-4 text-xl font-bold">
                    {isSignup
                      ? "Create an Account"
                      : "Welcome back! Access your account now"}
                  </h2>
                </div>
                {error && (
                  <p className="text-red-600 text-center mt-2">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {isSignup && (
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      required
                      className="w-full border px-3 py-2 rounded"
                    />
                  )}

                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    required
                    className="w-full border px-3 py-2 rounded"
                  />

                  <div className="relative">
                    <input
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      required
                      className="w-full border px-3 py-2 rounded"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  <div className="flex space-x-4 mt-2">
                    {["student", "teacher", "admin"].map((r) => (
                      <label key={r} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={r}
                          checked={role === r}
                          onChange={() => setRole(r)}
                        />
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </label>
                    ))}
                  </div>

                  <button className="w-full bg-purple text-white py-2 rounded flex justify-center items-center">
                    <LockClosedIcon className="h-5 w-5 mr-2" />{" "}
                    {isSignup ? "Sign Up" : "Sign In"}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    {isSignup
                      ? "Already have an account?"
                      : "Don't have an account?"}
                    <button
                      className="text-purple ml-1"
                      onClick={() => setIsSignup(!isSignup)}
                    >
                      {isSignup ? "Log In" : "Sign Up"}
                    </button>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SigninSignupModal;


