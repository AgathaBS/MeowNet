
import axios from "axios";
import { useAuthStore } from "../store/auth.store"

/*
 Main Axios instance used across the application.
 Automatically injects JWT token into requests.
*/

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

/*
 Add JWT token automatically before every request.
*/

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;