import React from 'react';
import { Navigate } from 'react-router-dom';

import { PrivateRouteProps } from '../interfaces/props';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, token }) => {
  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
