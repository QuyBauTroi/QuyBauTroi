"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditRoomDialog } from "@/components/Rooms/EditRoomDialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { ArrowLeft, Edit, Trash2, Calendar, ClipboardList, User,ThermometerSun,LightbulbIcon,Tv,DoorClosed,Coffee,Wifi } from "lucide-react"
import { getFullRoomData, getRoomStatusById, type Room, } from "@/lib/data/data"

interface RoomDetailPageProps {
  roomId: number
}

export function RoomDetailPage({ roomId }: RoomDetailPageProps) {
  const router = useRouter()
  const [room, setRoom] = useState<Room | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const rooms = getFullRoomData()
    const foundRoom = rooms.find((r) => r.room_id === roomId)
    setRoom(foundRoom || null)
    setLoading(false)
  }, [roomId])

  const handleEdit = () => {
    setIsEditDialogOpen(true)
  }
  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }
  const confirmDelete = () => {
    console.log(`Deleting room with ID: ${roomId}`)
    setIsDeleteDialogOpen(false)
    router.push("/rooms")
  }
  const getStatusBadge = (statusId: number) => {
    const status = getRoomStatusById(statusId)

    if (!status) return <Badge variant="outline">Không xác định</Badge>

    switch (status.status_name) {
      case "Trống":
        return <Badge className="bg-green-500 hover:bg-green-600">Trống</Badge>
      case "Đang sử dụng":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Đang sử dụng</Badge>
      case "Bảo trì":
        return <Badge variant="destructive">Bảo trì</Badge>
      case "Đang dọn dẹp":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Đang dọn dẹp
          </Badge>
        )
      default:
        return <Badge variant="outline">{status.status_name}</Badge>
    }
  }
  const getCleaningStatusBadge = (status: string) => {
    switch (status) {
      case "clean":
        return <Badge className="bg-green-500 hover:bg-green-600">Đã dọn dẹp</Badge>
      case "dirty":
        return <Badge variant="destructive">Chưa dọn dẹp</Badge>
      case "cleaning":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Đang dọn dẹp
          </Badge>
        )
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }
  if (!room) {
    return (
      <div>
        <div>
          <h2>Không tìm thấy phòng</h2>
          <p>Phòng bạn đang tìm kiếm không tồn tại</p>
        </div>
        <Button onClick={() => router.push("/rooms")} variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại danh sách phòng
        </Button>
      </div>
    )
  }



  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{`Phòng ${room.room_number}`}</h1>
          <p className="text-muted-foreground">{`Chi tiết thông tin về phòng ${room.room_number}`}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleEdit} variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Xóa phòng
          </Button>
        </div>
      </div>
      <Button onClick={() => router.push("/rooms")} variant="outline" className="mb-6 mt-2">
        <ArrowLeft className="mr-2 h-4 w-4 " />
        Quay lại danh sách phòng
      </Button>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
            <CardDescription>Thông tin chung về phòng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Số phòng</p>
                <p className="text-lg font-semibold">{room.room_number}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tầng</p>
                <p className="text-lg font-semibold">{room.floor}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Loại phòng</p>
              <p className="text-lg font-semibold">{room.room_type?.room_type_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Trạng thái</p>
              <div className="mt-1">{getStatusBadge(room.status_id)}</div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Trạng thái vệ sinh</p>
              <div className="mt-1">{getCleaningStatusBadge(room.cleaning_status)}</div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Lần cuối dọn dẹp</p>
              <p className="text-lg font-semibold">{room.last_cleaned || "Chưa có thông tin"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mô tả</p>
              <p className="text-base">{room.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin chi tiết</CardTitle>
            <CardDescription>Chi tiết về phòng và tiện nghi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Giá phòng</p>
                <p className="text-lg font-semibold">{room.room_type?.price_per_night} VND/đêm</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sức chứa</p>
                <p className="text-lg font-semibold">{room.capacity} người</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Đặt phòng tiếp theo</p>
              <p className="text-lg font-semibold">{room.next_booking || "Không có"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Thiết bị</p>
              <p className="text-lg font-semibold"></p>
            </div>
          </CardContent>
        </Card>
    
        <Card className="border-green-300 border-2">
            <CardHeader className="pb-2">
              <CardTitle>Trạng thái thiết bị</CardTitle>
              <CardDescription>Tình trạng các thiết bị trong phòng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 md:space-y-3">
                {room.devices.slice(0, 10).map((device) => (
                  <div key={device.id} className="flex justify-between items-center p-2 border-b">
                    <div className="flex items-center gap-2">
                      {device.type === "ac" ? (
                        <ThermometerSun className="h-4 w-4 text-orange-500" />) 
                        : device.type === "light" || device.type === "bedside-light" || device.type === "bathroom-light" ? (
                        <LightbulbIcon className="h-4 w-4 text-yellow-500" />
                      ) : device.type === "tv" ? (
                        <Tv className="h-4 w-4 text-blue-500" />
                      ) : device.type === "lock" ? (
                        <DoorClosed className="h-4 w-4 text-slate-500" />
                      ) : device.type === "coffee-machine" ? (
                        <Coffee className="h-4 w-4 text-amber-700" />
                      ) : (
                        <Wifi className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="text-sm">{device.name}</span>
                    </div>
                    <Badge
                      variant={
                        device.status === "active"
                          ? "outline"
                          : device.status === "error"
                            ? "destructive"
                            : "secondary"
                      }
                      className={device.status === "active" ? "bg-green-50" : ""}
                    >
                      {device.status === "active"
                        ? "Hoạt động"
                        : device.status === "error"
                          ? "Lỗi"
                          : device.status === "maintenance"
                            ? "Bảo trì"
                            : "Không hoạt động"}
                    </Badge>
                  </div>
                ))}
                {room.devices.length > 8 && (
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    Xem thêm {room.devices.length - 8} thiết bị
                  </Button>
                )}
              </div>
            </CardContent>
        </Card>
  
      </div>

      <Tabs defaultValue="bookings" className="mt-6">
        <TabsList>
          <TabsTrigger value="bookings">Lịch sử đặt phòng</TabsTrigger>
          <TabsTrigger value="maintenance">Lịch sử bảo trì</TabsTrigger>
          <TabsTrigger value="cleaning">Lịch sử dọn dẹp</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Lịch sử đặt phòng
              </CardTitle>
              <CardDescription>Danh sách các lần đặt phòng gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <ClipboardList className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2">Chưa có dữ liệu lịch sử đặt phòng</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trash2 className="mr-2 h-5 w-5" />
                Lịch sử bảo trì
              </CardTitle>
              <CardDescription>Danh sách các lần bảo trì gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <ClipboardList className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2">Chưa có dữ liệu lịch sử bảo trì</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cleaning" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Lịch sử dọn dẹp
              </CardTitle>
              <CardDescription>Danh sách các lần dọn dẹp gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <ClipboardList className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2">Chưa có dữ liệu lịch sử dọn dẹp</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Room Dialog 
      {room && <EditRoomDialog room={room} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />}  */}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Phòng này sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
