"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const AuthedStorageKey = "@auth-app_isAuth";
export const UserIdStorageKey = "@auth-app_useId";

type AuthContextType = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
  userId: "",
  setUserId: () => {},
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const isAuthStorage = localStorage.getItem(AuthedStorageKey);
  const useIdStorage = localStorage.getItem(UserIdStorageKey);
  const [isAuth, setIsAuth] = useState(Boolean(isAuthStorage) || false);
  const [userId, setUserId] = useState(useIdStorage || "");

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}
