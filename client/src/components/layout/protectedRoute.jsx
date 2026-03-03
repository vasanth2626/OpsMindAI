// client/src/components/layout/protectedRoute.jsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * ProtectedRoute
 * - Requires authentication
 * - If requireAdmin = true → only admin & superadmin allowed
 * - Supports nested routes using <Outlet />
 */

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { user } = useAuth();

  // ✅ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Admin / Superadmin check
  if (
    requireAdmin &&
    !["admin", "superadmin"].includes(user.role)
  ) {
    return <Navigate to="/chat" replace />;
  }

  // ✅ Allowed → Render nested routes
  return <Outlet />;
};

export default ProtectedRoute;