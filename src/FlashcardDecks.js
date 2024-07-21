import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'; // Import NavBar component
import { db } from './firebase-config'; // Adjust the path as needed
import { collection, getDocs } from 'firebase/firestore';

const FlashcardDecksPage = () => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      <NavBar /> {/* Include NavBar here */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Your Flashcard Decks</h1>
          <p className="text-xl mb-4">Here you can manage your flashcard decks.</p>
          {decks.length > 0 ? (
            <ul className="space-y-4">
              {decks.map(deck => (
                <li key={deck.id} className="bg-blue-100 p-4 rounded-lg border border-gray-300 shadow-md">
                  <h2 className="text-2xl font-semibold mb-2">{deck.title}</h2>
                  <p className="text-lg">Number of flashcards: {deck.flashcards.length}</p>
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

export default FlashcardDecksPage;

