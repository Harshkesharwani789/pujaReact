import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuth = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAdmin: false,
      user: null,

      login: (userData) =>
        set({
          isAuthenticated: true,
          user: userData,
          isAdmin: userData.isAdmin || false,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          isAdmin: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuth;
