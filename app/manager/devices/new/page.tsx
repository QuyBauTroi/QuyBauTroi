"use client";

import { useState } from "react";
import { Device } from "@/types/device";
import { deviceService } from "@/services/deviceService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewDevicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [device, setDevice] = useState<Omit<Device, "id">>({
    type: "",
    name: "",
    status: "active",
    settings: {},
    supportedRoomTypes: [],
    macAddress: "",
    model: "",
    firmware: "",
    installDate: new Date().toISOString().split("T")[0],
    manufacturer: "",
    serialNumber: "",
    isOnline: true,
    lastOnline: new Date().toISOString(),
    floor: 1,
    roomNumber: "",
    roomId: 1,
    state: {
      power: false
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deviceService.createDevice(device);
      router.push("/manager/devices");
    } catch (error) {
      console.error("Error creating device:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/manager/devices">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Thêm thiết bị mới</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin thiết bị</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Loại thiết bị</Label>
                <Select
                  value={device.type}
                  onValueChange={(value) => setDevice({ ...device, type: value })}
                >
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
                <Label htmlFor="name">Tên thiết bị</Label>
                <Input
                  id="name"
                  value={device.name}
                  onChange={(e) => setDevice({ ...device, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomNumber">Số phòng</Label>
                <Input
                  id="roomNumber"
                  value={device.roomNumber}
                  onChange={(e) =>
                    setDevice({ ...device, roomNumber: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="floor">Tầng</Label>
                <Input
                  id="floor"
                  type="number"
                  value={device.floor}
                  onChange={(e) =>
                    setDevice({ ...device, floor: parseInt(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={device.model}
                  onChange={(e) => setDevice({ ...device, model: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturer">Nhà sản xuất</Label>
                <Input
                  id="manufacturer"
                  value={device.manufacturer}
                  onChange={(e) =>
                    setDevice({ ...device, manufacturer: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serialNumber">Số serial</Label>
                <Input
                  id="serialNumber"
                  value={device.serialNumber}
                  onChange={(e) =>
                    setDevice({ ...device, serialNumber: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="macAddress">Địa chỉ MAC</Label>
                <Input
                  id="macAddress"
                  value={device.macAddress}
                  onChange={(e) =>
                    setDevice({ ...device, macAddress: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Đang thêm..." : "Thêm thiết bị"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 