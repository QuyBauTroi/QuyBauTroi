"use client";
import MainLayout from "../../components/Layout/MainLayout";
import { RoomFilters } from "@/components/Rooms/RoomFilters";
import { Tabs, TabsList,TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { AddRoomDialog } from "@/components/Rooms/AddRoomDialog";
import { RoomTypesList } from "@/components/Rooms/RoomTypeList";
import { RoomsList } from "@/components/Rooms/RoomsList";

export default function BookingsPage() {
  const [ addRoomOpen , setAddRoomOpen ] = useState(false);

  return (
    <MainLayout>
      <main className="p-8 mt-16">
        <h1 className="text-2xl font-bold border-b-2 border-b-green-500 inline-block mb-2 uppercase">Quản lý Phòng</h1>
        <p className="mb-2 text-green-700 font-light">Xem và quản lý các phòng trong khách sạn</p>
      </main>
      <Tabs className="ml-6" defaultValue="roomlist">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="mb-4 bg-green-100" >
            <TabsTrigger value="roomlist">Danh sách phòng</TabsTrigger>
            <TabsTrigger value="typeroom">Kiểu phòng</TabsTrigger>
          </TabsList>
          <Button onClick={() => setAddRoomOpen(true)} className="mr-5 bg-green-200 text-black hover:bg-gray-100">
            <PlusCircle className="w-5 h-5 mr-2"></PlusCircle>
            Thêm phòng mới
          </Button>
        </div>
        <TabsContent value="roomlist" className="space-y-6">
          <RoomFilters/>
          <RoomsList/>
        </TabsContent>
        <TabsContent value="typeroom" className="space-y-6">
          <RoomTypesList/>
        </TabsContent>
      </Tabs>
      <AddRoomDialog open={addRoomOpen} onOpenChange={setAddRoomOpen}/>
    </MainLayout>
  );
}