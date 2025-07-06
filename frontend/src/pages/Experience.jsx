import React from "react";
import { assets } from "../assets/assets.js";

const Experience = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
       style={{
        backgroundImage: `url(${assets.experinceBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black/55 bg-opacity-90 z-10" />

      {/* Experience Content */}
      <div className="relative z-20 px-6 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-6 leading-tight">
          The NexStay Experience
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
          Welcome to NexStay – where modern elegance meets timeless luxury.
        </p>
        <p className="text-md md:text-lg text-gray-300 mb-4">
          Our curated destinations offer more than just a room – they offer a lifestyle.
        </p>
        <p className="text-md md:text-lg text-gray-400">
          Whether you're escaping to serenity or exploring a vibrant cityscape, your experience with us is designed to feel effortless, indulgent, and unforgettable.
        </p>
      </div>
    </section>
  );
};

export default Experience;
