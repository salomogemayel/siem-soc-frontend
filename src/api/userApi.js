import api from "./axios";

export const getUsers = () => api.get("/admin/users");
export const createUser = (userData) => api.post("/admin/users", userData);