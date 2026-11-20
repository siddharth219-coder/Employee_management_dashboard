import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { UserRole } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({
  allowedRoles,
}: ProtectedRouteProps) => {
  const {
    user,
    isAuthenticated,
  } = useAuth();

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  const doesNotHaveRequiredRole =
    allowedRoles &&
    (!user || !allowedRoles.includes(user.role));

  if (doesNotHaveRequiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;