import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../stores/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // if (!isAuthenticated || !isAdmin) {
  //   return <Navigate to="/admin/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;
