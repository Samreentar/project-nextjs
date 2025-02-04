import React from "react";
import Ourstory from "../../components/About/Ourstory";
import Values from "../../components/About/Values";
import Choose from "../../components/About/Choose";

const Page = () => {
  return (
    <div className="  mb-96">
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/mentor/bg.jpg')" }}
      >
        <div className=" absolute inset-0 bg-purple opacity-75"></div>
        <div className="relative md:mx-28 z-10 flex flex-col items-start justify-center h-full p-12">
          <h1 className="text-white md:text-5xl text-2xl md:p-3 font-bold">
            About Exam-Tech Solutions
          </h1>
          <p className="text-white md:text-3xl text-1xl md:max-w-4xl md:p-3 mt-4">
            We use the power of AI to transform the way businesses operate and
            make data-driven decisions.
          </p>
        </div>
      </div>
      <Ourstory />
      <Values />
      <Choose />
    </div>
  );
};

export default Page;
