import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRout({ children }) {
  const { user } = useSelector((state) => state.user);

  if (user) {
    return children;
  } else {
    return <Navigate to="/register" />;
  }
}
