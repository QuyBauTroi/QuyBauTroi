"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Auth from "@/components/Auth/Login";
import { useAuth } from "@/contexts/AuthContext";


interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser, logout, login } = useAuth();

  if (!currentUser) {
    return <Auth onLogin={({ email, role, name }) => login({ email, role, name, password: "" })} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={logout} />
      <div
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-26"}`}
      >
        <Header sidebarOpen={sidebarOpen} />
        {children}
      </div>
    </div>
  );
}