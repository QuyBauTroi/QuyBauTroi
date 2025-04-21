"use client";

import { useEffect, useState } from "react";
import { Device } from "@/types/device";
import { deviceService } from "@/services/deviceService";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Power, Settings, Replace } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/Layout/MainLayout";
import { AddDeviceDialog } from "@/components/Devices/ManagerDevice/AddDevice";

interface DeviceState {
  power: boolean;
  [key: string]: any;
}

interface DeviceWithState extends Device {
  state: DeviceState;
}


export default function DevicesPage() {
  const [ addDeviceOpen , setAddDeviceOpen ] = useState(false);
  const [devices, setDevices] = useState<DeviceWithState[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      const data = await deviceService.getAllDevices();
      setDevices(data as DeviceWithState[]);
    } catch (error) {
      console.error("Error loading devices:", error);
    }
  };

  const handlePowerToggle = async (deviceId: string, currentState: boolean) => {
    try {
      await deviceService.updateDeviceState(deviceId, { power: !currentState });
      loadDevices();
    } catch (error) {
      console.error("Error toggling device power:", error);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-6 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý thiết bị</h1>
          <Button onClick={() => setAddDeviceOpen(true)} className="mr-5 bg-green-200 text-black hover:bg-gray-100">
            <PlusCircle className="w-5 h-5 mr-2"></PlusCircle>
            Thêm phòng mới
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
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.floor}</TableCell>
                  <TableCell>{device.roomNumber}</TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>
                    <Badge variant={device.state?.power ? "default" : "destructive"}>
                      {device.state?.power ? "Online" : "Offline"}
                    </Badge>
                  </TableCell>
                  <TableCell>{device.macAddress}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePowerToggle(device.id, device.state?.power || false)}
                    >
                      <Power className={`h-4 w-4 ${device.state?.power ? "text-green-500" : "text-gray-500"}`} />
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
                          <Settings className="mr-2 h-4 w-4" />
                          Sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/manager/devices/${device.id}/replace`)}>
                          <Replace className="mr-2 h-4 w-4" />
                          Thay thế
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddDeviceDialog open={addDeviceOpen} onOpenChange={setAddDeviceOpen}/>
    </MainLayout>
  );
}
