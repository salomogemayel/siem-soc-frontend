import api from "./axios";

export const login = (credentials) => api.post("/login", credentials);

export const logout = () => api.post("/logout");

export const getCurrentUser = () => api.get("/user");