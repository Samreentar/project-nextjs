"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CircleStackIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";

const names = [
  {
    module: "AI-Powered Grading",
    imageSrc: "/assets/courses/coursesOne.svg",
    description:
      " Our AI-driven grading system stands as a cornerstone of our examination platform, revolutionizing the way student assessments are conducted. This feature leverages advanced algorithms to automatically evaluate and score student responses with unparalleled accuracy and consistency. By eliminating the subjectivity inherent in traditional grading methods, our AI system ensures that each student’s work is assessed on objective criteria, fostering fairness and impartiality. For students, this translates into receiving timely and constructive feedback that is free from human bias. Educators and administrators benefit from a significant reduction in the time and effort required to grade exams manually, allowing them to focus on more impactful teaching and administrative tasks. The AI-driven grading system is designed to handle a diverse range of question types, from multiple-choice to complex essay responses, ensuring comprehensive evaluation capabilities across various subjects. ",

    category: "Auto",
  },
  {
    module: "OCR Capabilities",
    imageSrc: "/assets/courses/coursesOne.svg",
    description:
      "The Optical Character Recognition (OCR) feature is another pivotal component of our examination system, designed to convert handwritten responses into machine-readable text with high precision. This technology enables seamless integration of handwritten exams into the digital grading workflow, allowing educators to accept and evaluate handwritten papers without compromising on efficiency. For students, OCR ensures that their handwritten responses are accurately captured and processed, preserving the integrity of their answers. Educators benefit from the ability to digitize and analyze handwritten responses quickly, integrating them into the automated grading system. OCR also supports various handwriting styles and languages, making it a versatile tool for institutions with diverse student populations. By facilitating the transition from paper-based to digital assessments, OCR enhances the accessibility and scalability of our examination system.",

    category: "OCR",
  },

  {
    module: "Real-Time Analytics",
    imageSrc: "/assets/courses/coursesTwo.svg",
    description:
      "Our platform provides real-time analytics, offering actionable insights into student performance and exam trends as they occur. This feature enables educators to track progress, identify areas of improvement, and make data-driven decisions swiftly. For students, real-time feedback helps in understanding their strengths and weaknesses immediately, allowing for timely intervention and learning adjustments. Administrators benefit from comprehensive dashboards that aggregate performance data, facilitating strategic planning and resource allocation. Real-time analytics transform raw data into meaningful information, enhancing the overall effectiveness of the educational process.",
    category: "Analytics",
  },

  {
    module: "Customizable Exam Creation",
    imageSrc: "/assets/courses/coursesThree.svg",
    description:
      "The customizable exam creation feature allows educators to design and tailor assessments according to specific curriculum needs and learning objectives. This flexibility supports the creation of a wide variety of question formats and difficulty levels, ensuring that exams are aligned with educational goals and student capabilities. Educators can easily modify exam content, set parameters, and incorporate multimedia elements to enhance the testing experience. This adaptability ensures that the examinations are relevant and challenging, providing a more accurate measure of student understanding and performance",

    category: "Creation",
  },
  {
    module: "User-Friendly Interface",
    imageSrc: "/assets/courses/coursesFour.svg",
    description:
      "A user-friendly interface is central to our examination system, designed with simplicity and ease of use in mind. The intuitive design ensures that students, educators, and administrators can navigate the platform effortlessly, minimizing the learning curve and enhancing overall user experience. Features such as drag-and-drop functionality, clear navigation menus, and accessible support resources contribute to a seamless interaction with the system. By prioritizing usability, the platform ensures that users can focus on their primary tasks—whether it’s taking exams, grading, or managing exam logistics—without being hindered by complex or confusing interfaces",

    category: "Interface",
  },
];

const NamesList = () => {
  const [selectedButton, setSelectedButton] = useState("Auto");

  const ocr = names.filter((name) => name.category === "OCR");
  const auto = names.filter((name) => name.category === "Auto");
  const analytics = names.filter((name) => name.category === "Analytics");
  const create = names.filter((name) => name.category === "Creation");
  const interfac = names.filter((name) => name.category === "Interface");

  let selectedNames = [];

  if (selectedButton === "OCR") {
    selectedNames = ocr;
  } else if (selectedButton === "Auto") {
    selectedNames = auto;
  } else if (selectedButton === "Analytics") {
    selectedNames = analytics;
  } else if (selectedButton === "Creation") {
    selectedNames = create;
  } else if (selectedButton === "Interface") {
    selectedNames = interfac;
  }

  const nameElements = selectedNames.map((name, index) => (
    <div key={index} className="">
      <div className="text-lg sm:text-sm py-5 lg:py-0 ">
        <div className="aspect-w-1  aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
          <img
            src={name.imageSrc}
            alt={name.imageSrc}
            className="h-24 w-full object-cover object-center"
          />
        </div>
        <div className="flex justify-between">
          <div className="mt-6 ml-4 block font-normal text-2xl text-gray-900">
            {name.module}
          </div>
          {/* <div className="mt-6 block text-lg font-semibold text-green border-solid border-2 border-green rounded-md px-1">
            ${name.price}
          </div> */}
        </div>
        <p aria-hidden="true" className="mt-2 mb-5 text-lg p-5 font-normal">
          {name.description}
        </p>
        <button className=" m-5 bg-transparent hover:bg-purple text-purple font-medium hover:text-white py-3 px-4 border border-purple hover:border-transparent rounded">
          Explore More
        </button>
        
      </div>
    </div>
  ));

  return (
    <div>
      <div
        id="courses-section"
        className="mx-auto max-w-2xl py-16 px-4 sm:py-36 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div className="sm:flex justify-between items-center pb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">
            Unlock the Potential of Smart Exam Solutions
          </h2>
          <div>
            <button className="bg-transparent hover:bg-purple text-purple font-medium hover:text-white py-3 px-4 border border-purple hover:border-transparent rounded">
              Explore More
            </button>
          </div>
        </div>
        <div className="flex nowhitespace space-x-5 rounded-xl bg-white p-1 overflow-x-auto">
          {/* FOR DESKTOP VIEW */}
          <button
            onClick={() => setSelectedButton("Auto")}
            className={`bg-white ${
              selectedButton === "Auto"
                ? "text-black border-b-2 border-orange"
                : "text-lightgrey"
            } pb-2 text-lg hidden sm:block`}
          >
            {/* Web Development */}
            AI-Driven Grading
          </button>
          <button
            onClick={() => setSelectedButton("OCR")}
            className={`bg-white ${
              selectedButton === "OCR"
                ? "text-black border-b-2 border-orange"
                : "text-lightgrey"
            } pb-2 text-lg hidden sm:block`}
          >
            {/* Mobile Development */}
            OCR Capabilities
          </button>
          <button
            onClick={() => setSelectedButton("Analytics")}
            className={`bg-white ${
              selectedButton === "Analytics"
                ? "text-black border-b-2 border-orange"
                : "text-lightgrey"
            } pb-2 text-lg hidden sm:block`}
          >
            {/* Data Science */}
            Real-Time Analytics
          </button>
          <button
            onClick={() => setSelectedButton("Creation")}
            className={`bg-white ${
              selectedButton === "Creation"
                ? "text-black border-b-2 border-orange"
                : "text-lightgrey"
            } pb-2 text-lg hidden sm:block`}
          >
            {/* Cloud Computing */}
            Customizable Exam Creation
          </button>
          <button
            onClick={() => setSelectedButton("Interface")}
            className={`bg-white ${
              selectedButton === "Interface"
                ? "text-black border-b-2 border-orange"
                : "text-lightgrey"
            } pb-2 text-lg hidden sm:block`}
          >
            {/* Cloud Computing */}
            User-Friendly Interface
          </button>

          {/* FOR MOBILE VIEW */}
          <GlobeAltIcon
            onClick={() => setSelectedButton("Auto")}
            width={70}
            height={70}
            className={`bg-white ${
              selectedButton === "Auto"
                ? "border-b-2 border-orange fill-orange"
                : ""
            } pb-2 block sm:hidden`}
          />
          <DevicePhoneMobileIcon
            onClick={() => setSelectedButton("OCR")}
            width={70}
            height={70}
            className={`bg-white ${
              selectedButton === "OCR"
                ? "border-b-2 border-orange fill-orange"
                : ""
            } pb-2 block sm:hidden`}
          />
          <CircleStackIcon
            onClick={() => setSelectedButton("Analytics")}
            width={70}
            height={70}
            className={`bg-white ${
              selectedButton === "datascience"
                ? "border-b-2 border-orange fill-orange"
                : ""
            } pb-2 block sm:hidden`}
          />
          <CloudIcon
            onClick={() => setSelectedButton("Creation")}
            width={70}
            height={70}
            className={`bg-white ${
              selectedButton === "Creation"
                ? "border-b-2 border-orange fill-orange"
                : ""
            } pb-2 block sm:hidden`}
          />
        </div>
        <div>
          <div className="mx-auto bg-lightpink mt-5 max-w-7xl">
            <div className="grid grid-cols-1 gap-y-10 gap-x-8  ">
              <div className="col-start-1 gap-x-8">
                {nameElements.length > 0 ? (
                  nameElements
                ) : (
                  <p>No data to show</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NamesList;
