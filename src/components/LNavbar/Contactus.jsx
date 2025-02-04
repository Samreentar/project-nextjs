"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
// Importing icons

const Contactusform = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log(inputValues);

    try {
      const response = await fetch("http://localhost:8080/api/v1/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputValues.input1,
          email: inputValues.input2,
          message: inputValues.input3,
        }),
      });

      if (!response.ok) {
        console.log("Error response:", response);
        throw new Error("Failed to send message. Please try again.");
      }

      alert("Message sent successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const isDisabled = Object.values(inputValues).some((value) => value === "");

  return (
    <>
      <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0">
        <div className="md:hidden">
          <button type="button" className="text-15px font-medium" onClick={openModal}>
            Contact Us
          </button>
        </div>
        <div className="hidden md:block">
          <button type="button" className="text-15px font-medium space-links" onClick={openModal}>
            Contact Us
          </button>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
                
                <div
  className="hidden lg:block"
  style={{
    fontSize: "28px", // Increased font size
    fontWeight: "bold",
    color: "#3D0158", // Purple color
     // Added margin to move it slightly down
  }}
>
  SmartGrader
</div>

                   <div className="bg-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xl font-bold text-center mb-6">If want to buy these services,reach out to us directly</h2>

        {/* Contact Buttons */}
        <div className="flex justify-center space-x-8">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/923145345029"
            className="flex items-center justify-center p-4 bg-green-500 hover:bg-green-600 text-black rounded-lg shadow-lg transform transition-all hover:scale-105 space-x-2"
          >
            <FaWhatsapp size={30} />
            <span className="text-xl">WhatsApp</span>
          </a>

          {/* Email Button */}
          <a
            href="mailto:abidtouqeer73@gmail.com"
            className="flex items-center justify-center p-4 bg-blue-500 hover:bg-blue-600 text-black rounded-lg shadow-lg transform transition-all hover:scale-105 space-x-2"
          >
            <FaEnvelope size={30} />
            <span className="text-xl">Email</span>
          </a>

          {/* Phone Button */}
          <a
            href="tel:+923145345029"
            className="flex items-center justify-center p-4 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg shadow-lg transform transition-all hover:scale-105 space-x-2"
          >
            <FaPhone size={20} />
            <span className="text-sm">3145345029</span>
          </a>
        </div>
      </div>
    </div>
                  <p className="mb-8 lg:mb-16 mt-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                    Contact us now! Want to send us feedback?
                  </p>
                  <form action="#" className="space-y-8" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Your Name
                      </label>
                      <input
                        id="text"
                        name="input1"
                        value={inputValues.input1}
                        onChange={handleChange}
                        type="text"
                        autoComplete="current-password"
                        required
                        className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Name..."
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Your Email
                      </label>
                      <input
                        id="email"
                        name="input2"
                        value={inputValues.input2}
                        onChange={handleChange}
                        type="email"
                        autoComplete="current-password"
                        required
                        className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="xyz@email.com"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                        Your message
                      </label>
                      <textarea
                        id="message"
                        name="input3"
                        value={inputValues.input3}
                        onChange={handleChange}
                        className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Leave a comment..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isDisabled}
                      className="py-3 px-5 text-sm disabled:opacity-50 font-medium w-full text-center text-white rounded-lg bg-purple hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Send Message
                    </button>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                {/* Contact Info with Icons */}
                
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Contactusform;
