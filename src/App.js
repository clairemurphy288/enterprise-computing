import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PasswordResetPage from './PasswordResetPage';
import HomePage from './HomePage';
import VideoPage from './VideoPage';
import FlashcardDecks from './FlashcardDecks'; // Correct path if needed
import PracticePage from './PracticePage';
import CompletionPage from './CompletionPage'; // Import the new page component
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
        <Route path="/video/:id" element={<PrivateRoute element={<VideoPage />} />} />
        <Route path="/flashcard-decks" element={<PrivateRoute element={<FlashcardDecks />} />} />
        <Route path="/practice/:deckId" element={<PrivateRoute element={<PracticePage />} />} />
        <Route path="/completion/:deckId" element={<PrivateRoute element={<CompletionPage />} />} /> {/* Add route for Completion Page */}
      </Routes>
    </Router>
  );
}

export default App;








