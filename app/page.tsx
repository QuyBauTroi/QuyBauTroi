"use client";
import MainLayout from "@/components/Layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <MainLayout>
      <main className="p-8 mt-16">
        <h1 className="text-2xl font-bold mb-4">Welcome to Hotel Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Hello, <span className="text-2xl font-bold text-blue-400">{currentUser?.name}</span> 
        </p>
      </main>
    </MainLayout>
  );
}