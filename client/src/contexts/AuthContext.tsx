import { ReactNode, createContext, useContext } from "react";
import { api } from "../utils/api";
import { AxiosResponse } from "axios";

type AuthContext = {
  signup: (user: User) => Promise<AxiosResponse>;
};

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context) as AuthContext;
}

type AuthProviderProps = {
  children: ReactNode;
};

export type User = {
  email: string;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const signup = async (user: User) => {
    const res = await api.post("/signup", user);

    return res;
  };

  return <Context.Provider value={{ signup }}>{children}</Context.Provider>;
}
