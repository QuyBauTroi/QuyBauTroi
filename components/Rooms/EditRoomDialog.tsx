"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Room, roomTypeData, roomStatusData, deviceData, getRoomAmenitiesByRoomId } from "@/lib/data/data"

interface EditRoomDialogProps {
  room: Room
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditRoomDialog({ room, open, onOpenChange }: EditRoomDialogProps) {
  const [formData, setFormData] = useState({
    room_number: "",
    room_type_id: "",
    status_id: "",
    capacity: "",
    description: "",
    cleaning_status: "",
    last_cleaned: "",
    amenities: [] as number[],
  })

  useEffect(() => {
    if (room) {
      const roomAmenities = getRoomAmenitiesByRoomId(room.room_id)
      const amenityIds = roomAmenities.map((ra) => ra.device_id)
      setFormData({
        room_number: room.room_number,
        room_type_id: room.room_type_id.toString(),
        status_id: room.status_id.toString(),
        capacity: room.capacity.toString(),
        description: room.description,
        cleaning_status: room.cleaning_status,
        last_cleaned: room.last_cleaned || "",
        amenities: amenityIds,
      })
    }
  }, [room])

  const handleAmenityChange = (amenityId: number, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityId],
      })
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((id) => id !== amenityId),
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the room in your database here
    console.log("Updating room:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa phòng {room.room_number}</DialogTitle>
            <DialogDescription>Chỉnh sửa thông tin chi tiết cho phòng. Nhấn lưu khi hoàn tất.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Thông tin chung</TabsTrigger>
              <TabsTrigger value="amenities">Tiện nghi</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-room-number">Số phòng</Label>
                  <Input
                    id="edit-room-number"
                    value={formData.room_number}
                    onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-room-floor">Tầng</Label>
                  <Select
                    value={room.floor?.toString()}
                    onValueChange={(value) => console.log("Floor changed:", value)}
                    disabled
                  >
                    <SelectTrigger id="edit-room-floor">
                      <SelectValue placeholder="Chọn tầng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Tầng 1</SelectItem>
                      <SelectItem value="2">Tầng 2</SelectItem>
                      <SelectItem value="3">Tầng 3</SelectItem>
                      <SelectItem value="4">Tầng 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-room-type">Loại phòng</Label>
                <Select
                  value={formData.room_type_id}
                  onValueChange={(value) => setFormData({ ...formData, room_type_id: value })}
                  required
                >
                  <SelectTrigger id="edit-room-type">
                    <SelectValue placeholder="Chọn loại phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypeData.map((type) => (
                      <SelectItem key={type.room_type_id} value={type.room_type_id.toString()}>
                        {type.room_type_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-room-status">Trạng thái</Label>
                <Select
                  value={formData.status_id}
                  onValueChange={(value) => setFormData({ ...formData, status_id: value })}
                  required
                >
                  <SelectTrigger id="edit-room-status">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomStatusData.map((status) => (
                      <SelectItem key={status.status_id} value={status.status_id.toString()}>
                        {status.status_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-room-capacity">Sức chứa (người)</Label>
                  <Input
                    id="edit-room-capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-cleaning-status">Trạng thái vệ sinh</Label>
                  <Select
                    value={formData.cleaning_status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, cleaning_status: value as "clean" | "dirty" | "cleaning" })
                    }
                    required
                  >
                    <SelectTrigger id="edit-cleaning-status">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clean">Đã dọn dẹp</SelectItem>
                      <SelectItem value="dirty">Chưa dọn dẹp</SelectItem>
                      <SelectItem value="cleaning">Đang dọn dẹp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-room-description">Mô tả</Label>
                <Input
                  id="edit-room-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-room-last-cleaned">Lần cuối dọn dẹp</Label>
                <Input
                  id="edit-room-last-cleaned"
                  type="date"
                  value={formData.last_cleaned}
                  onChange={(e) => setFormData({ ...formData, last_cleaned: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="pt-4">
              <div className="space-y-2">
                <Label>Tiện nghi</Label>
                <div className="grid grid-cols-2 gap-4">
                  {deviceData.map((device) => (
                    <div key={device.device_id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-device-${device.device_id}`}
                        checked={formData.amenities.includes(device.device_id)}
                        onCheckedChange={(checked) => handleAmenityChange(device.device_id, checked as boolean)}
                      />
                      <label
                        htmlFor={`edit-device-${device.device_id}`}
                        className="text-sm font-medium leading-none"
                      >
                        {device.device_name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
