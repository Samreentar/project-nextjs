import React from "react";

const Values = () => {
  return (
    <div className="h-full min-h-screen w-full bg-gray-800 pt-12 p-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold  mb-2">
          Core Values that Drive Our Brand Forward
        </h2>
        <p className="text-lg text-gray-300">
          Our values serve as a guiding force for the company’s actions,
          decisions, and interactions.
        </p>
      </div>

      <div className="grid gap-14 mx-12 p-5 md:grid-cols-3 md:gap-5 space-y-8 bg-lightpink mb-10">
        <div className="rounded-xl mt-8 bg-white p-6 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
            <span className="text-white text-3xl">🌳</span>
          </div>
          <h3 className="text-darken mb-3 text-xl font-medium lg:px-14">
            Client Value
          </h3>
          <p className="px-4 text-gray-500">
            We strive to exceed our clients expectations and deliver measurable
            results that positively impact their business.
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
            <span className="text-white text-3xl">💧</span>
          </div>
          <h3 className="text-darken mb-3 text-xl font-medium lg:px-14">
            People Driven
          </h3>
          <p className="px-4 text-gray-500">
            As a people-driven company, we prioritize the needs and well-being
            of our employees, customers, and communities.
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-sky-500 shadow-sky-500/40">
            <span className="text-white text-3xl">🌻</span>
          </div>
          <h3 className="text-darken mb-3 text-xl font-medium lg:px-14">
            Integrity
          </h3>
          <p className="px-4 text-gray-500">
            We place a high value on honesty, transparency, and ethical behavior
            maintaining a high level of trust with our employees, and other
            stakeholders.
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
            <span className="text-white text-3xl">💧</span>
          </div>
          <h3 className="text-darken mb-3 text-xl font-medium lg:px-14">
            Accountability
          </h3>
          <p className="px-4 text-gray-500">
            We value taking responsibility for our actions and outcomes, and
            holding ourselves and our employees accountable for our performance.
          </p>
        </div>
        <div className="rounded-xl  bg-white p-6 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
            <span className="text-white text-3xl">💧</span>
          </div>
          <h3 className="text-darken mb-3 text-xl font-medium lg:px-14">
            Collaboration
          </h3>
          <p className="px-4 text-gray-500">
            Collaboration fuels innovation and progress among us by bringing
            together diverse backgrounds & skill sets toward a common goal
          </p>
        </div>
      </div>
    </div>
  );
};

export default Values;
