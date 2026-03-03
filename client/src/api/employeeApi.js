import api from "./api";   // your existing axios instance

export const getEmployees = () => api.get("/employees");

export const updateEmployee = (id, data) =>
  api.put(`/employees/${id}`, data);

export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`);