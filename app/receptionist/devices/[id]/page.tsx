import { getRoomByNumber } from "@/data/data"
import ControlDeviceDetail from "@/components/Devices/ReceptionistDevice/ControlDeviceDetail"
import MainLayout from "@/components/Layout/MainLayout"

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  const room = await getRoomByNumber(params.id)
  if (!room) {
    return <div>Không tìm thấy phòng</div>
  }

  return (
    <MainLayout>
      <ControlDeviceDetail 
        room={room}
        devices={room.devices} 
      />
    </MainLayout>
  )
}


