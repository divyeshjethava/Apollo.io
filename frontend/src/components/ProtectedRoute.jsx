// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check local storage for the login token
  const token = localStorage.getItem("token");

  // If token exists, render the page (Outlet). If not, redirect to Login.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;