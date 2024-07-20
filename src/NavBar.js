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
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-extrabold text-white">
        <a href="/" className="text-white hover:text-gray-200 transition-colors">
          acquire
        </a>
      </div>
      <button
        onClick={handleLogout}
        className="bg-white hover:bg-gray-200 text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;




