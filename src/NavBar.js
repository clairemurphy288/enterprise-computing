import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    navigate('/'); // Redirect to login page or home page after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <a href="/" className="text-white hover:text-gray-300">
            Acquire
          </a>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
