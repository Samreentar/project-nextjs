"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/20/solid";

const Register = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    role: "student", 
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    setError("");
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/register", user);

      if (response.status === 201) {
        alert("Registration successful!");
        closeModal();
        router.push("/login");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      setError(error.response.data.message || "Error during registration.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="text-20px font-medium space-links"
        onClick={openModal}
      >
        Register
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-full max-w-md space-y-8">
                    <div>
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Register Your Account
                      </h2>
                    </div>
                    {error && <p className="text-red-600 text-center">{error}</p>}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <input
                          name="fullName"
                          type="text"
                          value={user.fullName}
                          onChange={handleInput}
                          required
                          className="relative block w-full rounded-md border px-3 py-2"
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <input
                          name="email"
                          type="email"
                          value={user.email}
                          onChange={handleInput}
                          required
                          className="relative block w-full rounded-md border px-3 py-2"
                          placeholder="Email Address"
                        />
                      </div>
                      <div>
                        <input
                          name="phoneNumber"
                          type="text"
                          value={user.phoneNumber}
                          onChange={handleInput}
                          required
                          className="relative block w-full rounded-md border px-3 py-2"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div>
                        <input
                          name="password"
                          type="password"
                          value={user.password}
                          onChange={handleInput}
                          required
                          className="relative block w-full rounded-md border px-3 py-2"
                          placeholder="Password"
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="w-full rounded-md bg-purple py-2 px-4 text-white hover:bg-indigo-700"
                        >
                          <LockClosedIcon className="h-5 w-5 inline mr-2" />
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Register;
