import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PasswordResetPage from './PasswordResetPage';
import HomePage from './HomePage';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
      </Routes>
    </Router>
  );
}

export default App;



