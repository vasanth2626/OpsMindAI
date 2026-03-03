// client/src/pages/ForgotPasswordPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setToken("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/forgot-password", {
        email,
      });

      setMessage("Reset token generated successfully.");
      setToken(res.data.resetToken); // Demo only

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to generate reset token"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-2xl">

        <h1 className="text-xl font-bold text-indigo-400 text-center mb-6">
          Forgot Password
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/30 border border-red-500 rounded p-3">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 text-sm text-green-400 bg-green-900/30 border border-green-500 rounded p-3">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Enter your registered email
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 focus:border-indigo-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-60"
          >
            {loading ? "Processing..." : "Generate Reset Token"}
          </button>

        </form>

        {/* ✅ Demo Only: Show Token */}
        {token && (
          <div className="mt-6 text-xs text-yellow-400 bg-yellow-900/20 border border-yellow-600 rounded p-3 break-words">
            <strong>Demo Reset Token:</strong>
            <br />
            {token}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-xs text-indigo-400 hover:underline"
          >
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;