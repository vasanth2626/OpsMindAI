// client/src/api/authApi.js
import api from "./api";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const storeAuth = ({ token, user }) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  const { token, user } = res.data;
  storeAuth({ token, user });
  return { token, user };
};

/**
 * ✅ Admin creates new users (employee/admin/superadmin depending on backend rules)
 * IMPORTANT: do NOT store token/user in localStorage,
 * because admin should stay logged in.
 */
export const adminCreateUser = async ({
  name,
  email,
  password,
  role = "employee",
}) => {
  const res = await api.post("/auth/register", { name, email, password, role });
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);