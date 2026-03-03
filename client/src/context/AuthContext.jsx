// client/src/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_TOKEN_KEY = "token";
const STORAGE_USER_KEY = "user";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(false);

  /**
   * ✅ login(payload)
   * Supports both:
   * - login(userObject)
   * - login({ user, token })
   */
  const login = (payload) => {
    const nextUser = payload?.user ?? payload ?? null;
    const nextToken = payload?.token;

    if (nextToken) {
      localStorage.setItem(STORAGE_TOKEN_KEY, nextToken);
    }

    if (nextUser) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(nextUser));
    }

    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
    setUser(null);
  };

  // Optional: keep auth synced across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_USER_KEY) {
        setUser(getStoredUser());
      }
      if (e.key === STORAGE_TOKEN_KEY && !e.newValue) {
        setUser(null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};