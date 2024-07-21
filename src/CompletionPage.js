import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const CompletionPage = () => {
  const { deckId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
          <p className="text-xl mb-4">You have completed the deck!</p>
          <p className="text-lg">Deck ID: {deckId}</p>
        </div>
      </main>
    </div>
  );
};

export default CompletionPage;
