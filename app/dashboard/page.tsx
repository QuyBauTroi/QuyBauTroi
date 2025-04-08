"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Calendar, DoorOpen, DoorClosed, BedDouble } from "lucide-react";
import {DashboardStats} from "@/components/Dashboard/Dashboard-stats";
import { RoomStats } from "@/components/Dashboard/Room-stats";
import { useState } from "react";

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
      </main>
    </MainLayout>
    
  );
}