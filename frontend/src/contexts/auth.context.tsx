import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/auth.service";
import type { User } from "../entities/user.entity";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<User | Error>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.fetchUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const login = async (username: string, password: string) => {
    const result = await authService.login(username, password);
    if (!(result instanceof Error)) setUser(result as User);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
