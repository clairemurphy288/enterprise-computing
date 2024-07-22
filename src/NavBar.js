import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase-config'; // Import auth from firebase-config
import { onAuthStateChanged } from 'firebase/auth';
import acornIcon from './acorn.svg'; // Import the acorn image

const NavBar = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchUser = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid); // Set the user ID
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setScore(userSnap.data().score); // Set the user's score
          }
        } else {
          navigate('/login'); // Redirect to login if not authenticated
        }
      });
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    navigate('/'); // Redirect to login page or home page after logout
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-extrabold text-white">
        <a href="/home" className="text-white hover:text-gray-200 transition-colors">
          acquire
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-white">
          <img src={acornIcon} alt="Acorn" className="w-6 h-6 mr-2" />
          <span className='font-bold'>{score * 100}</span>
        </div>
        <button
          onClick={() => navigate('/flashcard-decks')}
          className="bg-white hover:bg-gray-200 text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          Flashcard Decks
        </button>
        <button
          onClick={handleLogout}
          className="bg-white hover:bg-gray-200 text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;






