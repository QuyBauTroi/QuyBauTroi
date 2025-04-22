"use client"
import { useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bath, BedDouble, Coffee, Fan, Film, LightbulbIcon, Lock, Music, Power, ShowerHeadIcon as Shower, Sofa, Speaker, ThermometerSun, Tv } from "lucide-react"
import type { Device } from "@/lib/data/data"
import debounce from "lodash.debounce";
import { useDeviceStore } from "@/lib/device-store";
import { useEffect } from "react"

interface RoomDeviceControlProps {
  roomType: string
  devices: Device[]
  roomNumber: string
}

export default function RoomDeviceControl({ roomType, devices, roomNumber }: RoomDeviceControlProps) {
  const {
    deviceStates,
    initializeDeviceState,
    updateDeviceState,
    selectedErrorDevice,
    setSelectedErrorDevice,
    isReportDialogOpen,
    setIsReportDialogOpen,
  } = useDeviceStore()

  useEffect(() => {
    initializeDeviceState(devices)
  }, [devices, initializeDeviceState])

  // Hàm mở dialog báo cáo lỗi
  const openErrorReport = (device: Device) => {
    setSelectedErrorDevice(device)
    setIsReportDialogOpen(true)
  }

  const findDeviceByType = (type: string): Device | undefined => {
    return devices.find((device) => device.type === type)
  }
  const showJuniorDevices = roomType === "Deluxe" || roomType === "Suite" || roomType === "Presidential Suite"
  const showDeluxeDevices = roomType === "Deluxe" || roomType === "Suite" || roomType === "Presidential Suite"
  const showSuiteDevices = roomType === "Suite" || roomType === "Presidential Suite"
  const showPresidentDevices = roomType === "Presidential Suite"
  // gọi các thiết bị
  const acDevice = findDeviceByType("ac")
  const mainLightDevice = findDeviceByType("light")
  const tvDevice = findDeviceByType("tv")
  const lockDevice = findDeviceByType("lock")
  const bedsideLightDevice = findDeviceByType("bedside-light")
  const bathroomLightDevice = findDeviceByType("bathroom-light")
  const coffeeMachineDevice = findDeviceByType("coffee-machine")
  const airPurifierDevice = findDeviceByType("air-purifier")
  const musicSystemDevice = findDeviceByType("music-system")
  const smartShowerDevice = findDeviceByType("smart-shower")
  const homeTheaterDevice = findDeviceByType("home-theater")
  const ambientLightingDevice = findDeviceByType("ambient-lighting")
  const voiceAssistantDevice = findDeviceByType("voice-assistant")
  const floorHeatingDevice = findDeviceByType("floor-heating")

  const updateDeviceStateDebounced = useCallback(
    debounce((deviceId: string, key: string, value: any) => {
      updateDeviceState(deviceId, key, value)
    }, 300),
    [updateDeviceState]
  )

  const handleQuickControl = (action: "lights" | "energy" | "locks") => {
    switch (action) {
      case "lights":
        // Tắt tất cả đèn (chỉ tắt nguồn, giữ nguyên giá trị thanh điều khiển)
        if (mainLightDevice) {
          updateDeviceState(mainLightDevice.id, "power", false);
        }
        if (bedsideLightDevice) {
          updateDeviceState(bedsideLightDevice.id, "power", false);
        }
        if (bathroomLightDevice) {
          updateDeviceState(bathroomLightDevice.id, "power", false);
        }
        if (ambientLightingDevice) {
          updateDeviceState(ambientLightingDevice.id, "power", false);
        }
        break;

      case "energy":
        // Chế độ tiết kiệm - set tất cả thanh điều khiển xuống 20%
        if (acDevice) {
          updateDeviceState(acDevice.id, "power", true);
          updateDeviceState(acDevice.id, "temperature", 28);
          updateDeviceState(acDevice.id, "mode", "auto");
        }
        if (mainLightDevice) {
          updateDeviceState(mainLightDevice.id, "power", true);
          updateDeviceState(mainLightDevice.id, "brightness", 20);
        }
        if (bedsideLightDevice) {
          updateDeviceState(bedsideLightDevice.id, "power", true);
          updateDeviceState(bedsideLightDevice.id, "brightness", 20);
        }
        if (bathroomLightDevice) {
          updateDeviceState(bathroomLightDevice.id, "power", true);
          updateDeviceState(bathroomLightDevice.id, "brightness", 20);
        }
        if (tvDevice) {
          updateDeviceState(tvDevice.id, "power", true);
          updateDeviceState(tvDevice.id, "volume", 20);
        }
        if (musicSystemDevice) {
          updateDeviceState(musicSystemDevice.id, "power", true);
          updateDeviceState(musicSystemDevice.id, "volume", 20);
        }
        if (homeTheaterDevice) {
          updateDeviceState(homeTheaterDevice.id, "power", true);
          updateDeviceState(homeTheaterDevice.id, "volume", 20);
        }
        if (voiceAssistantDevice) {
          updateDeviceState(voiceAssistantDevice.id, "power", true);
          updateDeviceState(voiceAssistantDevice.id, "volume", 20);
        }
        if (smartShowerDevice) {
          updateDeviceState(smartShowerDevice.id, "power", true);
          updateDeviceState(smartShowerDevice.id, "temperature", 38);
        }
        if (airPurifierDevice) {
          updateDeviceState(airPurifierDevice.id, "power", true);
          updateDeviceState(airPurifierDevice.id, "mode", "auto");
        }
        break;

      case "locks":
        // Khóa tất cả
        if (lockDevice) {
          updateDeviceState(lockDevice.id, "locked", true);
          updateDeviceState(lockDevice.id, "dndMode", true);
        }
        break;
    }
  };

  const handleLeaveRoom = () => {
    // Tắt tất cả thiết bị
    if (acDevice) {
      updateDeviceState(acDevice.id, "power", false);
    }
    if (mainLightDevice) {
      updateDeviceState(mainLightDevice.id, "power", false);
      updateDeviceState(mainLightDevice.id, "brightness", 0);
    }
    if (bedsideLightDevice) {
      updateDeviceState(bedsideLightDevice.id, "power", false);
      updateDeviceState(bedsideLightDevice.id, "brightness", 0);
    }
    if (bathroomLightDevice) {
      updateDeviceState(bathroomLightDevice.id, "power", false);
      updateDeviceState(bathroomLightDevice.id, "brightness", 0);
    }
    if (ambientLightingDevice) {
      updateDeviceState(ambientLightingDevice.id, "power", false);
    }
    if (tvDevice) {
      updateDeviceState(tvDevice.id, "power", false);
    }
    if (coffeeMachineDevice) {
      updateDeviceState(coffeeMachineDevice.id, "power", false);
    }
    if (airPurifierDevice) {
      updateDeviceState(airPurifierDevice.id, "power", false);
    }
    if (musicSystemDevice) {
      updateDeviceState(musicSystemDevice.id, "power", false);
    }
    if (smartShowerDevice) {
      updateDeviceState(smartShowerDevice.id, "power", false);
    }
    if (homeTheaterDevice) {
      updateDeviceState(homeTheaterDevice.id, "power", false);
    }
    if (voiceAssistantDevice) {
      updateDeviceState(voiceAssistantDevice.id, "power", false);
    }
    if (floorHeatingDevice) {
      updateDeviceState(floorHeatingDevice.id, "power", false);
    }
    // Khóa cửa
    if (lockDevice) {
      updateDeviceState(lockDevice.id, "locked", true);
      updateDeviceState(lockDevice.id, "dndMode", true);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="space-y-4">
        <TabsContent value="all">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Thiết bị cơ bản - Tất cả các phòng */}
            {acDevice && (
              <Card className="border-green-300 border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ThermometerSun className="h-5 w-5 text-orange-500" />
                    {acDevice.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ac-power">Nguồn</Label>
                    <Switch
                      id="ac-power"
                      checked={deviceStates[acDevice.id]?.power}
                      onCheckedChange={(checked) => updateDeviceState(acDevice.id, "power", checked)}
                      disabled={acDevice.status !== "active"}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="temperature" >Nhiệt độ: {deviceStates[acDevice.id]?.temperature}°C </Label>
                      <span className="text-sm font-medium">16°C - 30°C</span>
                    </div>
                    <Slider
                      id="temperature"
                      value={[deviceStates[acDevice.id]?.temperature || 24]}
                      min={16}
                      max={30}
                      step={1}
                      onValueChange={(value) => updateDeviceState(acDevice.id, "temperature", value[0])}
                      disabled={!deviceStates[acDevice.id]?.power || acDevice.status !== "active"}

                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ac-mode">Chế độ</Label>
                    <Select
                      value={deviceStates[acDevice.id]?.mode}
                      onValueChange={(value) => updateDeviceState(acDevice.id, "mode", value)}
                      disabled={!deviceStates[acDevice.id]?.power || acDevice.status !== "active"}
                    >
                      <SelectTrigger id="ac-mode">
                        <SelectValue placeholder="Chọn chế độ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cool">Làm lạnh</SelectItem>
                        <SelectItem value="heat">Sưởi ấm</SelectItem>
                        <SelectItem value="fan">Quạt</SelectItem>
                        <SelectItem value="auto">Tự động</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {mainLightDevice && (
              <Card className="border-green-300 border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                    {mainLightDevice.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="main-light">Nguồn</Label>
                    <Switch
                      id="main-light"
                      checked={deviceStates[mainLightDevice.id]?.power}
                      onCheckedChange={(checked) => updateDeviceState(mainLightDevice.id, "power", checked)}
                      disabled={mainLightDevice.status !== "active"}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="brightness">Độ sáng</Label>
                      <span className="text-sm font-medium">{deviceStates[mainLightDevice.id]?.brightness}%</span>
                    </div>
                    <Slider
                      id="brightness"
                      value={[deviceStates[mainLightDevice.id]?.brightness || 80]}
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(value) => updateDeviceState(mainLightDevice.id, "brightness", value[0])}
                      disabled={!deviceStates[mainLightDevice.id]?.power || mainLightDevice.status !== "active"}
                      className="[&_[role='range']]:bg-green-500 [&_[role=range]]:h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="color">Màu sắc</Label>
                      <div className="w-6 h-6 rounded-full border-2 " style={{ backgroundColor: deviceStates[mainLightDevice.id]?.color || "#ffffff" }}></div>
                    </div>
                    <div className="relative w-10 h-10">
                      {/* Hiển thị màu hiện tại */}
                      <div
                        className="w-7 h-7 rounded-full border-2 border-slate-300 cursor-pointer"
                        style={{
                          backgroundColor: deviceStates[mainLightDevice.id]?.color || "#ffffff",
                        }}
                        onClick={() => document.getElementById("color")?.click()}
                      ></div>
                      {/* Input color ẩn đi */}
                      <input
                        type="color"
                        id="color"
                        value={deviceStates[mainLightDevice.id]?.color || "#ffffff"}
                        onChange={(e) =>
                          updateDeviceStateDebounced(mainLightDevice.id, "color", e.target.value)
                        }
                        disabled={
                          !deviceStates[mainLightDevice.id]?.power ||
                          mainLightDevice.status !== "active"
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {tvDevice && (
              <Card className="border-green-300 border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tv className="h-5 w-5 text-blue-500" />
                    {tvDevice.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tv-power">Nguồn</Label>
                    <Switch
                      id="tv-power"
                      checked={deviceStates[tvDevice.id]?.power}
                      onCheckedChange={(checked) => updateDeviceState(tvDevice.id, "power", checked)}
                      disabled={tvDevice.status !== "active"}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="tv-volume">Âm lượng</Label>
                      <span className="text-sm font-medium">{deviceStates[tvDevice.id]?.volume}%</span>
                    </div>
                    <Slider
                      id="tv-volume"
                      value={[deviceStates[tvDevice.id]?.volume || 30]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => updateDeviceState(tvDevice.id, "volume", value[0])}
                      disabled={!deviceStates[tvDevice.id]?.power || tvDevice.status !== "active"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tv-source">Nguồn tín hiệu</Label>
                    <Select
                      value={deviceStates[tvDevice.id]?.source}
                      onValueChange={(value) => updateDeviceState(tvDevice.id, "source", value)}
                      disabled={!deviceStates[tvDevice.id]?.power || tvDevice.status !== "active"}
                    >
                      <SelectTrigger id="tv-source">
                        <SelectValue placeholder="Chọn nguồn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hdmi1">HDMI 1</SelectItem>
                        <SelectItem value="hdmi2">HDMI 2</SelectItem>
                        <SelectItem value="tv">TV</SelectItem>
                        <SelectItem value="netflix">Netflix</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {lockDevice && (
              <Card className="border-green-300 border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lock className="h-5 w-5 text-slate-500" />
                    {lockDevice.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="door-lock">Khóa cửa chính</Label>
                    <Switch
                      id="door-lock"
                      checked={deviceStates[lockDevice.id]?.locked}
                      onCheckedChange={(checked) => updateDeviceState(lockDevice.id, "locked", checked)}
                      disabled={lockDevice.status !== "active"}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dnd-mode">Chế độ không làm phiền</Label>
                    <Switch
                      id="dnd-mode"
                      checked={deviceStates[lockDevice.id]?.dndMode}
                      onCheckedChange={(checked) => updateDeviceState(lockDevice.id, "dndMode", checked)}
                      disabled={lockDevice.status !== "active"}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  <div className="pt-2">
                    <Button className="w-full bg-green-300 text-black hover:bg-gray-200" disabled={lockDevice.status !== "active"}>
                      Mở khóa tạm thời
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Thiết bị cho Junior Room trở lên */}
            {showJuniorDevices && (
              <>
                {bedsideLightDevice && (
                  <Card className="border-green-300 border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BedDouble className="h-5 w-5 text-slate-500" />
                        {bedsideLightDevice.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="bedside-light">Nguồn</Label>
                        <Switch
                          id="bedside-light"
                          checked={deviceStates[bedsideLightDevice.id]?.power}
                          onCheckedChange={(checked) => updateDeviceState(bedsideLightDevice.id, "power", checked)}
                          disabled={bedsideLightDevice.status !== "active"}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="bedside-brightness">Độ sáng</Label>
                          <span className="text-sm font-medium">
                            {deviceStates[bedsideLightDevice.id]?.brightness}%
                          </span>
                        </div>
                        <Slider
                          id="bedside-brightness"
                          value={[deviceStates[bedsideLightDevice.id]?.brightness || 60]}
                          min={10}
                          max={100}
                          step={1}
                          onValueChange={(value) => updateDeviceState(bedsideLightDevice.id, "brightness", value[0])}
                          disabled={
                            !deviceStates[bedsideLightDevice.id]?.power || bedsideLightDevice.status !== "active"
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {bathroomLightDevice && (
                  <Card className="border-green-300 border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Bath className="h-5 w-5 text-blue-500" />
                        {bathroomLightDevice.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="bathroom-light">Nguồn</Label>
                        <Switch
                          id="bathroom-light"
                          checked={deviceStates[bathroomLightDevice.id]?.power}
                          onCheckedChange={(checked) => updateDeviceState(bathroomLightDevice.id, "power", checked)}
                          disabled={bathroomLightDevice.status !== "active"}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="bathroom-brightness">Độ sáng</Label>
                          <span className="text-sm font-medium">
                            {deviceStates[bathroomLightDevice.id]?.brightness}%
                          </span>
                        </div>
                        <Slider
                          id="bathroom-brightness"
                          value={[deviceStates[bathroomLightDevice.id]?.brightness || 70]}
                          min={10}
                          max={100}
                          step={1}
                          onValueChange={(value) => updateDeviceState(bathroomLightDevice.id, "brightness", value[0])}
                          disabled={
                            !deviceStates[bathroomLightDevice.id]?.power || bathroomLightDevice.status !== "active"
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Thiết bị cho Deluxe Room trở lên */}
            {showDeluxeDevices && (
              <>
                {coffeeMachineDevice && (
                  <Card className="border-green-300 border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Coffee className="h-5 w-5 text-amber-700" />
                        {coffeeMachineDevice.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="coffee-machine">Nguồn</Label>
                        <Switch
                          id="coffee-machine"
                          checked={deviceStates[coffeeMachineDevice.id]?.power}
                          onCheckedChange={(checked) => updateDeviceState(coffeeMachineDevice.id, "power", checked)}
                          disabled={coffeeMachineDevice.status !== "active"}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coffee-type">Loại cà phê</Label>
                        <Select
                          value={deviceStates[coffeeMachineDevice.id]?.coffeeType}
                          onValueChange={(value) => updateDeviceState(coffeeMachineDevice.id, "coffeeType", value)}
                          disabled={
                            !deviceStates[coffeeMachineDevice.id]?.power || coffeeMachineDevice.status !== "active"
                          }
                        >
                          <SelectTrigger id="coffee-type">
                            <SelectValue placeholder="Chọn loại cà phê" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="espresso">Espresso</SelectItem>
                            <SelectItem value="americano">Americano</SelectItem>
                            <SelectItem value="latte">Latte</SelectItem>
                            <SelectItem value="cappuccino">Cappuccino</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full bg-green-300 text-black hover:bg-gray-200" disabled={!deviceStates[coffeeMachineDevice.id]?.power || coffeeMachineDevice.status !== "active"}>
                        Pha cà phê
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {airPurifierDevice && (
                  <Card className="border-green-300 border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Fan className="h-5 w-5 text-slate-500" />
                        {airPurifierDevice.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="air-purifier">Nguồn</Label>
                        <Switch
                          id="air-purifier"
                          checked={deviceStates[airPurifierDevice.id]?.power}
                          onCheckedChange={(checked) => updateDeviceState(airPurifierDevice.id, "power", checked)}
                          disabled={airPurifierDevice.status !== "active"}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="purifier-mode">Chế độ</Label>
                        <Select
                          value={deviceStates[airPurifierDevice.id]?.mode}
                          onValueChange={(value) => updateDeviceState(airPurifierDevice.id, "mode", value)}
                          disabled={!deviceStates[airPurifierDevice.id]?.power || airPurifierDevice.status !== "active"}
                        >
                          <SelectTrigger id="purifier-mode">
                            <SelectValue placeholder="Chọn chế độ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Tự động</SelectItem>
                            <SelectItem value="sleep">Ngủ</SelectItem>
                            <SelectItem value="turbo">Turbo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Thiết bị cho Suite Room trở lên */}
            {showSuiteDevices && (
              <>
                {musicSystemDevice && (
                  <Card className="border-green-300 border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Music className="h-5 w-5 text-purple-500" />
                        {musicSystemDevice.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="music-system">Nguồn</Label>
                        <Switch
                          id="music-system"
                          checked={deviceStates[musicSystemDevice.id]?.power}
                          onCheckedChange={(checked) => updateDeviceState(musicSystemDevice.id, "power", checked)}
                          disabled={musicSystemDevice.status !== "active"}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="music-volume">Âm lượng</Label>
                          <span className="text-sm font-medium">{deviceStates[musicSystemDevice.id]?.volume}%</span>
                        </div>
                        <Slider
                          id="music-volume"
                          value={[deviceStates[musicSystemDevice.id]?.volume || 40]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => updateDeviceState(musicSystemDevice.id, "volume", value[0])}
                          disabled={!deviceStates[musicSystemDevice.id]?.power || musicSystemDevice.status !== "active"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="music-source">Nguồn nhạc</Label>
                        <Select
                          value={deviceStates[musicSystemDevice.id]?.source}
                          onValueChange={(value) => updateDeviceState(musicSystemDevice.id, "source", value)}
                          disabled={!deviceStates[musicSystemDevice.id]?.power || musicSystemDevice.status !== "active"}
                        >
                          <SelectTrigger id="music-source">
                            <SelectValue placeholder="Chọn nguồn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bluetooth">Bluetooth</SelectItem>
                            <SelectItem value="spotify">Spotify</SelectItem>
                            <SelectItem value="radio">Radio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {smartShowerDevice && (
                  <Card className="border-green-300 border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Shower className="h-5 w-5 text-blue-500" />
                        {smartShowerDevice.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="smart-shower">Nguồn</Label>
                        <Switch
                          id="smart-shower"
                          checked={deviceStates[smartShowerDevice.id]?.power}
                          onCheckedChange={(checked) => updateDeviceState(smartShowerDevice.id, "power", checked)}
                          disabled={smartShowerDevice.status !== "active"}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="water-temp">
                            Nhiệt độ nước: {deviceStates[smartShowerDevice.id]?.temperature}°C
                          </Label>
                          <span className="text-sm font-medium">30°C - 45°C</span>
                        </div>
                        <Slider
                          id="water-temp"
                          value={[deviceStates[smartShowerDevice.id]?.temperature || 38]}
                          min={30}
                          max={45}
                          step={1}
                          onValueChange={(value) => updateDeviceState(smartShowerDevice.id, "temperature", value[0])}
                          disabled={!deviceStates[smartShowerDevice.id]?.power || smartShowerDevice.status !== "active"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shower-mode">Chế độ</Label>
                        <Select
                          value={deviceStates[smartShowerDevice.id]?.mode}
                          onValueChange={(value) => updateDeviceState(smartShowerDevice.id, "mode", value)}
                          disabled={!deviceStates[smartShowerDevice.id]?.power || smartShowerDevice.status !== "active"}
                        >
                          <SelectTrigger id="shower-mode">
                            <SelectValue placeholder="Chọn chế độ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rain">Mưa</SelectItem>
                            <SelectItem value="massage">Massage</SelectItem>
                            <SelectItem value="mist">Sương mù</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Thiết bị cho President Suite */}
            {showPresidentDevices && (
              <>
                {homeTheaterDevice && (
                  <Card className="border-green-300 border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Film className="h-5 w-5 text-red-500" />
                        {homeTheaterDevice.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="home-theater">Nguồn</Label>
                        <Switch
                          id="home-theater"
                          checked={deviceStates[homeTheaterDevice.id]?.power}
                          onCheckedChange={(checked) => updateDeviceState(homeTheaterDevice.id, "power", checked)}
                          disabled={homeTheaterDevice.status !== "active"}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="movie-source">Nguồn phim</Label>
                        <Select
                          value={deviceStates[homeTheaterDevice.id]?.source}
                          onValueChange={(value) => updateDeviceState(homeTheaterDevice.id, "source", value)}
                          disabled={!deviceStates[homeTheaterDevice.id]?.power || homeTheaterDevice.status !== "active"}
                        >
                          <SelectTrigger id="movie-source">
                            <SelectValue placeholder="Chọn nguồn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="netflix">Netflix</SelectItem>
                            <SelectItem value="disney">Disney+</SelectItem>
                            <SelectItem value="hbo">HBO</SelectItem>
                            <SelectItem value="local">Thư viện phim</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="theater-volume">Âm lượng</Label>
                          <span className="text-sm font-medium">{deviceStates[homeTheaterDevice.id]?.volume}%</span>
                        </div>
                        <Slider
                          id="theater-volume"
                          value={[deviceStates[homeTheaterDevice.id]?.volume || 50]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => updateDeviceState(homeTheaterDevice.id, "volume", value[0])}
                          disabled={!deviceStates[homeTheaterDevice.id]?.power || homeTheaterDevice.status !== "active"}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {ambientLightingDevice && (
                  <Card className="border-green-300 border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Sofa className="h-5 w-5 text-amber-500" />
                        {ambientLightingDevice.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ambient-lighting">Nguồn</Label>
                        <Switch
                          id="ambient-lighting"
                          checked={deviceStates[ambientLightingDevice.id]?.power}
                          onCheckedChange={(checked) => updateDeviceState(ambientLightingDevice.id, "power", checked)}
                          disabled={ambientLightingDevice.status !== "active"}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lighting-mode">Chế độ</Label>
                        <Select
                          value={deviceStates[ambientLightingDevice.id]?.mode}
                          onValueChange={(value) => updateDeviceState(ambientLightingDevice.id, "mode", value)}
                          disabled={
                            !deviceStates[ambientLightingDevice.id]?.power || ambientLightingDevice.status !== "active"
                          }
                        >
                          <SelectTrigger id="lighting-mode">
                            <SelectValue placeholder="Chọn chế độ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="relax">Thư giãn</SelectItem>
                            <SelectItem value="focus">Tập trung</SelectItem>
                            <SelectItem value="party">Tiệc</SelectItem>
                            <SelectItem value="movie">Xem phim</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="color-temp">Nhiệt độ màu</Label>
                          <span className="text-sm font-medium">Ấm</span>
                        </div>
                        <Slider
                          id="color-temp"
                          value={[deviceStates[ambientLightingDevice.id]?.colorTemp || 70]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => updateDeviceState(ambientLightingDevice.id, "colorTemp", value[0])}
                          disabled={
                            !deviceStates[ambientLightingDevice.id]?.power || ambientLightingDevice.status !== "active"
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {voiceAssistantDevice && (
                  <Card className="border-green-300 border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Speaker className="h-5 w-5 text-slate-500" />
                        {voiceAssistantDevice.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-assistant">Nguồn</Label>
                        <Switch
                          id="voice-assistant"
                          checked={deviceStates[voiceAssistantDevice.id]?.power}
                          onCheckedChange={(checked) => updateDeviceState(voiceAssistantDevice.id, "power", checked)}
                          disabled={voiceAssistantDevice.status !== "active"}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assistant-volume">Âm lượng</Label>
                        <Slider
                          id="assistant-volume"
                          value={[deviceStates[voiceAssistantDevice.id]?.volume || 60]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => updateDeviceState(voiceAssistantDevice.id, "volume", value[0])}
                          disabled={
                            !deviceStates[voiceAssistantDevice.id]?.power || voiceAssistantDevice.status !== "active"
                          }
                        />
                      </div>
                      <div className="pt-2">
                        <Button
                          className="w-full bg-green-300 text-black hover:bg-gray-200"
                          disabled={
                            !deviceStates[voiceAssistantDevice.id]?.power || voiceAssistantDevice.status !== "active"
                          }
                        >
                          Gọi trợ lý
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="border-green-300 border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5 text-green-500" />
            Điều khiển nhanh
          </CardTitle>
          <CardDescription>Điều khiển tất cả thiết bị trong phòng cùng một lúc</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => handleQuickControl("lights")}
            >
              <LightbulbIcon className="h-6 w-6" />
              <span>Tắt tất cả đèn</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => handleQuickControl("energy")}
            >
              <ThermometerSun className="h-6 w-6" />
              <span>Chế độ tiết kiệm</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => handleQuickControl("locks")}
            >
              <Lock className="h-6 w-6" />
              <span>Khóa tất cả</span>
            </Button>
          </div>
          <div className="pt-2">
            <Button
              className="w-full bg-green-300 text-black hover:bg-gray-200"
              onClick={handleLeaveRoom}
            >
              Chế độ rời phòng
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
