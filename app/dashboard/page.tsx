"use client";
import MainLayout from "@/components/Layout/MainLayout";
import {DashboardStats} from "@/components/Dashboard/DashboardStats";
import { RoomStats } from "@/components/Dashboard/RoomStats";
import { RoomTypeDistribution } from "@/components/Dashboard/RoomTypeDistribution"; 
import { RoomOccupancy } from "@/components/Dashboard/RoomOccupancy";

export default function Dashboard() {
  return (
    <MainLayout>
      <main className="p-8 mt-16">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardStats/>
        </div>
        <div className="grid gap-4 mt-5">
          <RoomStats/>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RoomOccupancy className="lg:col-span-5"/>
          <RoomTypeDistribution className="lg:col-span-2"/>
          </div>
      </main>
    </MainLayout>
  );
}