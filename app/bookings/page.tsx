"use client";

import MainLayout from "./../../components/layout/MainLayout";

export default function BookingsPage() {
  return (
    <MainLayout>
      <main className="p-8 mt-16">
        <h1 className="text-2xl font-bold mb-4">Bookings</h1>
        <p className="text-muted-foreground">Manage your hotel bookings here.</p>
      </main>
    </MainLayout>
  );
}