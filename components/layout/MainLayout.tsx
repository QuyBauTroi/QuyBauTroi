"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-40'}`}>
        <Header sidebarOpen={sidebarOpen} />
        {children}
      </div>
    </div>
  );
}