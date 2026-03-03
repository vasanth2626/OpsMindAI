import api from "./api";          // existing axios wrapper

export const getSystemLogs = (params = {}) =>
  api.get("/admin/system-logs", { params });

// ✅ NEW: Quick log stats for dashboard card
export const getLogStats = (params = {}) =>
  api.get("/admin/log-stats", { params });