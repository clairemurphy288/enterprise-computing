import React from 'react';
import NavBar from './NavBar'; // Import NavBar component

const FlashcardDecksPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col">
      <NavBar /> {/* Include NavBar here */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Your Flashcard Decks</h1>
          <p className="text-xl mb-4">Here you can manage your flashcard decks.</p>
          {/* Add your flashcard decks management logic here */}
        </div>
      </main>
    </div>
  );
};

export default FlashcardDecksPage;
