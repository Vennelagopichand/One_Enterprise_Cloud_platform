export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  employeeId: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: User;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    credentials: LoginCredentials
  ) => LoginResult;
  logout: () => void;
}
