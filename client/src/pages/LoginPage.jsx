// client/src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await loginUser(email, password);
      login(user);

      // ✅ Optional success toast
      toast.success(`Welcome back, ${user.name || user.email}`);

      if (["admin", "superadmin"].includes(user.role)) {
        navigate("/admin");
      } else {
        navigate("/chat");
      }
    } catch (err) {
      const msg =
        err?.message ||
        (typeof err === "string" ? err : "Login failed");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      {/* ✅ Background Glow Effect */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full"></div>

      <div className="relative w-full max-w-md bg-card border border-borderSubtle rounded-2xl shadow-card p-10">

        {/* ✅ Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold bg-primary-gradient bg-clip-text text-transparent">
            OpsMind AI
          </h1>
          <p className="text-sm text-muted mt-3">
            Enterprise Knowledge Intelligence Platform
          </p>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 bg-surface border border-borderSubtle rounded-xl text-sm text-white focus:ring-2 focus:ring-primary focus:border-primary"
              type="email"
              placeholder="user@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-3 bg-surface border border-borderSubtle rounded-xl text-sm text-white focus:ring-2 focus:ring-primary focus:border-primary"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* ✅ Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-xs text-accent hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* ✅ Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark transition-all text-white font-medium disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* ✅ Footer */}
        <div className="mt-10 text-center text-xs text-muted">
          Secure login • Role-based access control enabled
        </div>
      </div>
    </div>
  );
};

export default LoginPage;