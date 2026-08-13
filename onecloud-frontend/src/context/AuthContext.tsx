import {
  createContext,
  useMemo,
  useState,
  type ReactNode
} from "react";

import type {
  AuthContextType,
  LoginCredentials,
  LoginResult,
  User
} from "../types/auth";

import {
  authenticateUser,
  clearAuthentication,
  getStoredUser,
  isAuthenticated as checkAuthentication
} from "../services/auth/authService";


export const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);


interface AuthProviderProps {
  children: ReactNode;
}


export function AuthProvider({
  children
}: AuthProviderProps) {

  const [
    user,
    setUser
  ] = useState<User | null>(
    () => getStoredUser()
  );


  const [
    authenticated,
    setAuthenticated
  ] = useState<boolean>(
    () => checkAuthentication()
  );


  function login(
    credentials: LoginCredentials
  ): LoginResult {

    const result =
      authenticateUser(
        credentials
      );


    if (
      result.success &&
      result.user
    ) {

      setUser(result.user);

      setAuthenticated(true);
    }


    return result;
  }


  function logout() {

    clearAuthentication();

    setUser(null);

    setAuthenticated(false);
  }


  const value =
    useMemo<AuthContextType>(
      () => ({
        user,
        isAuthenticated:
          authenticated,
        login,
        logout
      }),
      [
        user,
        authenticated
      ]
    );


  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>
  );
}