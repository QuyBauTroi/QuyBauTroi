"use client";

import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Header from "../components/layout/Header";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-85' : 'ml-20'}`}>
        <Header sidebarOpen={sidebarOpen} />
        
        
      </div>
    </div>
  );
}