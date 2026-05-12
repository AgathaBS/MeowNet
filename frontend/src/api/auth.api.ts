import { api } from "./axios";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "../types/auth.types";

// Send login credentials to the backend API.
export const login = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

// Create a new user account.
export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};