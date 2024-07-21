import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import NavBar from './NavBar';

const FlashcardDecks = () => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const decksCollection = collection(db, 'decks');
        const decksSnapshot = await getDocs(decksCollection);
        const decksList = decksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDecks(decksList);
      } catch (err) {
        setError('Failed to fetch decks');
        console.error('Error fetching decks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const handleDeckClick = (deckId) => {
    navigate(`/practice/${deckId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
            <p className="text-xl font-semibold">Loading decks...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
            <p className="text-xl font-semibold text-red-500">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Your Flashcard Decks</h1>
          <p className="text-xl mb-4">Here you can manage your flashcard decks.</p>
          {decks.length > 0 ? (
            <ul className="space-y-4">
              {decks.map(deck => (
                <li key={deck.id} className="bg-blue-100 p-4 rounded-lg border border-gray-300 shadow-md">
                  <button
                    className="text-2xl font-semibold mb-2 w-full text-center" // Center the button text
                    onClick={() => handleDeckClick(deck.id)}
                  >
                    {deck.title}
                  </button>
                  <p className="text-lg text-center">Number of flashcards: {deck.flashcards.length}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xl">No decks available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default FlashcardDecks;



