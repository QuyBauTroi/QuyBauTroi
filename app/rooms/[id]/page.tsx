import { RoomDetailPage } from "@/components/Rooms/RoomDetail";
import MainLayout from "@/components/Layout/MainLayout";

export default async function RoomDetail({ params }: { params: { id: string } }) {
  const roomId = Number.parseInt(params.id)

  return (
    <MainLayout>
        <main className="p-8 mt-16">
        <RoomDetailPage roomId={roomId} /></main> 
    </MainLayout>
  ) 
}
