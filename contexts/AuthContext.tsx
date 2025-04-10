"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  password: string;
  name: string;
  role: number;
}

interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const mockUsers = [
    { email: "admin@example.com", password: "1234567",name: "QuyBauTroi", role: 1 }, // Admin
    { email: "quy@gmail.com", password: "123", name: "LeTan", role: 2 }, // Lễ tân
    { email: "kythuat@gmail.com", password: "123", name: "KySu", role: 3 }, // Kỹ sư
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {!isLoading && children} {/* chỉ render khi đã load xong */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}