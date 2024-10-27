import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStatus.store";


interface Props {
  children: React.ReactNode;
}
export const PublicRoute = ({ children }: Props) => {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};