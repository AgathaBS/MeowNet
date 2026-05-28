import { create } from "zustand";

import type { User } from "../types/auth.types";

/*
  Global authentication store.

  Handles:
  - authenticated user
  - JWT token
  - login state persistence
*/

interface AuthState {
  user: User | null;

  token: string | null;

  isAuthenticated: boolean;

//Save authenticated user and JWT token.
  setAuth: (user: User, token: string) => void;

  //Clear authentication state.
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  //Restore persisted user from localStorage.
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,

  //Restore JWT token.
  token: localStorage.getItem("token"),

  //Check if user is authenticated.
  isAuthenticated: !!localStorage.getItem("token"),

  setAuth: (user, token) => {
    //Persist JWT token.
    localStorage.setItem("token", token);

    //Persist authenticated user.
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

    //Remove persisted authentication data.
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));