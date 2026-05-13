import axios from "axios";

// Create a reusable Axios instance for the entire application.
// This centralizes API configuration and avoids duplicated code.
export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the JWT token to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});