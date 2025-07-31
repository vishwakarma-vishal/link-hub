import React from "react";
import { Link } from "react-router-dom";
import { FaShareAlt, FaLink, FaUsers } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-12 gap-10">
        <div className="text-center lg:text-left flex-1">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Manage & Share Your Links Effortlessly 🔗
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-xl mx-auto lg:mx-0">
            Organize, access, and share your favorite links with ease. Start creating your personalized link hub today!
          </p>
          <Link to="/dashboard">
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-base sm:text-lg shadow-md hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/globe.png" alt="Link Hub" className="p-5 w-3/4 md:w-2/3 lg:w-full max-w-md" />
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-blue-100 px-6 md:px-12 lg:px-24">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
          Why Choose LinkHub? 🚀
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
            <FaLink className="text-blue-600 text-4xl mx-auto" />
            <h3 className="text-xl font-bold mt-4">Save & Organize</h3>
            <p className="text-gray-600 mt-2">Easily store and categorize your important links.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
            <FaShareAlt className="text-blue-600 text-4xl mx-auto" />
            <h3 className="text-xl font-bold mt-4">Share Seamlessly</h3>
            <p className="text-gray-600 mt-2">Share your favorite links with friends in just one click.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
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
