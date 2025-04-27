"use client";
import { useEffect, useState } from "react";
import { Room } from "@/types/room";
import { Device } from "@/types/device";
import { deviceService } from "@/services/deviceService";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Power, Settings, Replace, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MainLayout from "@/components/Layout/MainLayout";
import { roomService } from "@/services/roomService";
import { AddDeviceDialog } from "@/components/Devices/ManagerDevice/AddDevice";
import { toast } from "sonner";

export default function DevicesPage() {
  const [addDeviceOpen, setAddDeviceOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      setLoading(true);
      const [deviceData, roomData] = await Promise.all([
        deviceService.getAllDevices(),
        roomService.getAllRooms(),
      ]);
      setDevices(deviceData);
      setRooms(roomData);
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Không thể tải dữ liệu thiết bị và phòng. Vui lòng thử lại.");
    }finally { 
      setLoading(false);
    }
  };

  const handleDeviceAdded = () => {
    loadDevices(); // Làm mới dữ liệu sau khi thêm thiết bị
  };

  const handlePowerToggle = async (device: Device) => {
    if (!("power" in device.state)) {
      toast.error("Thiết bị này không hỗ trợ bật/tắt nguồn.");
      return;
    }
    try {
      const updatedState = { ...device.state, power: !device.state.power };
      await deviceService.updateDeviceState(device.id, updatedState);
      toast.success(`Thiết bị "${device.name}" đã được cập nhật trạng thái.`);
      loadDevices(); // Làm mới danh sách thiết bị
    } catch (error) {
      console.error(`Error toggling power for device ${device.id}:`, error);
      toast.error("Không thể cập nhật trạng thái thiết bị. Vui lòng thử lại.");
    }
  };

  // Hàm tìm phòng theo roomId của thiết bị
  const getRoomInfo = (roomId?: number) => {
    if (!roomId) {
      console.warn("roomId is undefined"); // Debug
      return { floor: "N/A", roomNumber: "N/A" };
    }
    const room = rooms.find((r) => r.room_id === roomId);
    if (!room) {
      console.warn(`Room not found for roomId: ${roomId}`); // Debug
      return { floor: "N/A", roomNumber: "N/A" };
    }
    return {
      floor: room.floor,
      roomNumber: room.room_number,
    };
  };

  const handleDeleteDevice = async (device: Device) => {
    if (!window.confirm(`Bạn có chắc muốn xóa thiết bị "${device.name}"?`)) {
      return;
    }
    try {
      await deviceService.deleteDevice(device.id);
      toast.success(`Thiết bị ${device.name} đã được xóa.`);
      loadDevices();
    } catch (error) {
      console.error("Error deleting device:", error);
      toast.error("Không thể xóa thiết bị. Vui lòng thử lại.",);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto p-6 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý thiết bị</h1>
          <Button onClick={() => setAddDeviceOpen(true)} className="mr-5 bg-green-200 text-black hover:bg-gray-100">
            <PlusCircle className="w-5 h-5 mr-2" />
              Thêm thiết bị mới
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tầng</TableHead>
                <TableHead>Phòng</TableHead>
                <TableHead>Loại thiết bị</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Địa chỉ MAC</TableHead>
                <TableHead>Điều khiển</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device) => {
                const { floor, roomNumber} = getRoomInfo(device.roomId);
                return(
                  <TableRow key={device.id}>
                    <TableCell>{floor}</TableCell>
                    <TableCell>{roomNumber}</TableCell>
                    <TableCell>{device.type}</TableCell>
                    <TableCell className="text-black font-medium hover:black-500 hover:underline">
                      <Link href={`/manager/devices/${device.id}`} >
                          {device.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge className={"power" in device.state && device.state.power ? "bg-green-500" : "bg-red-500"}>
                        {"power" in device.state && device.state.power ? "Bật Nguồn" : "Tắt Nguồn"}
                      </Badge>
                    </TableCell>
                    <TableCell>{device.macAddress}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handlePowerToggle(device)}>
                        <Power className={`h-4 w-4 ${"power" in device.state && device.state.power ? "text-green-500" : "text-red-500"}`}/>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/manager/devices/${device.id}/edit`)}>
                            <Settings className="mr-2 h-4 w-4" />Sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/manager/devices/${device.id}/replace`)}>
                            <Replace className="mr-2 h-4 w-4" />Thay thế
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400" onClick={() => handleDeleteDevice(device)}>
                            <Trash className="mr-2 h-4 w-4 text-red-400" />Xóa Thiết Bị
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
              )})}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddDeviceDialog open={addDeviceOpen} onOpenChange={setAddDeviceOpen} onDeviceAdded={handleDeviceAdded}/>
    </MainLayout>
  );
}