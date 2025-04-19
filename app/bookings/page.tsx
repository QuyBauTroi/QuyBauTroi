"use client";
import MainLayout from "../../components/Layout/MainLayout";
import { RoomFilters } from "@/components/Rooms/RoomFilters";
import { Tabs, TabsList,TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { AddBookingDialog } from "@/components/Bookings/AddBookingDialog";
import { RoomTypesList } from "@/components/Rooms/RoomTypeList";
import { BookingFilters } from "@/components/Bookings/BookingFilter";
import { BookingList } from "@/components/Bookings/BookingList"


export default function BookingsPage() {
  const [ addBookingOpen , setAddBookingOpen ] = useState(false);

  return (
    <MainLayout>
      <main className="p-8 mt-16">
        <h1 className="text-2xl font-bold border-b-2 border-b-green-500 inline-block mb-2 uppercase">quản lý Đặt Phòng</h1>
        <p className="mb-2 text-green-700 font-light">Xem và quản lý tất cả các phòng trong khách sạn</p>
      </main>
      <Tabs className="ml-6" defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="mb-4 bg-green-100" >
            <TabsTrigger value="all">Tất cả đặt phòng</TabsTrigger>
            <TabsTrigger value="past">Đã hoàn thành</TabsTrigger>
            <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
          </TabsList>
          <Button onClick={() => setAddBookingOpen(true)} className="mr-5 bg-green-200 text-black hover:bg-gray-100">
            <PlusCircle className="w-5 h-5 mr-2"></PlusCircle>
            Đặt phòng mới
          </Button>
        </div>
        <TabsContent value="all" className="space-y-6">
          <BookingFilters/>
          <BookingList filter="all"/>
        </TabsContent>
        <TabsContent value="part" className="space-y-6">
          <BookingList filter="past"/>
        </TabsContent>
        <TabsContent value="cancelled" className="space-y-6">
        <BookingList filter="cancelled"/>
        </TabsContent>
      </Tabs>
      <AddBookingDialog open={addBookingOpen} onOpenChange={setAddBookingOpen}/>
    </MainLayout>
  );
}