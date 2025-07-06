import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter';

const About = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 py-20 px-6 md:px-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-playfair mb-4">
          <span className="text-primary">Hi, I'm Abinash Das</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-gray-700">
          <Typewriter
            words={[
              "Software Engineer 🚀",
              "Full Stack Developer 💻",
              "Creator of NexStay 🏨",
              "Always Exploring, Always Building ✨"
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={75}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>
      </div>

      {/* Badges & Contact */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-20">
        <a
          href="https://github.com/AbiNash1017"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90"
        >
          <FaGithub size={20} />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/abinashdas10"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90"
        >
          <FaLinkedin size={20} />
          LinkedIn
        </a>
        <a
          href="mailto:abinash.das.dev@gmail.com"
          className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90"
        >
          <FaEnvelope size={20} />
          Hire Me
        </a>
      </div>

      {/* About NexStay */}
      <div className="max-w-4xl mx-auto mb-24 text-center">
        <h2 className="text-3xl font-semibold font-playfair mb-6 text-primary">
          About NexStay
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>NexStay</strong> is a premium hotel booking web platform
          designed for effortless travel planning. Whether you're seeking a luxurious
          retreat or a budget escape, NexStay helps you book your dream stay with ease.
          This project combines beautiful UI, smart features, and a scalable full-stack
          architecture — built with passion and precision.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            title: "Smart Booking System",
            desc: "Real-time availability checks, date validation, and seamless booking flow.",
          },
          {
            title: "Hotel Owner Dashboard",
            desc: "Manage rooms, toggle availability, track revenue, and monitor bookings.",
          },
          {
            title: "Luxury-Focused Design",
            desc: "Clean, minimal, and elegant frontend built with TailwindCSS + Vite.",
          },
          {
            title: "Authentication & Payments",
            desc: "Secure user auth flow and a payment-ready system for scaling.",
          },
          {
            title: "Responsive & Fast",
            desc: "Optimized for both mobile and desktop — blazing-fast with Vite + React.",
          },
          {
            title: "Contact & Support",
            desc: "Direct contact flow for customers and hotel owners via dashboard.",
          },
        ].map((feature, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-28 text-gray-500 text-sm">
        © {new Date().getFullYear()} Abinash | NexStay Project
      </div>
    </div>
  );
};

export default About;
