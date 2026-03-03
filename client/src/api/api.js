// client/src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // ✅ Use consistent token key
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      // ✅ Use consistent keys
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // optional redirect:
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;