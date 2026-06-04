import { create } from "zustand";

import type { User } from "../types/auth.types";

/**
 * Global authentication store.
 *
 * Handles:
 * - authenticated user
 * - JWT token
 * - login persistence
 * - logout
 *
 * The store is resilient to corrupted
 * localStorage values.
 */

interface AuthState {
  user: User | null;

  token: string | null;

  isAuthenticated: boolean;

  /**
   * Persist authenticated user and token.
   */
  setAuth: (
    user: User,
    token: string
  ) => void;

  /**
   * Clear authentication state.
   */
  logout: () => void;
}

/**
 * Safely restore a user object from localStorage.
 *
 * Returns null if:
 * - key does not exist
 * - value is invalid
 * - value is "undefined"
 * - JSON parsing fails
 */
function getStoredUser(): User | null {
  try {
    const storedUser =
      localStorage.getItem("user");

    if (
      !storedUser ||
      storedUser === "undefined" ||
      storedUser === "null"
    ) {
      return null;
    }

    return JSON.parse(storedUser) as User;
  } catch (error) {
    console.error(
      "Failed to restore user from localStorage:",
      error
    );

    localStorage.removeItem("user");

    return null;
  }
}

/**
 * Safely restore JWT token.
 */
function getStoredToken(): string | null {
  const token =
    localStorage.getItem("token");

  if (
    !token ||
    token === "undefined" ||
    token === "null"
  ) {
    return null;
  }

  return token;
}

export const useAuthStore =
  create<AuthState>((set) => {
    const user = getStoredUser();

    const token = getStoredToken();

    return {
      user,

      token,

      isAuthenticated: !!token,

      setAuth: (user, token) => {
        /**
         * Persist JWT token.
         */
        localStorage.setItem(
          "token",
          token
        );

        /**
         * Persist authenticated user.
         */
        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        /**
         * Remove persisted authentication data.
         */
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    };
  });