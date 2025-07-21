// src/component/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DataContext } from '../../../../component/dataProvider/DataProvider'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [{ user }] = useContext(DataContext);

  if (!user) {
    return <p>Loading...</p>;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
