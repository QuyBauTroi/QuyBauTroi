"use client";

import MainLayout from "@/components/layout/MainLayout";
import {DashboardStats} from "@/components/Dashboard/Dashboard-stats";
import { RoomStats } from "@/components/Dashboard/Room-stats";
import { RoomTypeDistribution } from "@/components/Dashboard/Room-type-distribution"; 
import { RoomOccupancy } from "@/components/Dashboard/Room-occupancy";

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