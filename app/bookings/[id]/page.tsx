import { BookingDetailPage } from "@/components/Rooms/RoomDetail";
import MainLayout from "@/components/Layout/MainLayout";

export default async function BookingDetail({ params }: { params: { id: string } }) {
  const bookingId = Number.parseInt(params.id)

  return (
    <MainLayout>
        <main className="p-8 mt-16">
        <BookingDetailPage bookingId={bookingId} /></main> 
    </MainLayout>
  ) 
}
