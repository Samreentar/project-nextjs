"use client";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import Contact from "./Contactus";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "#home", current: true },
  { name: "Features", href: "#courses-section", current: false },
  { name: "Our Team", href: "#mentors-section", current: false },
  { name: "Testimonial", href: "#testimonial-section", current: false },
  { name: "Join", href: "#join-section", current: false },
  { name: "About ExamTech", href: "./Aboutus", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LandingNavbar = () => {
  const [showSignDialog, setShowSignDialog] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowSignDialog(false); // Hide sign dialog if token exists
    }
  }, []);

  return (
    <Disclosure as="nav" className="bg-lightpink navbar">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* Mobile Logo */}
                  <Image
                    className="block lg:hidden"
                    src="/assets/logo/exam1.png"
                    alt="Courses-Logo"
                    width={150}
                    height={100}
                  />

                  {/* Desktop Logo */}
                  <Image
                    className="hidden lg:block"
                    src="/assets/logo/exam1.png"
                    alt="ExamTech-Logo"
                    width={130}
                    height={100}
                  />

                  {/* SmartGrader Text */}
                  <div
                    className="hidden lg:block"
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#3D0158",
                      marginTop: "10px",
                    }}
                  >
                    SmartGrader
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="hidden sm:ml-14 md:block mt-5">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "text-purple" : "hover:text-purple",
                          "px-3 py-2 text-15px font-medium space-links"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Contact />
                  </div>
                </div>
              </div>

              {/* Sign In and Register buttons for Desktop */}
              <div className="hidden md:flex items-center space-x-8">
                {showSignDialog && <Signdialog />}
              </div>

              {/* Mobile Menu Button */}
              <div className="block md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:text-white hover:bg-purple focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <Contact />
              {/* Sign In and Register buttons for Mobile */}
              <div className="px-3 py-2">
                {showSignDialog && <Signdialog />}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default LandingNavbar;
