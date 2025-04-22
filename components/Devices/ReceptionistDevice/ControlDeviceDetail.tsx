"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RoomDeviceControl from "@/components/RoomDeviceControl/RoomDeviceControl"
import type { Device } from "@/lib/data/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, Info, MapPin, Maximize2, Users, BedDouble, Home, ThermometerSun, Wifi, Tv, LightbulbIcon, Coffee, DoorClosed } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


interface ControlDeviceDetailProps {
  room: {
    room_number: string
    floor?: number
    room_type?: {
      room_type_name: string
    } | null
    status_id?: number
    capacity?: number
    status?: {
      status_name: string
    } | null
    last_cleaned?: string
    devices: Device[]
  }
  devices: Device[]
}

export default function ControlDeviceDetail({ room, devices }: ControlDeviceDetailProps) {
  return (
    <div className="flex flex-col space-y-4 p-4 md:p-8 md:pt-18">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:mt-5 mt-15">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Phòng {room.room_number}</h2>
              <div className="flex items-center text-sm md:text-base text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Tầng {room.floor}</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="outline" className="ml-1">
                  {room.room_type?.room_type_name}
                </Badge>
                {room.status_id === 2 && (
                  <Badge variant="secondary" className="ml-2">
                    Đang sử dụng
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" className="bg-green-200 w-fit" asChild>
              <Link href="/receptionist/devices">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Quay lại
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <Info className="h-4 w-4 mr-2" />
              Lịch sử
            </Button>
            <Button size="sm" className="text-black bg-green-200 flex-1 md:flex-none">
              <CheckCircle className="h-4 w-4 mr-2" />
              Kiểm tra phòng
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="border-green-300 border-2">
            <CardHeader className="pb-2">
              <CardTitle>Thông tin phòng</CardTitle>
              <CardDescription>Chi tiết và trạng thái phòng {room.room_number}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                <div>
                  <Image
                    src="/placeholder.svg"
                    alt={`Phòng ${room.room_number}`}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full aspect-video"
                  />
                  <div className="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">
                        Diện tích: {getRoomSize(room.room_type?.room_type_name || "")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">Sức chứa: {room.capacity} người</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedDouble className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">
                        Giường:{" "}
                        {room.room_type?.room_type_name === "Standard"
                          ? "1 giường đôi"
                          : room.room_type?.room_type_name === "Deluxe"
                            ? "1 giường king"
                            : room.room_type?.room_type_name === "Suite"
                              ? "2 giường queen"
                              : "2 giường king"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">Loại: {room.room_type?.room_type_name}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div className="p-2 md:p-3 bg-slate-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Nhiệt độ</div>
                      <div className="flex items-center mt-1">
                        <ThermometerSun className="h-4 w-4 md:h-5 md:w-5 text-orange-500 mr-2" />
                        <span className="text-lg md:text-xl font-medium">24°C</span>
                      </div>
                    </div>
                    <div className="p-2 md:p-3 bg-slate-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Độ ẩm</div>
                      <div className="flex items-center mt-1">
                        <Wifi className="h-4 w-4 md:h-5 md:w-5 text-blue-500 mr-2" />
                        <span className="text-lg md:text-xl font-medium">55%</span>
                      </div>
                    </div>
                    <div className="p-2 md:p-3 bg-slate-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Trạng thái</div>
                      <div className="flex items-center mt-1">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
                        <span className="text-lg md:text-xl font-medium">{room.status?.status_name}</span>
                      </div>
                    </div>
                    <div className="p-2 md:p-3 bg-slate-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Vệ sinh</div>
                      <div className="flex items-center mt-1">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
                        <span className="text-lg md:text-xl font-medium">{room.last_cleaned}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 md:p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Tính năng phòng</h3>
                    <div className="grid grid-cols-2 gap-y-2">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">Wifi tốc độ cao</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tv className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">Smart TV</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThermometerSun className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">Điều hòa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LightbulbIcon className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">Đèn thông minh</span>
                      </div>
                      {(room.room_type?.room_type_name === "Deluxe" ||
                        room.room_type?.room_type_name === "Suite" ||
                        room.room_type?.room_type_name === "Presidential Suite") && (
                          <div className="flex items-center gap-2">
                            <Coffee className="h-4 w-4 text-slate-400" />
                            <span className="text-sm">Máy pha cà phê</span>
                          </div>
                        )}
                      {(room.room_type?.room_type_name === "Suite" ||
                        room.room_type?.room_type_name === "Presidential Suite") && (
                          <div className="flex items-center gap-2">
                            <DoorClosed className="h-4 w-4 text-slate-400" />
                            <span className="text-sm">Phòng riêng biệt</span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-green-300 border-2">
            <CardHeader className="pb-2">
              <CardTitle>Trạng thái thiết bị</CardTitle>
              <CardDescription>Tình trạng các thiết bị trong phòng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 md:space-y-3">
                {room.devices.slice(0, 8).map((device) => (
                  <div key={device.id} className="flex justify-between items-center p-2 border-b">
                    <div className="flex items-center gap-2">
                      {device.type === "ac" ? (
                        <ThermometerSun className="h-4 w-4 text-orange-500" />
                      ) : device.type === "light" ||
                        device.type === "bedside-light" ||
                        device.type === "bathroom-light" ? (
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
      </div>

      <Tabs defaultValue="control" className="space-y-4">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="control" className="flex-1 md:flex-none">Điều khiển thiết bị</TabsTrigger>
          <TabsTrigger value="layout" className="flex-1 md:flex-none">Sơ đồ phòng</TabsTrigger>
          <TabsTrigger value="history" className="flex-1 md:flex-none">Lịch sử hoạt động</TabsTrigger>
        </TabsList>

        <TabsContent value="control">
          <RoomDeviceControl
            roomType={room.room_type?.room_type_name || ""}
            devices={devices}
            roomNumber={room.room_number}
          />
        </TabsContent>

        <TabsContent value="layout">
          <Card className="border-green-300 border-2">
            <CardHeader>
              <CardTitle>Sơ đồ phòng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Sơ đồ phòng {room.room_type?.room_type_name}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="border-green-300 border-2">
            <CardHeader>
              <CardTitle>Lịch sử hoạt động</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Thêm lịch sử hoạt động ở đây */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to get room size based on room type
function getRoomSize(roomType: string): string {
  switch (roomType) {
    case "Standard":
      return "25m²"
    case "Deluxe":
      return "35m²"
    case "Suite":
      return "50m²"
    case "Presidential Suite":
      return "100m²"
    default:
      return "25m²"
  }
}