"use client";
import MainLayout from "@/components/Layout/MainLayout";
import DeviceFilter from "@/components/Devices/ReceptionistDevice/DeviceFilter"
import RoomCard from "@/components/Devices/ReceptionistDevice/RoomDeviceCard";

export default function DeviceReceptionist() {
  return (
    <MainLayout>
      <main className="p-8 mt-16">
        <h1 className="text-3xl font-bold mb-4">Điều Khiển Thiết Bị Phòng</h1>
        <p className="mb-4">Xem và điều khiển trạng thái của tất cả các thiết bị phòng trong khách sạn</p>
        <div className="">
          <DeviceFilter/>
        </div>
      </main>
    </MainLayout>
  );
}