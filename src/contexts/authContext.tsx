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
  loginStep: number;
  setLoginStep: Dispatch<SetStateAction<number>>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
  userId: "",
  setUserId: () => {},
  loginStep: 1,
  setLoginStep: () => {},
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const isAuthStorage =
    window.localStorage && localStorage.getItem(AuthedStorageKey);
  const useIdStorage = localStorage && localStorage.getItem(UserIdStorageKey);
  const [isAuth, setIsAuth] = useState(Boolean(isAuthStorage) || false);
  const [userId, setUserId] = useState(useIdStorage || "");
  const [loginStep, setLoginStep] = useState(1);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, userId, setUserId, loginStep, setLoginStep }}
    >
      {children}
    </AuthContext.Provider>
  );
}
