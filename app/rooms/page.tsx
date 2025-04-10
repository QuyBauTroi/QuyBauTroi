"use client";
import MainLayout from "../../components/Layout/MainLayout";
import { Card } from "@/components/ui/card"
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
        <h1 className="text-2xl font-bold border-b-2 border-b-blue-500 inline-block mb-2 uppercase">Rooms</h1>
        <p className="mb-2 text-blue-700 font-light">View and manage all rooms in the hotel</p>
      </main>
      
      <Tabs className="ml-6" defaultValue="roomlist">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="mb-4 bg-blue-100" >
            <TabsTrigger value="roomlist">Room List</TabsTrigger>
            <TabsTrigger value="typeroom">Room Type</TabsTrigger>
          </TabsList>
          <Button onClick={() => setAddRoomOpen(true)} className="mr-5 bg-blue-200 text-black hover:bg-gray-300">
            <PlusCircle className="w-5 h-5 mr-2"></PlusCircle>
            Add New Room
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