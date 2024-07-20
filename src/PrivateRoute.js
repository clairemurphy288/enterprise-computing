import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // You can add a loading spinner or message here
  }

  return user ? element : <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoute;

