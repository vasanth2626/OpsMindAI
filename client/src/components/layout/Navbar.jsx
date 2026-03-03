// client/src/components/layout/Navbar.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-background border-b border-borderSubtle flex items-center justify-between px-8">

      {/* ✅ Left Section */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Enterprise Knowledge Platform
        </h2>
        <p className="text-xs text-muted">
          Context-Aware Document Intelligence System
        </p>
      </div>

      {/* ✅ Right Section */}
      {user && (
        <div className="flex items-center gap-6">

          {/* ✅ System Status Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-borderSubtle">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            <span className="text-xs text-muted">
              System Online
            </span>
          </div>

          {/* ✅ User Info */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">
              {user.name || user.email}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {user.role}
            </p>
          </div>

          {/* ✅ Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary-dark transition-all"
          >
            Logout
          </button>

        </div>
      )}
    </header>
  );
};

export default Navbar;