import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PasswordResetPage from './PasswordResetPage';
import HomePage from './HomePage';
import VideoPage from './VideoPage';
import FlashcardDecksPage from './FlashcardDecks';
import PracticePage from './PracticePage';
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
        <Route path="/flashcard-decks" element={<PrivateRoute element={<FlashcardDecksPage />} />} />
        <Route path="/practice/:deckId" element={<PrivateRoute element={<PracticePage />} />} />
      </Routes>
    </Router>
  );
}

export default App;







