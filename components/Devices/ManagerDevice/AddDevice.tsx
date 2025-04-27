
"use client";

import { useState, useEffect } from "react";
import { Device, DeviceSettings, DeviceType } from "@/types/device";
import { Room } from "@/types/room";
import { deviceService } from "@/services/deviceService";
import { roomService } from "@/services/roomService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AddDeviceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeviceAdded?: () => void; // Callback để thông báo DevicesPage
}

export function AddDeviceDialog({ open, onOpenChange, onDeviceAdded }: AddDeviceDialogProps) {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [device, setDevice] = useState<Omit<Device, "id">>({
    type: "ac",
    name: "",
    status: "active",
    macAddress: "",
    model: "",
    firmware: "",
    installDate: new Date().toISOString().split("T")[0],
    manufacturer: "",
    serialNumber: "",
    isOnline: true,
    lastOnline: new Date().toISOString(),
    roomId: undefined,
    state: { power: false, temperature: 24, mode: "cool", fanSpeed: "auto" }, // Mặc định cho ac
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomData = await roomService.getAllRooms();
        setRooms(roomData);
        console.log("Rooms loaded in AddDeviceDialog:", roomData); // Debug
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Không thể tải danh sách phòng.");
      }
    };
    fetchRooms();
  }, []);

  const handleTypeChange = (type: DeviceType) => {
    let newState: DeviceSettings[DeviceType];
    switch (type) {
      case "ac":
        newState = { power: false, temperature: 29, mode: "cool", fanSpeed: "auto" };
        break;
      case "light":
        newState = { power: false, brightness: 100, color: "#ffffff" };
        break;
      case "tv":
        newState = { power: false, volume: 50, source: "hdmi1" };
        break;
      case "lock":
        newState = { locked: false, dndMode: false };
        break;
      case "coffee-machine":
        newState = { power: false, coffeeType: "espresso" };
        break;
      case "air-purifier":
        newState = { power: false, mode: "auto" };
        break;
      case "music-system":
        newState = { power: false, volume: 50, source: "bluetooth" };
        break;
      case "smart-shower":
        newState = { power: false, temperature: 38, mode: "normal" };
        break;
      default:
        throw new Error(`Unsupported device type: ${type}`);
    }
    setDevice((prev) => ({ ...prev, type, state: newState }));
  };

  const handleRoomChange = (roomId: string) => {
    const room = rooms.find((r) => r.room_id.toString() === roomId);
    if (room) {
      setDevice((prev) => ({ ...prev, roomId: room.room_id }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!device.roomId) {
      setError("Vui lòng chọn phòng.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await deviceService.createDevice(device);
      toast.success("Thiết bị đã được thêm.");
      onOpenChange(false);
      if (onDeviceAdded) onDeviceAdded(); // Gọi callback để làm mới DevicesPage
    } catch (error) {
      console.error("Error adding device:", error);
      setError("Không thể thêm thiết bị. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Thêm Mới Thiết Bị</DialogTitle>
            <DialogDescription>Nhập thông tin chi tiết cho thiết bị mới. Nhấn lưu khi hoàn tất.</DialogDescription>
          </DialogHeader>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="device-type">Loại Thiết Bị</Label>
              <Select value={device.type} onValueChange={handleTypeChange} required>
                <SelectTrigger id="device-type">
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
              <Input
                id="name-device"
                placeholder="Ví dụ: Điều Hòa, Đèn Chính..."
                value={device.name}
                onChange={(e) => setDevice({ ...device, name: e.target.value })}
                required
              />
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
                        Phòng {room.room_number} (Tầng {room.floor})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">Tầng</Label>
                <Input
                  id="floor"
                  value={device.roomId ? rooms.find((r) => r.room_id === device.roomId)?.floor ?? "" : ""}
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="device-model">Model</Label>
                <Input
                  id="device-model"
                  value={device.model}
                  onChange={(e) => setDevice({ ...device, model: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="device-serial">Số Serial</Label>
                <Input
                  id="device-serial"
                  value={device.serialNumber}
                  onChange={(e) => setDevice({ ...device, serialNumber: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mac-address">Địa chỉ MAC</Label>
              <Input
                id="mac-address"
                value={device.macAddress}
                onChange={(e) => setDevice({ ...device, macAddress: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu thiết bị"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
