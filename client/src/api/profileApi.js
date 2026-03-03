// src\api\profileApi.js


import api from "./api";

// GET current profile
export const getMyProfile = () => api.get("/profile/me");

// PUT update name / email
export const updateMyProfile = (data) => api.put("/profile/me", data);

// PUT change password
export const changeMyPassword = (data) => api.put("/profile/password", data);

// POST avatar upload  (FormData with field "avatar")
export const uploadAvatar = (fd) =>
  api.post("/profile/avatar", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });