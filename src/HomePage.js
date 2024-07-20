import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-green-500">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Home!</h1>
        <p className="text-gray-600 text-center">You are successfully logged in. This is your home page.</p>
      </div>
    </div>
  );
};

export default HomePage;
