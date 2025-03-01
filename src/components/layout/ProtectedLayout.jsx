/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedLayout({ children }) {
  const authToken = useSelector((state) => state.authToken.token);

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
