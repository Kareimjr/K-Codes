// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-2xl">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404 😕</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! The page you’re looking for doesn’t exist.</p>
        <p className="text-lg text-gray-500 mb-8">It seems we’ve lost our way. Let’s get you back on track!</p>
        <Link
          to="/"
          className="bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#5A2F13] hover:to-[#935F3B] transition duration-300 text-lg shadow-md hover:shadow-lg"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;