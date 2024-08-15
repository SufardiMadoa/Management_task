import { create } from 'zustand';
import { login } from "@/service/login";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      auth_token: null,
      authenticatedEmail: null,

      doLogin: async ({ email, password }) => {
        try {
          const data = await login({ email, password });

          if ( data.auth_token) {
            set({
              auth_token: data.auth_token,
              authenticatedEmail: email, // Save authenticated email
            });
          }
          return data;
        } catch (error) {
          throw error;
        }
      },

      doLogout: () => {
        set({
          auth_token: null,
          authenticatedEmail: null, // Clear authenticated email
        });
      },

     
    }),
    {
      name: 'auth-store',
    }
  )
);
