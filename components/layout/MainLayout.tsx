"use client";
import Navbar from "./Navbar";
import Header from "./Header";
import Auth from "@/components/Auth/Login";
import { useAuth } from "@/contexts/AuthContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { currentUser, logout, login } = useAuth();

  if (!currentUser) {
    return <Auth onLogin={({ email, role, name }) => login({ email, role, name, password: "" })} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Navbar onLogout={logout} role={currentUser.role.toString()} />
      <div className={`flex-1 transition-all duration-300 md:ml-65 ml-0`}>
        {children}
      </div>
    </div>
  );
}