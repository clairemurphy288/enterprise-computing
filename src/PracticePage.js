import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import NavBar from './NavBar';
import FlashCard from './FlashCard';

const PracticePage = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckRef = doc(db, 'decks', deckId);
        const deckSnap = await getDoc(deckRef);
        if (deckSnap.exists()) {
          setDeck(deckSnap.data());
        } else {
          console.error('No such deck!');
        }
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % deck.flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + deck.flashcards.length) % deck.flashcards.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">{deck?.title}</h1>
          {deck ? (
            <div className="flex flex-col items-center justify-center">
              <FlashCard flashcard={deck.flashcards[currentIndex]} />
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  className="p-2 bg-blue-600 text-white rounded-lg"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  className="p-2 bg-blue-600 text-white rounded-lg"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p>Loading deck...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PracticePage;


