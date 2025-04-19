"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, } from "lucide-react"
import Link from "next/link"
import { getFullRoomData, type Room } from "@/data/data"
import RoomCard from "./RoomDeviceCard"

export default function RoomsStatus() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    roomType: "all",
    status: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Lấy dữ liệu phòng khi component mount
    const roomData = getFullRoomData()
    setRooms(roomData)
    setLoading(false)
  }, [])

  // Lọc phòng dựa trên bộ lọc và từ khóa tìm kiếm
  const filteredRooms = rooms.filter((room) => {
    // Lọc theo loại phòng
    if (filter.roomType !== "all" && room.room_type?.room_type_name.toLowerCase() !== filter.roomType) {
      return false
    }

    // Lọc theo trạng thái
    if (filter.status !== "all") {
      const hasErrorDevice = room.devices.some((device) => device.status === "error")
      const hasMaintenanceDevice = room.devices.some((device) => device.status === "maintenance")
      if (filter.status === "error" && !hasErrorDevice) return false
      if (filter.status === "maintenance" && !hasMaintenanceDevice) return false
      if (filter.status === "active" && (hasErrorDevice || hasMaintenanceDevice)) return false
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery) {
      return room.room_number.toLowerCase().includes(searchQuery.toLowerCase())
    }

    return true
  })

  if (loading) {
    return <div>Đang tải...</div>
  }

  return (
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm phòng..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Select
              value={filter.roomType}
              onValueChange={(value) => setFilter((prev) => ({ ...prev, roomType: value }))}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Loại phòng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại phòng</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="presidential suite">President Suite</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filter.status} onValueChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="maintenance">Bảo trì</SelectItem>
                <SelectItem value="error">Lỗi</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="grid" className="space-y-4">
          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRooms.map((room) => {
                // Xác định trạng thái hiển thị
                const hasErrorDevice = room.devices.some((device) => device.status === "error")
                const hasMaintenanceDevice = room.devices.some((device) => device.status === "maintenance")
                let displayStatus = "active"

                if (hasErrorDevice) {
                  displayStatus = "error"
                } else if (hasMaintenanceDevice || room.status?.status_name === "Bảo trì") {
                  displayStatus = "maintenance"
                }

                return (
                  <RoomCard
                    key={room.room_id}
                    roomNumber={room.room_number}
                    status={displayStatus as any}
                    roomType={(room.room_type?.room_type_name?.toLowerCase() || "standard") as any}
                  />
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
  )
}


