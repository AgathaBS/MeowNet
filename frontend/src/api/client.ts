
import axios from "axios";
import { useAuthStore } from "../store/auth.store"

/*
 Main Axios instance used across the application.
 Automatically injects JWT token into requests.
*/

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
