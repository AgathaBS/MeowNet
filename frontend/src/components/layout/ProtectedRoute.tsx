import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuthStore } from "../../store/auth.store";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useAuthStore(
  (state) => state.isAuthenticated);

  // Block access if no valid token exists.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
