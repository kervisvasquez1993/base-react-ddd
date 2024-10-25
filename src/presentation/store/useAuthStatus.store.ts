import { create, StateCreator } from "zustand";
import { AuthStatus } from "../../infrastructure/interfaces/auth/auth.status";

import { devtools, persist } from "zustand/middleware";
import { authLogin } from "@/actions/auth/auth.action";

export interface AuthState {
  status: AuthStatus;
  token: string | null;
  login(email: string, password: string): Promise<boolean>;
}

const useAuth: StateCreator<AuthState, [["zustand/devtools", never]]> = (
  set
) => ({
  status: "checking",
  token: null,
  login: async (email, password) => {
    const response = await authLogin(email, password);
    if (!response) {
      console.log(response);
      set({ status: "unauthenticated", token: undefined });
      return false;
    }
    set({ status: "authenticated", token: response });
    return true;
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(useAuth, {
      name: "auth",
    })
  )
);
