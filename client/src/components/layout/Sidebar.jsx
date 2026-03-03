// client/src/components/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  MessageCircle,
  LayoutDashboard,
  FileText,
  Activity,
  User,
  Users,                               // ✅  new icon
} from "lucide-react";

const Sidebar = () => {
  const { user } = useAuth();
  const isAdminOrSuper = ["admin", "superadmin"].includes(user?.role);

  const baseClasses =
    "flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-all duration-200";
  const iconClasses = "w-4 h-4";

  return (
    <aside className="w-64 h-screen bg-surface border-r border-borderSubtle flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-borderSubtle">
        <h1 className="text-lg font-semibold bg-primary-gradient bg-clip-text text-transparent">
          OpsMind AI
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Chat */}
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-card text-white shadow-glow"
                : "text-gray-400 hover:bg-cardHover hover:text-white"
            }`
          }>
          <MessageCircle className={iconClasses} />
          <span>Chat Assistant</span>
        </NavLink>

        {/* Profile – visible to all */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-card text-white shadow-glow"
                : "text-gray-400 hover:bg-cardHover hover:text-white"
            }`
          }>
          <User className={iconClasses} />
          <span>Profile</span>
        </NavLink>

        {/* Admin / Superadmin only */}
        {isAdminOrSuper && (
          <>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `${baseClasses} ${
                  isActive
                    ? "bg-card text-white shadow-glow"
                    : "text-gray-400 hover:bg-cardHover hover:text-white"
                }`
              }>
              <LayoutDashboard className={iconClasses} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/employees"                       // ✅  new link
              className={({ isActive }) =>
                `${baseClasses} ${
                  isActive
                    ? "bg-card text-white shadow-glow"
                    : "text-gray-400 hover:bg-cardHover hover:text-white"
                }`
              }>
              <Users className={iconClasses} />
              <span>Employees</span>
            </NavLink>

            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `${baseClasses} ${
                  isActive
                    ? "bg-card text-white shadow-glow"
                    : "text-gray-400 hover:bg-cardHover hover:text-white"
                }`
              }>
              <FileText className={iconClasses} />
              <span>Documents</span>
            </NavLink>

            <NavLink
              to="/inspect"
              className={({ isActive }) =>
                `${baseClasses} ${
                  isActive
                    ? "bg-card text-white shadow-glow"
                    : "text-gray-400 hover:bg-cardHover hover:text-white"
                }`
              }>
              <Activity className={iconClasses} />
              <span>System Logs</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-borderSubtle">
        <div className="bg-card rounded-xl p-3">
          <p className="text-xs text-muted">Logged in as</p>
          <p className="text-sm font-medium text-white truncate">
            {user?.email || "User"}
          </p>
          <p className="text-xs text-gray-400 capitalize">
            {user?.role}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;