"use client"
import { useState } from "react";
import { Device } from "@/types/device";
import { Room } from "@/types/room";
import { deviceService } from "@/services/deviceService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import Link from "next/link";

interface AddDeviceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddDeviceDialog({ open, onOpenChange }: AddDeviceDialogProps) {
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [device, setDevice] = useState<Omit<Device, "id">>({
      type: "",
      name: "",
      status: "active",
      settings: {},
      macAddress: "",
      model: "",
      firmware: "",
      installDate: new Date().toISOString().split("T")[0],
      manufacturer: "",
      serialNumber: "",
      isOnline: true,
      lastOnline: new Date().toISOString(),
      roomId: 0,
      roomNumber: "",
      floor: 0,
      state: {
        power: false
      }
    });

    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const response = await fetch('http://localhost:3001/rooms');
          const data = await response.json();
          setRooms(data);
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      };
      fetchRooms();
    }, []);

    const handleRoomChange = (roomId: string) => {
      const room = rooms.find(r => r.room_id.toString() === roomId);
      if (room) {
        setSelectedRoom(room);
        setDevice(prev => ({
          ...prev,
          roomId: room.room_id
        }));
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        await deviceService.createDevice(device);
        onOpenChange(false);
      } catch (error) {
        console.error('Error adding device:', error);
      } finally {
        setLoading(false);
      }
    }

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Thêm Mới Thiết Bị</DialogTitle>
              <DialogDescription>Nhập thông tin chi tiết cho thiết bị mới. Nhấn lưu khi hoàn tất.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="device-type">Loại Thiết Bị</Label>
                <Select value={device.type} onValueChange={(value) => setDevice({ ...device, type: value })} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Chọn loại thiết bị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ac">Điều hòa</SelectItem>
                    <SelectItem value="light">Đèn</SelectItem>
                    <SelectItem value="tv">TV</SelectItem>
                    <SelectItem value="lock">Khóa cửa</SelectItem>
                    <SelectItem value="coffee-machine">Máy pha cà phê</SelectItem>
                    <SelectItem value="air-purifier">Máy lọc không khí</SelectItem>
                    <SelectItem value="music-system">Hệ thống âm thanh</SelectItem>
                    <SelectItem value="smart-shower">Vòi sen thông minh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name-device">Tên Thiết Bị</Label>
                <Input id="name-device" placeholder="Ví Dụ : Điều Hòa, TV, ..." value={device.name} onChange={(e) => setDevice({ ...device, name: e.target.value })} required/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="room">Phòng</Label>
                  <Select value={device.roomId?.toString() || ""} onValueChange={handleRoomChange} required>
                    <SelectTrigger id="room">
                      <SelectValue placeholder="Chọn phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.room_id} value={room.room_id.toString()}>
                          Phòng {room.room_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor">Tầng</Label>
                  <Input 
                    id="floor" 
                    value={selectedRoom ? `Tầng ${selectedRoom.floor}` : ''} 
                    disabled 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="device-model">Model</Label>
                  <Input id="device-model" value={device.model} onChange={(e) => setDevice({ ...device, model: e.target.value })} required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="device-serial">Số Serial</Label>
                  <Input id="device-serial" value={device.serialNumber} onChange={(e) => setDevice({ ...device, serialNumber: e.target.value })} required/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mac-address">Địa chỉ MAC</Label>
                <Input id="mac-address" value={device.macAddress} onChange={(e) => setDevice({ ...device, macAddress: e.target.value })} required/>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? 'Đang lưu...' : 'Lưu thiết bị'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
}
