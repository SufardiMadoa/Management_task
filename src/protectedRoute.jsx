import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

export const ProtectedRoute = ({ redirectPath = "/admin/login", allowedEmails = [], children }) => {
  const { auth_token, authenticatedEmail } = useAuthStore();

  const canAccess = () => {
    if (!auth_token) {
      return false;
    }

    if (allowedEmails.length === 0) {
      return true; // Jika tidak ada email yang dibatasi, izinkan akses
    }

    return allowedEmails.includes(authenticatedEmail);
  };

  if (!auth_token) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!canAccess()) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};