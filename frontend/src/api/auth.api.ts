import { api } from "./client";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "../types/auth.types";

// Send login credentials to the backend API and retrieve JWT token.

export const login = async ( payload: LoginPayload ): Promise<AuthResponse> => {
 try {
  const response = await api.post( "/auth/login", payload );
  return response.data;
} catch (error) {
  // Allow React Query to handle API errors.
  console.error("Login request failed:", error);
  throw error;  }
  };

// Create a new user account.
export const register = async ( payload: RegisterPayload ): Promise<AuthResponse> => {
  try {
    const response = await api.post( "/auth/register", payload );
     return response.data;
    } catch (error) {
       // Allow frontend UI to display registration errors.
      console.error( "Registration request failed:", error );
       throw error; }
  };

  export const getMe = async () => {
  const res = await api.get("/profiles/me");
  return res.data;
};