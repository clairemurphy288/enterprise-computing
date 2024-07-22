import React, { useState } from 'react';
import { db } from './firebase-config'; // Adjust path as needed
import { collection, doc, runTransaction } from 'firebase/firestore';

const Flashcard = ({ flashcard, setFlashcard,  videoTitle }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddToDeck = async (flashcard) => {
    try {
      const deckRef = doc(collection(db, 'decks'), videoTitle);

      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(deckRef);

        if (!docSnap.exists()) {
          // Create a new deck if it doesn't exist
          transaction.set(deckRef, {
            title: videoTitle,
            flashcards: [flashcard],
          });
        } else {
          // Update existing deck
          const existingDeck = docSnap.data();
          transaction.update(deckRef, {
            flashcards: [...existingDeck.flashcards, flashcard],
          });
        }
      });

      console.log('Flashcard added to deck successfully');
    } catch (error) {
      console.error('Error adding flashcard to deck:', error);
    }
  };

  return (
    <div
      className="relative w-80 h-60 cursor-pointer perspective-1000"
      onClick={handleFlip}
    >
      <div
        className={`absolute w-full h-full transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute w-full h-full backface-hidden bg-white border border-gray-300 shadow-lg rounded-lg flex items-center justify-center p-4">
          <p className="text-center text-lg">{flashcard.front}</p>
        </div>
        <div className="absolute w-full h-full backface-hidden bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center p-4 rotate-y-180">
          <p className="text-center text-lg mb-2"><strong>Definition:</strong> {flashcard.back}</p>
          <p className="text-center text-lg mb-4"><strong>Sentence:</strong> {flashcard.example}</p>
          <button
            className="p-2 bg-blue-600 text-white rounded-lg w-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the flip on button click
              handleAddToDeck(flashcard); // Call Firebase function
              setFlashcard(null)
            }}
          >
            Add to Deck
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;

