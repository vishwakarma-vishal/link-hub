import React from "react";
import { Link } from "react-router-dom";
import { FaShareAlt, FaLink, FaUsers } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center px-6 py-16">
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-4xl font-bold text-gray-800 leading-snug">
            Manage & Share Your Links Effortlessly 🔗
          </h2>
          <p className="text-gray-600 text-lg mt-4">
            Organize, access, and share your favorite links with ease. Start creating your personalized link hub today!
          </p>
          <Link to="/dashboard">
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
        <img src="/hero-image.png" alt="Link Hub" className="w-full md:w-1/2 max-w-md mt-8 md:mt-0" />
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Why Choose LinkHub? 🚀</h2>
        <div className="grid md:grid-cols-3 gap-6 px-6 mt-10">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
            <FaLink className="text-blue-600 text-4xl mx-auto" />
            <h3 className="text-xl font-bold mt-4">Save & Organize</h3>
            <p className="text-gray-600 mt-2">Easily store and categorize your important links.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
            <FaShareAlt className="text-blue-600 text-4xl mx-auto" />
            <h3 className="text-xl font-bold mt-4">Share Seamlessly</h3>
            <p className="text-gray-600 mt-2">Share your favorite links with friends in just one click.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
            <FaUsers className="text-blue-600 text-4xl mx-auto" />
            <h3 className="text-xl font-bold mt-4">Accessible Anywhere</h3>
            <p className="text-gray-600 mt-2">Access your link collection from any device, anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
