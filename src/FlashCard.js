import React, { useState } from 'react';
import './FlashCard.css'; // Import the CSS file for the flip animation
const Flashcard = ({ flashcard, onAddToDeck }) => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };
  
    return (
      <div className="flashcard-container" onClick={handleFlip}>
        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-front bg-white p-4 border border-gray-300 shadow-lg rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Front</h3>
            <p>{flashcard.front}</p>
          </div>
          <div className="flashcard-back bg-white p-4 border border-gray-300 shadow-lg rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Back</h3>
            <p><strong>Sentence:</strong> {flashcard.example}</p>
            <p><strong>Definition:</strong> {flashcard.back}</p>
            <button
              className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the flip on button click
                onAddToDeck(flashcard);
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