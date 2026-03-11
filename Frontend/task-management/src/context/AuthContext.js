"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [loading] = useState(false);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser({ id: data.id, email: data.email, role: data.role });
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
