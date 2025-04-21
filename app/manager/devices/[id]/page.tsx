"use client";

import { useEffect, useState } from "react";
import { Device } from "@/types/device";
import { deviceService } from "@/services/deviceService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Trash2, Power, Volume2, Sun, Snowflake } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DeviceDetailPageProps {
  params: {
    id: string;
  };
}

export default function DeviceDetailPage({ params }: DeviceDetailPageProps) {
  const router = useRouter();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [deviceState, setDeviceState] = useState<any>({});

  useEffect(() => {
    loadDevice();
  }, [params.id]);

  const loadDevice = async () => {
    try {
      const data = await deviceService.getDevice(params.id);
      setDevice(data);
      setDeviceState(data.settings || {});
    } catch (error) {
      console.error("Error loading device:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deviceService.deleteDevice(params.id);
      router.push("/manager/devices");
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const handleStateChange = async (newState: any) => {
    if (!device) return;
    try {
      await deviceService.updateDevice(params.id, {
        settings: { ...device.settings, ...newState }
      });
      setDeviceState((prev: any) => ({ ...prev, ...newState }));
    } catch (error) {
      console.error("Error updating device state:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!device) {
    return <div>Thiết bị không tồn tại</div>;
  }

  const renderDeviceControls = () => {
    switch (device.type) {
      case "light":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Bật/Tắt</Label>
              <Switch
                checked={deviceState.power}
                onCheckedChange={(checked) => handleStateChange({ power: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>Độ sáng</Label>
              <Slider
                value={[deviceState.brightness || 0]}
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
                checked={deviceState.power}
                onCheckedChange={(checked) => handleStateChange({ power: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>Nhiệt độ</Label>
              <Slider
                value={[deviceState.temperature || 26]}
                onValueChange={([value]) => handleStateChange({ temperature: value })}
                min={16}
                max={30}
                step={1}
                className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Chế độ tiết kiệm</Label>
              <Switch
                checked={deviceState.energySaving}
                onCheckedChange={(checked) => handleStateChange({ energySaving: checked })}
              />
            </div>
          </div>
        );
      case "tv":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Bật/Tắt</Label>
              <Switch
                checked={deviceState.power}
                onCheckedChange={(checked) => handleStateChange({ power: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>Âm lượng</Label>
              <Slider
                value={[deviceState.volume || 0]}
                onValueChange={([value]) => handleStateChange({ volume: value })}
                max={100}
                step={1}
                className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-500"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/manager/devices">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Chi tiết thiết bị</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/manager/devices/${params.id}/edit`)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Chỉnh sửa
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
              <span className="font-medium">{device.roomNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tầng:</span>
              <span className="font-medium">{device.floor}</span>
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
              <span className="font-medium">{device.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nhà sản xuất:</span>
              <span className="font-medium">{device.manufacturer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Số serial:</span>
              <span className="font-medium">{device.serialNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Địa chỉ MAC:</span>
              <span className="font-medium">{device.macAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Firmware:</span>
              <span className="font-medium">{device.firmware}</span>
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
  );
} 