"use client";
import MainLayout from "@/components/Layout/MainLayout";
import {DashboardStats} from "@/components/Dashboard/DashboardStats";
import { RoomStats } from "@/components/Dashboard/RoomStats";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

export default function DashboardReceptionist() {
  return (
    <ProtectedRoute allowedRoles={[2]}>
      <MainLayout>
      <main className="p-8 mt-16">
        <h1 className="text-3xl font-bold mb-4 border-b-2 border-green-400 inline-block">Tổng Quan</h1>
        <p className="mb-4">Xem trạng thái tổng quan của các phòng trong khách sạn</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardStats/>
        </div>
        <div className="grid gap-4 mt-5">
          <RoomStats/>
        </div>
        
      </main>
    </MainLayout>
    </ProtectedRoute>
    
  );
}