import React from 'react';
import { Navigate } from 'react-router-dom';

import { OpenRouteProps } from '../interfaces/props';

const ProtectedRoute: React.FC<OpenRouteProps> = ({ element, token }) => {
  return token ? <Navigate to="/home" /> : element;
};

export default ProtectedRoute;