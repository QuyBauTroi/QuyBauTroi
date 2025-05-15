"use client";
import { use } from 'react';
import { useEffect, useState } from "react";
import { Device, DeviceSettings, DeviceType } from "@/types/device";
import { Room } from "@/types/room";
import { deviceService } from "@/services/deviceService";
import { roomService } from "@/services/roomService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import MainLayout from "@/components/Layout/MainLayout";
import { toast } from "sonner";



export default function DeviceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [device, setDevice] = useState<Device | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deviceState, setDeviceState] = useState<DeviceSettings[DeviceType]>(() => {
    if (id === "light") {
      return { power: false, brightness: 100 } as DeviceSettings["light"];
    } else if (id === "ac") {
      return { power: false, temperature: 24, mode: "cool", fanSpeed: "medium" } as DeviceSettings["ac"];
    } else if (id === "tv") {
      return { power: false, volume: 50, source: "HDMI1" } as DeviceSettings["tv"];
    } else {
      return { power: false } as DeviceSettings[DeviceType];
    }
  });


  useEffect(() => {
    loadDevice();
  }, [id]);

  const loadDevice = async () => {
    try {
      setLoading(true);
      const [deviceData, roomData] = await Promise.all([
        deviceService.getDevice(id),
        roomService.getAllRooms(),
      ]);
      console.log("Device loaded:", deviceData); // Debug
      console.log("Rooms loaded:", roomData); // Debug
      setDevice(deviceData);
      setDeviceState(deviceData.state || { power: false });
      const matchedRoom = roomData.find((r) => r.room_id === deviceData.roomId);
      setRoom(matchedRoom || null);
      setError(null);
    } catch (error) {
      console.error("Error loading device:", error);
      setError("Không thể tải thông tin thiết bị.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Bạn có chắc muốn xóa thiết bị "${device?.name}"?`)) {
      return;
    }
    try {
      await deviceService.deleteDevice(id);
      toast(`Thiết bị ${device?.name} đã được xóa.`);
      router.push("/manager/devices");
    } catch (error) {
      console.error("Error deleting device:", error);
      toast("Không thể xóa thiết bị. Vui lòng thử lại.");
    }
  };

  const handleStateChange = async (newState: Partial<DeviceSettings[DeviceType]>) => {
    if (!device) return;
    try {
      const updatedState = { ...deviceState, ...newState };
      await deviceService.updateDeviceState(id, updatedState);
      setDeviceState(updatedState);
      toast( "Trạng thái thiết bị đã được cập nhật.");
    } catch (error) {
      console.error("Error updating device state:", error);
      toast.error("Không thể cập nhật trạng thái thiết bị.");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto mt-20">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (!device || error) {
    return (
      <MainLayout>
        <div className="container mx-auto mt-20">
          <p className="text-red-500">{error || "Thiết bị không tồn tại."}</p>
          <Button asChild>
            <Link href="/manager/devices">Quay lại</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const renderDeviceControls = () => {
    switch (device.type) {
      case "light":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Bật/Tắt</Label>
              <Switch
                checked={"power" in deviceState ? deviceState.power : false}
                onCheckedChange={(checked) => handleStateChange({ power: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>Độ sáng</Label>
              <Slider
                value={["brightness" in deviceState ? deviceState.brightness : 100]}
                onValueChange={([value]) => handleStateChange({ brightness: value })}
                max={100}
                step={1}
                className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-500"
              />
            </div>
          </div>
        );
      case "ac":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Bật/Tắt</Label>
              <Switch
                checked={"power" in deviceState ? deviceState.power : false}
                onCheckedChange={(checked) => handleStateChange({ power: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>Nhiệt độ</Label>
              <Slider
                value={device.type === "ac" && "temperature" in deviceState ? [deviceState.temperature || 24] : [24]}
                onValueChange={([value]) => handleStateChange({ temperature: value })}
                min={16}
                max={30}
                step={1}
                className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Tốc độ quạt</Label>
              <div className="flex gap-2">
                {["low", "medium", "high"].map((speed) => (
                  <Button
                    key={speed}
                    variant={device.type === "ac" && "fanSpeed" in deviceState && deviceState.fanSpeed === speed ? "default" : "outline"}
                    onClick={() => handleStateChange({ fanSpeed: speed })}
                  >
                    {speed.charAt(0).toUpperCase() + speed.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      case "tv":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Bật/Tắt</Label>
              <Switch
                checked={"power" in deviceState ? deviceState.power : false}
                onCheckedChange={(checked) => handleStateChange({ power: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>Âm lượng</Label>
              <Slider
                value={device.type === "tv" && "volume" in deviceState ? [deviceState.volume || 50] : [50]}
                onValueChange={([value]) => handleStateChange({ volume: value })}
                max={100}
                step={1}
                className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-500"
              />
            </div>
          </div>
        );
      default:
        return <p>Không có điều khiển cho loại thiết bị này.</p>;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto mt-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/manager/devices">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Chi tiết thiết bị: {device.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              asChild
            >
              <Link href={`/manager/devices/${device.id}/edit`}>
                <Settings className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Tên thiết bị:</span>
                <span className="font-medium">{device.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Loại thiết bị:</span>
                <span className="font-medium">{device.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Trạng thái:</span>
                <Badge
                  variant={
                    device.status === "active"
                      ? "default"
                      : device.status === "error"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {device.status === "active"
                    ? "Hoạt động"
                    : device.status === "error"
                    ? "Lỗi"
                    : "Bảo trì"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Online:</span>
                <Badge variant={device.isOnline ? "default" : "secondary"}>
                  {device.isOnline ? "Online" : "Offline"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Điều khiển thiết bị</CardTitle>
            </CardHeader>
            <CardContent>
              {renderDeviceControls()}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin vị trí</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Số phòng:</span>
                <span className="font-medium">{room ? room.room_number : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tầng:</span>
                <span className="font-medium">{room ? room.floor : "N/A"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin kỹ thuật</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Model:</span>
                <span className="font-medium">{device.model || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Nhà sản xuất:</span>
                <span className="font-medium">{device.manufacturer || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Số serial:</span>
                <span className="font-medium">{device.serialNumber || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Địa chỉ MAC:</span>
                <span className="font-medium">{device.macAddress || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Firmware:</span>
                <span className="font-medium">{device.firmware || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ngày cài đặt:</span>
                <span className="font-medium">
                  {device.installDate ? new Date(device.installDate).toLocaleDateString() : "Chưa cài đặt"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Lần online cuối:</span>
                <span className="font-medium">
                  {device.lastOnline ? new Date(device.lastOnline).toLocaleString() : "Chưa có"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
