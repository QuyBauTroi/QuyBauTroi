// Room Status
export interface RoomStatus {
  status_id: number
  status_name: string
  color?: string // For UI display purposes
  description?: string
}

// Định nghĩa loại thiết bị
export type DeviceType =
  | "ac"
  | "light"
  | "tv"
  | "lock"
  | "bedside-light"
  | "bathroom-light"
  | "coffee-machine"
  | "air-purifier"
  | "music-system"
  | "smart-shower"
  | "home-theater"
  | "ambient-lighting"
  | "voice-assistant"
  | "floor-heating"
  | "curtain"
  | "minibar"
  | "smart-toilet"

// Định nghĩa trạng thái thiết bị
export type DeviceStatus = "active" | "inactive" | "error" | "maintenance"

// Cập nhật định nghĩa Device để thêm các trường mới
export interface Device {
  id: string
  type: DeviceType
  name: string
  status: DeviceStatus
  settings?: Record<string, any>
  supportedRoomTypes: string[]
  // Thêm các trường mới
  roomId?: number
  roomNumber?: string
  floor?: number
  macAddress?: string
  model?: string
  firmware?: string
  installDate?: string
  lastMaintenance?: string
  manufacturer?: string
  serialNumber?: string
  ipAddress?: string
  batteryLevel?: number
  lastOnline?: string
  isOnline?: boolean
}

// Room Type
export interface RoomType {
  room_type_id: number
  room_type_name: string
  description: string
  price_per_night: string // Using string for formatted price display
  max_adults: number
  max_children: number
  image?: string // For UI display purposes
  room_count?: number // For statistics (not in DB schema but useful for UI)
}

// Room
export interface Room {
  room_id: number
  room_number: string
  room_type_id: number
  status_id: number
  capacity: number
  description: string
  cleaning_status: "clean" | "dirty" | "cleaning"
  floor?: number
  last_cleaned?: string
  next_booking?: string | null
  room_type?: RoomType
  status?: RoomStatus
  devices: Device[]
}

// Booking status types
export type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed" | "no-show"

// Booking interface (updated with more fields)
export interface Booking {
  booking_id: string
  guest_id: number
  guest_name: string
  room_id: number
  room_number: string
  room_type: string
  check_in: string
  check_out: string
  booking_date: string
  status: BookingStatus
  payment_status: "paid" | "pending" | "partial" | "refunded"
  total_amount: string
  special_requests?: string
  adults: number
  children: number
  source: string
}

// Guest interface
export interface Guest {
  guest_id: number
  name: string
  email: string
  phone: string
  address?: string
  nationality?: string
  id_type?: string
  id_number?: string
}

// Check-in (for UI purposes)
export interface CheckIn {
  guest: string
  room: string
  roomType: string
  time: string
  status: string
  statusVariant: "default" | "secondary" | "outline"
}

// Mock data for room statuses
export const roomStatusData: RoomStatus[] = [
  {
    status_id: 1,
    status_name: "Trống",
    color: "green",
    description: "Phòng sẵn sàng để đặt",
  },
  {
    status_id: 2,
    status_name: "Đang sử dụng",
    color: "blue",
    description: "Phòng đang có khách",
  },
  {
    status_id: 3,
    status_name: "Bảo trì",
    color: "red",
    description: "Phòng đang được sửa chữa",
  },
  {
    status_id: 4,
    status_name: "Đã đặt",
    color: "purple",
    description: "Phòng đã được đặt trước",
  },
  {
    status_id: 5,
    status_name: "Đang dọn dẹp",
    color: "amber",
    description: "Phòng đang được dọn dẹp",
  },
]

// Mock data for room types
export const roomTypeData: RoomType[] = [
  {
    room_type_id: 1,
    room_type_name: "Standard",
    description: "Phòng tiêu chuẩn với đầy đủ tiện nghi cơ bản.",
    price_per_night: "800,000",
    max_adults: 2,
    max_children: 1,
    room_count: 20,
  },
  {
    room_type_id: 2,
    room_type_name: "Deluxe",
    description: "Phòng cao cấp với không gian rộng rãi và view đẹp.",
    price_per_night: "1,200,000",
    max_adults: 2,
    max_children: 2,
    room_count: 15,
  },
  {
    room_type_id: 3,
    room_type_name: "Suite",
    description: "Phòng suite sang trọng với phòng khách riêng biệt.",
    price_per_night: "2,500,000",
    max_adults: 3,
    max_children: 2,
    room_count: 10,
  },
  {
    room_type_id: 4,
    room_type_name: "Presidential Suite",
    description: "Phòng suite tổng thống với dịch vụ cao cấp nhất.",
    price_per_night: "5,000,000",
    max_adults: 4,
    max_children: 2,
    room_count: 2,
  },
]

// Cập nhật mockDevices để thêm thông tin mới
export const mockDevices: Device[] = [
  {
    id: "ac-1",
    type: "ac",
    name: "Điều hòa nhiệt độ",
    status: "active",
    settings: {
      power: true,
      temperature: 24,
      mode: "cool",
      fanSpeed: "auto",
    },
    supportedRoomTypes: ["Standard", "Deluxe", "Suite", "Presidential Suite"],
    macAddress: "00:1B:44:11:3A:B7",
    model: "Samsung AR09TYHYEWKN",
    firmware: "v2.5.1",
    installDate: "2023-05-15",
    manufacturer: "Samsung",
    serialNumber: "SAM2023051500123",
    isOnline: true,
    lastOnline: "2023-11-10T08:30:00Z",
    batteryLevel: 100,
    floor: 1,
    roomNumber: "101",
    roomId: 1,
  },
  {
    id: "light-1",
    type: "light",
    name: "Đèn chính",
    status: "active",
    settings: {
      power: true,
      brightness: 80,
    },
    supportedRoomTypes: ["Standard", "Deluxe", "Suite", "Presidential Suite"],
    macAddress: "00:1B:44:11:3A:C8",
    model: "Philips Hue White",
    firmware: "v1.8.2",
    installDate: "2023-05-15",
    manufacturer: "Philips",
    serialNumber: "PHI2023051500456",
    isOnline: true,
    lastOnline: "2023-11-10T08:45:00Z",
    floor: 1,
    roomNumber: "101",
    roomId: 1,
  },
  {
    id: "tv-1",
    type: "tv",
    name: "TV",
    status: "active",
    settings: {
      power: false,
      volume: 30,
      source: "hdmi1",
    },
    supportedRoomTypes: ["Standard", "Deluxe", "Suite", "Presidential Suite"],
    macAddress: "00:1B:44:11:3A:D9",
    model: "LG OLED55C1",
    firmware: "v3.2.1",
    installDate: "2023-05-15",
    manufacturer: "LG",
    serialNumber: "LG2023051500789",
    isOnline: true,
    lastOnline: "2023-11-10T08:15:00Z",
    floor: 1,
    roomNumber: "101",
    roomId: 1,
  },
  {
    id: "lock-1",
    type: "lock",
    name: "Khóa cửa",
    status: "active",
    settings: {
      locked: true,
      dndMode: false,
    },
    supportedRoomTypes: ["Standard", "Deluxe", "Suite", "Presidential Suite"],
    macAddress: "00:1B:44:11:3A:E0",
    model: "Yale Assure Lock 2",
    firmware: "v2.0.3",
    installDate: "2023-05-15",
    manufacturer: "Yale",
    serialNumber: "YAL2023051501012",
    isOnline: true,
    lastOnline: "2023-11-10T08:40:00Z",
    batteryLevel: 85,
    floor: 1,
    roomNumber: "101",
    roomId: 1,
  },
  {
    id: "bedside-light-1",
    type: "bedside-light",
    name: "Đèn đầu giường",
    status: "active",
    settings: {
      power: false,
      brightness: 60,
    },
    supportedRoomTypes: ["Deluxe", "Suite", "Presidential Suite"],
    macAddress: "00:1B:44:11:3A:F1",
    model: "Philips Hue Go",
    firmware: "v1.7.3",
    installDate: "2023-05-16",
    manufacturer: "Philips",
    serialNumber: "PHI2023051601345",
    isOnline: true,
    lastOnline: "2023-11-10T08:50:00Z",
    floor: 2,
    roomNumber: "201",
    roomId: 3,
  },
  {
    id: "bathroom-light-1",
    type: "bathroom-light",
    name: "Đèn phòng tắm",
    status: "active",
    settings: {
      power: false,
      brightness: 70,
    },
    supportedRoomTypes: ["Deluxe", "Suite", "Presidential Suite"],
    macAddress: "00:1B:44:11:3B:02",
    model: "Philips Hue White",
    firmware: "v1.8.2",
    installDate: "2023-05-16",
    manufacturer: "Philips",
    serialNumber: "PHI2023051601678",
    isOnline: true,
    lastOnline: "2023-11-10T08:55:00Z",
    floor: 2,
    roomNumber: "201",
    roomId: 3,
  },
  {
    id: "coffee-machine-1",
    type: "coffee-machine",
    name: "Máy pha cà phê",
    status: "error",
    settings: {
      power: false,
      coffeeType: "espresso",
    },
    supportedRoomTypes: ["Deluxe", "Suite", "Presidential Suite"],
    macAddress: "00:1B:44:11:3B:13",
    model: "Nespresso Vertuo",
    firmware: "v1.2.5",
    installDate: "2023-05-16",
    manufacturer: "Nespresso",
    serialNumber: "NES2023051602901",
    isOnline: false,
    lastOnline: "2023-11-09T18:20:00Z",
    floor: 2,
    roomNumber: "201",
    roomId: 3,
  },
  {
    id: "air-purifier-1",
    type: "air-purifier",
    name: "Máy lọc không khí",
    status: "active",
    settings: {
      power: true,
      mode: "auto",
    },
    supportedRoomTypes: ["Deluxe", "Suite", "Presidential Suite"],
    macAddress: "00:1B:44:11:3B:24",
    model: "Dyson Pure Cool",
    firmware: "v2.1.0",
    installDate: "2023-05-16",
    manufacturer: "Dyson",
    serialNumber: "DYS2023051603234",
    isOnline: true,
    lastOnline: "2023-11-10T09:00:00Z",
    floor: 2,
    roomNumber: "201",
    roomId: 3,
  },
  {
    id: "music-system-1",
    type: "music-system",
    name: "Hệ thống âm thanh",
    status: "maintenance",
    settings: {
      power: false,
      volume: 40,
      source: "bluetooth",
    },
    supportedRoomTypes: ["Suite", "Presidential Suite"],
    macAddress: "00:1B:44:11:3B:35",
    model: "Sonos Beam",
    firmware: "v3.0.1",
    installDate: "2023-05-17",
    manufacturer: "Sonos",
    serialNumber: "SON2023051704567",
    isOnline: false,
    lastOnline: "2023-11-08T14:30:00Z",
    lastMaintenance: "2023-11-09",
    floor: 3,
    roomNumber: "301",
    roomId: 5,
  },
  {
    id: "smart-shower-1",
    type: "smart-shower",
    name: "Vòi sen thông minh",
    status: "active",
    settings: {
      power: false,
      temperature: 38,
      mode: "rain",
    },
    supportedRoomTypes: ["Suite", "Presidential Suite"],
    macAddress: "00:1B:44:11:3B:46",
    model: "Moen U",
    firmware: "v1.5.2",
    installDate: "2023-05-17",
    manufacturer: "Moen",
    serialNumber: "MOE2023051705890",
    isOnline: true,
    lastOnline: "2023-11-10T09:10:00Z",
    floor: 3,
    roomNumber: "301",
    roomId: 5,
  },
]

// Thêm định nghĩa cho lịch sử điều khiển thiết bị
export interface DeviceControlLog {
  id: string
  deviceId: string
  deviceName: string
  timestamp: string
  action: string
  user: string
  details: string
  success: boolean
}

// Thêm định nghĩa cho lịch sử lỗi thiết bị
export interface DeviceErrorLog {
  id: string
  deviceId: string
  deviceName: string
  timestamp: string
  errorCode: string
  errorMessage: string
  status: "resolved" | "pending" | "in-progress"
  resolvedAt?: string
  resolvedBy?: string
  roomNumber?: string
}

// Thêm dữ liệu mẫu cho lịch sử điều khiển
export const deviceControlLogs: DeviceControlLog[] = [
  {
    id: "log-1",
    deviceId: "device-1",
    deviceName: "Điều hòa phòng 101",
    timestamp: "2023-05-15T08:30:00Z",
    action: "Bật thiết bị",
    user: "Nhân viên lễ tân",
    details: "power: true",
    success: true,
  },
  {
    id: "log-2",
    deviceId: "device-1",
    deviceName: "Điều hòa phòng 101",
    timestamp: "2023-05-15T12:45:00Z",
    action: "Điều chỉnh nhiệt độ",
    user: "Khách hàng",
    details: "temperature: 24",
    success: true,
  },
  {
    id: "log-3",
    deviceId: "device-2",
    deviceName: "Đèn chính phòng 101",
    timestamp: "2023-05-15T18:20:00Z",
    action: "Bật đèn",
    user: "Khách hàng",
    details: "power: true, brightness: 80",
    success: true,
  },
  {
    id: "log-4",
    deviceId: "device-3",
    deviceName: "TV phòng 101",
    timestamp: "2023-05-15T20:10:00Z",
    action: "Thay đổi nguồn tín hiệu",
    user: "Khách hàng",
    details: "source: netflix",
    success: true,
  },
  {
    id: "log-5",
    deviceId: "device-4",
    deviceName: "Khóa cửa phòng 101",
    timestamp: "2023-05-16T07:30:00Z",
    action: "Mở khóa",
    user: "Nhân viên lễ tân",
    details: "locked: false",
    success: true,
  },
  {
    id: "log-6",
    deviceId: "device-5",
    deviceName: "Đèn đầu giường phòng 102",
    timestamp: "2023-05-16T22:15:00Z",
    action: "Điều chỉnh độ sáng",
    user: "Khách hàng",
    details: "brightness: 30",
    success: true,
  },
  {
    id: "log-7",
    deviceId: "device-6",
    deviceName: "Đèn phòng tắm 102",
    timestamp: "2023-05-17T06:45:00Z",
    action: "Bật đèn",
    user: "Khách hàng",
    details: "power: true",
    success: true,
  },
  {
    id: "log-8",
    deviceId: "device-7",
    deviceName: "Máy pha cà phê phòng 201",
    timestamp: "2023-05-17T08:00:00Z",
    action: "Pha cà phê",
    user: "Khách hàng",
    details: "coffeeType: espresso",
    success: true,
  },
  {
    id: "log-9",
    deviceId: "device-8",
    deviceName: "Máy lọc không khí phòng 201",
    timestamp: "2023-05-17T14:30:00Z",
    action: "Thay đổi chế độ",
    user: "Nhân viên dọn phòng",
    details: "mode: turbo",
    success: true,
  },
  {
    id: "log-10",
    deviceId: "device-9",
    deviceName: "Hệ thống âm thanh phòng 301",
    timestamp: "2023-05-18T19:20:00Z",
    action: "Điều chỉnh âm lượng",
    user: "Khách hàng",
    details: "volume: 60",
    success: true,
  },
]

// Thêm dữ liệu mẫu cho lịch sử lỗi
export const deviceErrorLogs: DeviceErrorLog[] = [
  {
    id: "error-1",
    deviceId: "coffee-machine-1",
    deviceName: "Máy pha cà phê",
    timestamp: "2023-11-09T18:20:00Z",
    errorCode: "E-102",
    errorMessage: "Lỗi áp suất nước",
    status: "pending",
    roomNumber: "201",
  },
  {
    id: "error-2",
    deviceId: "music-system-1",
    deviceName: "Hệ thống âm thanh",
    timestamp: "2023-11-08T14:30:00Z",
    errorCode: "E-201",
    errorMessage: "Lỗi kết nối Bluetooth",
    status: "in-progress",
    roomNumber: "301",
  },
  {
    id: "error-3",
    deviceId: "tv-1",
    deviceName: "TV",
    timestamp: "2023-11-05T10:15:00Z",
    errorCode: "E-301",
    errorMessage: "Lỗi kết nối HDMI",
    status: "resolved",
    resolvedAt: "2023-11-05T14:30:00Z",
    resolvedBy: "Kỹ thuật viên C",
    roomNumber: "101",
  },
]

// Danh sách các thiết bị mẫu

// Mock data for rooms
export const roomData: Room[] = [
  {
    room_id: 1,
    room_number: "101",
    room_type_id: 1, // Standard
    status_id: 1, // Available
    capacity: 3,
    description: "Phòng Standard tầng 1 với view ra phố",
    cleaning_status: "clean",
    floor: 1,
    last_cleaned: "09/04/2025",
    next_booking: null,
    devices: getDevicesForRoom(1, "Standard"),
  },
  {
    room_id: 2,
    room_number: "102",
    room_type_id: 1, // Standard
    status_id: 2, // Occupied
    capacity: 2,
    description: "Phòng Standard tầng 1 với view ra vườn",
    cleaning_status: "clean",
    floor: 1,
    last_cleaned: "08/04/2025",
    next_booking: null,
    devices: getDevicesForRoom(2, "Standard"),
  },
  {
    room_id: 3,
    room_number: "201",
    room_type_id: 2, // Deluxe
    status_id: 3, // Maintenance
    capacity: 2,
    description: "Phòng Deluxe tầng 2 với ban công",
    cleaning_status: "clean",
    floor: 2,
    last_cleaned: "07/04/2025",
    next_booking: "15/04/2025",
    devices: getDevicesForRoom(3, "Deluxe"),
  },
  {
    room_id: 4,
    room_number: "202",
    room_type_id: 2, // Deluxe
    status_id: 1, // Available
    capacity: 2,
    description: "Phòng Deluxe tầng 2 với view ra biển",
    cleaning_status: "clean",
    floor: 2,
    last_cleaned: "09/04/2025",
    next_booking: "16/04/2025",
    devices: getDevicesForRoom(4, "Deluxe"),
  },
  {
    room_id: 5,
    room_number: "301",
    room_type_id: 3, // Suite
    status_id: 2, // Occupied
    capacity: 4,
    description: "Phòng Suite tầng 3 với phòng khách riêng",
    cleaning_status: "dirty",
    floor: 3,
    last_cleaned: "08/04/2025",
    next_booking: null,
    devices: getDevicesForRoom(5, "Suite"),
  },
  {
    room_id: 6,
    room_number: "302",
    room_type_id: 3, // Suite
    status_id: 5, // Cleaning
    capacity: 4,
    description: "Phòng Suite tầng 3 với view toàn cảnh",
    cleaning_status: "cleaning",
    floor: 3,
    last_cleaned: "09/04/2025",
    next_booking: "18/04/2025",
    devices: getDevicesForRoom(6, "Suite"),
  },
  {
    room_id: 7,
    room_number: "401",
    room_type_id: 4, // Presidential Suite
    status_id: 1, // Available
    capacity: 6,
    description: "Phòng Presidential Suite tầng 4 với hồ bơi riêng",
    cleaning_status: "clean",
    floor: 4,
    last_cleaned: "09/04/2025",
    next_booking: "20/04/2025",
    devices: getDevicesForRoom(7, "Presidential Suite"),
  },
  // Thêm phòng 106
  {
    room_id: 8,
    room_number: "106",
    room_type_id: 1, // Standard
    status_id: 3, // Bảo trì
    capacity: 2,
    description: "Phòng Standard tầng 1 với view ra vườn",
    cleaning_status: "clean",
    floor: 1,
    last_cleaned: "10/04/2025",
    next_booking: "25/04/2025",
    devices: [
      {
        id: "ac-1-106",
        type: "ac",
        name: "Điều hòa nhiệt độ",
        status: "error", // Thiết bị lỗi
        settings: {
          power: false,
          temperature: 24,
          mode: "cool",
          fanSpeed: "auto",
        },
        supportedRoomTypes: ["Standard", "Deluxe", "Suite", "Presidential Suite"],
      },
      {
        id: "light-1-106",
        type: "light",
        name: "Đèn chính",
        status: "active",
        settings: {
          power: true,
          brightness: 80,
        },
        supportedRoomTypes: ["Standard", "Deluxe", "Suite", "Presidential Suite"],
      },
      {
        id: "tv-1-106",
        type: "tv",
        name: "TV",
        status: "error", // Thiết bị lỗi
        settings: {
          power: false,
          volume: 30,
          source: "hdmi1",
        },
        supportedRoomTypes: ["Standard", "Deluxe", "Suite", "Presidential Suite"],
      },
      {
        id: "lock-1-106",
        type: "lock",
        name: "Khóa cửa",
        status: "active",
        settings: {
          locked: true,
          dndMode: false,
        },
        supportedRoomTypes: ["Standard", "Deluxe", "Suite", "Presidential Suite"],
      },
    ],
  },
  // Thêm phòng 107
  {
    room_id: 9,
    room_number: "107",
    room_type_id: 1, // Standard
    status_id: 2, // Occupied
    capacity: 2,
    description: "Phòng Standard tầng 1 với view ra hồ bơi",
    cleaning_status: "clean",
    floor: 1,
    last_cleaned: "09/04/2025",
    next_booking: null,
    devices: getDevicesForRoom(9, "Standard"),
  },
  // Thêm phòng 108
  {
    room_id: 10,
    room_number: "108",
    room_type_id: 2, // Deluxe
    status_id: 1, // Available
    capacity: 3,
    description: "Phòng Deluxe tầng 1 với ban công riêng",
    cleaning_status: "clean",
    floor: 1,
    last_cleaned: "11/04/2025",
    next_booking: null,
    devices: getDevicesForRoom(10, "Deluxe"),
  },
]

// Helper function to get devices for a room based on room type
function getDevicesForRoom(roomId: number, roomType: string): Device[] {
  // Lọc thiết bị phù hợp với loại phòng
  const roomDevices = mockDevices.filter((device) => device.supportedRoomTypes.includes(roomType))

  // Tạo bản sao của thiết bị để tránh tham chiếu
  return roomDevices.map((device) => {
    // Ensure device ID is unique but still related to the original device
    // Format: original-id-roomId (e.g., ac-1-3)
    const deviceId = `${device.id}-${roomId}`

    return {
      ...device,
      id: deviceId,
      status: roomId % 19 === 0 && device.type === "ac" ? "error" : device.status,
    }
  })
}

// Mock data for guests
export const guestData: Guest[] = [
  {
    guest_id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    nationality: "Việt Nam",
    id_type: "CMND",
    id_number: "123456789",
  },
  {
    guest_id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    nationality: "Việt Nam",
    id_type: "CCCD",
    id_number: "987654321",
  },
  {
    guest_id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    address: "789 Đường Đồng Khởi, Quận 1, TP.HCM",
    nationality: "Việt Nam",
    id_type: "Hộ chiếu",
    id_number: "AB123456",
  },
  {
    guest_id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    address: "101 Đường Nguyễn Du, Quận 1, TP.HCM",
    nationality: "Việt Nam",
    id_type: "CMND",
    id_number: "456789123",
  },
  {
    guest_id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    address: "202 Đường Lý Tự Trọng, Quận 1, TP.HCM",
    nationality: "Việt Nam",
    id_type: "CCCD",
    id_number: "789123456",
  },
  {
    guest_id: 6,
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "+1 123-456-7890",
    address: "123 Main St, New York, USA",
    nationality: "USA",
    id_type: "Passport",
    id_number: "US123456",
  },
  {
    guest_id: 7,
    name: "Emma Wilson",
    email: "emmawilson@example.com",
    phone: "+44 20 1234 5678",
    address: "45 Oxford St, London, UK",
    nationality: "UK",
    id_type: "Passport",
    id_number: "UK789012",
  },
]

// Mock data for bookings
export const bookingData: Booking[] = [
  {
    booking_id: "BK-1001",
    guest_id: 1,
    guest_name: "Nguyễn Văn A",
    room_id: 1,
    room_number: "101",
    room_type: "Standard",
    check_in: "12/04/2025",
    check_out: "15/04/2025",
    booking_date: "01/04/2025",
    status: "confirmed",
    payment_status: "paid",
    total_amount: "2,500,000 VND",
    special_requests: "Phòng tầng cao, xa thang máy",
    adults: 2,
    children: 0,
    source: "Website",
  },
  {
    booking_id: "BK-1002",
    guest_id: 2,
    guest_name: "Trần Thị B",
    room_id: 4,
    room_number: "202",
    room_type: "Deluxe",
    check_in: "13/04/2025",
    check_out: "16/04/2025",
    booking_date: "02/04/2025",
    status: "pending",
    payment_status: "pending",
    total_amount: "3,800,000 VND",
    adults: 2,
    children: 1,
    source: "Booking.com",
  },
  {
    booking_id: "BK-1003",
    guest_id: 3,
    guest_name: "Lê Văn C",
    room_id: 7,
    room_number: "401",
    room_type: "Presidential Suite",
    check_in: "14/04/2025",
    check_out: "18/04/2025",
    booking_date: "05/03/2025",
    status: "confirmed",
    payment_status: "partial",
    total_amount: "7,200,000 VND",
    special_requests: "Chuẩn bị hoa và rượu vang đỏ",
    adults: 2,
    children: 0,
    source: "Trực tiếp",
  },
  {
    booking_id: "BK-1004",
    guest_id: 4,
    guest_name: "Phạm Thị D",
    room_id: 2,
    room_number: "102",
    room_type: "Standard",
    check_in: "15/04/2025",
    check_out: "17/04/2025",
    booking_date: "10/03/2025",
    status: "cancelled",
    payment_status: "refunded",
    total_amount: "2,500,000 VND",
    adults: 1,
    children: 0,
    source: "Agoda",
  },
  {
    booking_id: "BK-1005",
    guest_id: 5,
    guest_name: "Hoàng Văn E",
    room_id: 5,
    room_number: "301",
    room_type: "Suite",
    check_in: "16/04/2025",
    check_out: "20/04/2025",
    booking_date: "15/03/2025",
    status: "confirmed",
    payment_status: "paid",
    total_amount: "4,800,000 VND",
    special_requests: "Cần giường phụ cho trẻ em",
    adults: 2,
    children: 1,
    source: "Traveloka",
  },
  {
    booking_id: "BK-1006",
    guest_id: 6,
    guest_name: "John Smith",
    room_id: 3,
    room_number: "201",
    room_type: "Deluxe",
    check_in: "18/04/2025",
    check_out: "25/04/2025",
    booking_date: "20/03/2025",
    status: "confirmed",
    payment_status: "paid",
    total_amount: "8,400,000 VND",
    special_requests: "Non-smoking room, airport pickup",
    adults: 2,
    children: 0,
    source: "Expedia",
  },
  {
    booking_id: "BK-1007",
    guest_id: 7,
    guest_name: "Emma Wilson",
    room_id: 6,
    room_number: "302",
    room_type: "Suite",
    check_in: "20/04/2025",
    check_out: "23/04/2025",
    booking_date: "25/03/2025",
    status: "confirmed",
    payment_status: "paid",
    total_amount: "3,600,000 VND",
    special_requests: "Early check-in if possible",
    adults: 1,
    children: 0,
    source: "Hotels.com",
  },
  {
    booking_id: "BK-1008",
    guest_id: 1,
    guest_name: "Nguyễn Văn A",
    room_id: 4,
    room_number: "202",
    room_type: "Deluxe",
    check_in: "01/05/2025",
    check_out: "05/05/2025",
    booking_date: "01/04/2025",
    status: "confirmed",
    payment_status: "pending",
    total_amount: "4,800,000 VND",
    adults: 2,
    children: 1,
    source: "Website",
  },
  {
    booking_id: "BK-1009",
    guest_id: 3,
    guest_name: "Lê Văn C",
    room_id: 5,
    room_number: "301",
    room_type: "Suite",
    check_in: "10/05/2025",
    check_out: "15/05/2025",
    booking_date: "02/04/2025",
    status: "pending",
    payment_status: "pending",
    total_amount: "6,000,000 VND",
    adults: 2,
    children: 0,
    source: "Trực tiếp",
  },
  {
    booking_id: "BK-1010",
    guest_id: 2,
    guest_name: "Trần Thị B",
    room_id: 1,
    room_number: "101",
    room_type: "Standard",
    check_in: "05/05/2025",
    check_out: "07/05/2025",
    booking_date: "05/04/2025",
    status: "confirmed",
    payment_status: "paid",
    total_amount: "1,600,000 VND",
    adults: 2,
    children: 0,
    source: "Booking.com",
  },
]

// Lịch sử hoạt động mẫu
export interface ActivityLog {
  id: string
  roomId: string
  time: string
  event: string
  user: string
  details?: string
}

// Tạo lịch sử hoạt động mẫu cho một phòng
export const generateRoomActivityLogs = (roomId: string, count = 10): ActivityLog[] => {
  const activities = [
    "Điều chỉnh nhiệt độ điều hòa",
    "Kiểm tra phòng",
    "Khách check-in",
    "Khách check-out",
    "Bảo trì định kỳ thiết bị",
    "Vệ sinh phòng",
    "Thay đổi trạng thái đèn",
    "Điều chỉnh TV",
    "Mở/khóa cửa phòng",
    "Yêu cầu dịch vụ phòng",
    "Báo cáo sự cố thiết bị",
    "Sửa chữa thiết bị",
  ]

  const users = ["Lễ tân", "Nhân viên vệ sinh", "Kỹ thuật viên", "Quản lý", "Khách hàng"]

  const logs: ActivityLog[] = []

  for (let i = 0; i < count; i++) {
    const timeOffset = i === 0 ? "Vừa xong" : i < 3 ? `${i} giờ trước` : i < 5 ? "Hôm nay" : "Hôm qua"
    const timeDetail =
      i < 3 ? "" : i < 5 ? `, ${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)}` : ""
    const time = `${timeOffset}${timeDetail}`

    logs.push({
      id: `log-${roomId}-${i}`,
      roomId,
      time,
      event: activities[Math.floor(Math.random() * activities.length)],
      user: users[Math.floor(Math.random() * users.length)],
      details: i % 3 === 0 ? "Chi tiết bổ sung về hoạt động này" : undefined,
    })
  }

  return logs
}

// Mock data for upcoming check-ins
export const checkInsData: CheckIn[] = [
  {
    guest: "Nguyễn Văn A",
    room: "201",
    roomType: "Standard",
    time: "14:00",
    status: "Đã xác nhận",
    statusVariant: "default",
  },
  {
    guest: "Trần Thị B",
    room: "305",
    roomType: "Deluxe",
    time: "15:30",
    status: "Đã xác nhận",
    statusVariant: "default",
  },
  {
    guest: "Trần Thị B",
    room: "305",
    roomType: "Deluxe",
    time: "15:30",
    status: "Đã xác nhận",
    statusVariant: "default",
  },
  {
    guest: "Lê Văn C",
    room: "401",
    roomType: "Suite",
    time: "16:00",
    status: "Đang xử lý",
    statusVariant: "secondary",
  },
  {
    guest: "Phạm Thị D",
    room: "202",
    roomType: "Standard",
    time: "17:30",
    status: "Đã xác nhận",
    statusVariant: "default",
  },
  {
    guest: "Hoàng Văn E",
    room: "306",
    roomType: "Deluxe",
    time: "18:00",
    status: "Đã xác nhận",
    statusVariant: "default",
  },
]

// Mock data for room statistics
export const roomStatsData = [
  {
    type: "Standard",
    total: 40,
    occupied: 28,
    trend: "up",
    change: 5.2,
  },
  {
    type: "Deluxe",
    total: 25,
    occupied: 20,
    trend: "up",
    change: 8.7,
  },
  {
    type: "Suite",
    total: 15,
    occupied: 13,
    trend: "down",
    change: 2.1,
  },
  {
    type: "Tổng cộng",
    total: 80,
    occupied: 61,
    trend: "up",
    change: 4.5,
  },
]

// Mock data for room occupancy
export const roomOccupancyData = {
  daily: [
    { date: "T2", standard: 65, deluxe: 72, suite: 85 },
    { date: "T3", standard: 70, deluxe: 75, suite: 90 },
    { date: "T4", standard: 75, deluxe: 80, suite: 95 },
    { date: "T5", standard: 80, deluxe: 85, suite: 100 },
    { date: "T6", standard: 90, deluxe: 95, suite: 100 },
    { date: "T7", standard: 95, deluxe: 100, suite: 100 },
    { date: "CN", standard: 85, deluxe: 90, suite: 95 },
  ],
  weekly: [
    { date: "Tuần 1", standard: 70, deluxe: 75, suite: 85 },
    { date: "Tuần 2", standard: 75, deluxe: 80, suite: 90 },
    { date: "Tuần 3", standard: 80, deluxe: 85, suite: 95 },
    { date: "Tuần 4", standard: 85, deluxe: 90, suite: 100 },
  ],
  monthly: [
    { date: "T1", standard: 65, deluxe: 70, suite: 80 },
    { date: "T2", standard: 70, deluxe: 75, suite: 85 },
    { date: "T3", standard: 75, deluxe: 80, suite: 90 },
    { date: "T4", standard: 80, deluxe: 85, suite: 95 },
    { date: "T5", standard: 85, deluxe: 90, suite: 100 },
    { date: "T6", standard: 90, deluxe: 95, suite: 100 },
  ],
}

// Mock data for room type distribution
export const roomTypeDistributionData = {
  types: [
    { name: "Standard", value: 40, color: "hsl(var(--primary))" },
    { name: "Deluxe", value: 25, color: "hsl(217, 91%, 60%)" },
    { name: "Suite", value: 15, color: "hsl(45, 93%, 47%)" },
  ],
  status: [
    { status: "Đã đặt", count: 61, percentage: 76 },
    { status: "Trống", count: 19, percentage: 24 },
  ],
}

// Mock data for recent bookings
export const bookingsData = [
  {
    id: "BK-1001",
    guest: "Nguyễn Văn A",
    room: "101",
    checkIn: "12/04/2025",
    checkOut: "15/04/2025",
    status: "Đã xác nhận",
    statusVariant: "default",
    amount: "2,500,000 VND",
  },
  {
    id: "BK-1002",
    guest: "Trần Thị B",
    room: "202",
    checkIn: "13/04/2025",
    checkOut: "16/04/2025",
    status: "Đang xử lý",
    statusVariant: "secondary",
    amount: "3,800,000 VND",
  },
  {
    id: "BK-1003",
    guest: "Lê Văn C",
    room: "401",
    checkIn: "14/04/2025",
    checkOut: "18/04/2025",
    status: "Đã xác nhận",
    statusVariant: "default",
    amount: "7,200,000 VND",
  },
  {
    id: "BK-1004",
    guest: "Phạm Thị D",
    room: "102",
    checkIn: "15/04/2025",
    checkOut: "17/04/2025",
    status: "Đã hủy",
    statusVariant: "destructive",
    amount: "2,500,000 VND",
  },
  {
    id: "BK-1005",
    guest: "Hoàng Văn E",
    room: "301",
    checkIn: "16/04/2025",
    checkOut: "20/04/2025",
    status: "Đã xác nhận",
    statusVariant: "default",
    amount: "4,800,000 VND",
  },
]

// Helper function to get guest by ID
export function getGuestById(id: number): Guest | undefined {
  return guestData.find((guest) => guest.guest_id === id)
}

// Helper function to get booking by ID
export function getBookingById(id: string): Booking | undefined {
  return bookingData.find((booking) => booking.booking_id === id)
}

// Helper function to get room by ID
export function getRoomById(id: number): Room | undefined {
  const room = roomData.find((room) => room.room_id === id)
  if (room) {
    const roomType = getRoomTypeById(room.room_type_id)
    const status = getRoomStatusById(room.status_id)
    return {
      ...room,
      room_type: roomType,
      status: status,
    }
  }
  return undefined
}

// Sửa hàm getRoomByNumber để không thay đổi trực tiếp dữ liệu gốc
export function getRoomByNumber(roomNumber: string): Room | undefined {
  const room = roomData.find((room) => room.room_number === roomNumber)
  if (room) {
    // Tạo bản sao của phòng để không thay đổi dữ liệu gốc
    const roomCopy = { ...room }

    // Kiểm tra trạng thái thiết bị để xác định trạng thái phòng
    const hasErrorDevice = room.devices.some((device) => device.status === "error")
    const hasMaintenanceDevice = room.devices.some((device) => device.status === "maintenance")

    // Cập nhật status_id cho bản sao, không phải dữ liệu gốc
    if (hasErrorDevice) {
      roomCopy.status_id = 3 // Bảo trì (sử dụng cho cả lỗi)
    } else if (hasMaintenanceDevice) {
      roomCopy.status_id = 3 // Bảo trì
    }

    const roomType = getRoomTypeById(roomCopy.room_type_id)
    const status = getRoomStatusById(roomCopy.status_id)
    return {
      ...roomCopy,
      room_type: roomType,
      status: status,
    }
  }
  return undefined
}

// Helper function to get booking status text in Vietnamese
export function getBookingStatusText(status: BookingStatus): string {
  switch (status) {
    case "confirmed":
      return "Đã xác nhận"
    case "pending":
      return "Đang xử lý"
    case "cancelled":
      return "Đã hủy"
    case "completed":
      return "Đã hoàn thành"
    case "no-show":
      return "Không đến"
    default:
      return status
  }
}

// Helper function to get payment status text in Vietnamese
export function getPaymentStatusText(status: "paid" | "pending" | "partial" | "refunded"): string {
  switch (status) {
    case "paid":
      return "Đã thanh toán"
    case "pending":
      return "Chưa thanh toán"
    case "partial":
      return "Thanh toán một phần"
    case "refunded":
      return "Đã hoàn tiền"
    default:
      return status
  }
}

// Helper function to get room type by ID
export function getRoomTypeById(id: number): RoomType | undefined {
  return roomTypeData.find((type) => type.room_type_id === id)
}

// Helper function to get room status by ID
export function getRoomStatusById(id: number): RoomStatus | undefined {
  return roomStatusData.find((status) => status.status_id === id)
}

// Helper function to get room activity logs
export function getRoomActivityLogs(roomId: string): ActivityLog[] {
  return generateRoomActivityLogs(roomId)
}

// Sửa hàm getFullRoomData để không thay đổi trực tiếp dữ liệu gốc
export function getFullRoomData(): Room[] {
  return roomData.map((room) => {
    // Tạo bản sao của phòng
    const roomCopy = { ...room }

    // Kiểm tra trạng thái thiết bị để xác định trạng thái phòng
    const hasErrorDevice = room.devices.some((device) => device.status === "error")
    const hasMaintenanceDevice = room.devices.some((device) => device.status === "maintenance")

    // Cập nhật status_id cho bản sao
    if (hasErrorDevice) {
      roomCopy.status_id = 3 // Bảo trì (sử dụng cho cả lỗi)
    } else if (hasMaintenanceDevice) {
      roomCopy.status_id = 3 // Bảo trì
    }

    const roomType = getRoomTypeById(roomCopy.room_type_id)
    const status = getRoomStatusById(roomCopy.status_id)

    return {
      ...roomCopy,
      room_type: roomType,
      status: status,
    }
  })
}

// Sửa hàm getRoomsByFloor để không thay đổi trực tiếp dữ liệu gốc
export function getRoomsByFloor(floor: number): Room[] {
  return roomData
    .filter((room) => room.floor === floor)
    .map((room) => {
      // Tạo bản sao của phòng
      const roomCopy = { ...room }

      // Kiểm tra trạng thái thiết bị để xác định trạng thái phòng
      const hasErrorDevice = room.devices.some((device) => device.status === "error")
      const hasMaintenanceDevice = room.devices.some((device) => device.status === "maintenance")

      // Cập nhật status_id cho bản sao
      if (hasErrorDevice) {
        roomCopy.status_id = 3 // Bảo trì (sử dụng cho cả lỗi)
      } else if (hasMaintenanceDevice) {
        roomCopy.status_id = 3 // Bảo trì
      }

      const roomType = getRoomTypeById(roomCopy.room_type_id)
      const status = getRoomStatusById(roomCopy.status_id)
      return {
        ...roomCopy,
        room_type: roomType,
        status: status,
      }
    })
}

// Sửa hàm getRoomsByType để không thay đổi trực tiếp dữ liệu gốc
export function getRoomsByType(typeId: number): Room[] {
  return roomData
    .filter((room) => room.room_type_id === typeId)
    .map((room) => {
      // Tạo bản sao của phòng
      const roomCopy = { ...room }

      // Kiểm tra trạng thái thiết bị để xác định trạng thái phòng
      const hasErrorDevice = room.devices.some((device) => device.status === "error")
      const hasMaintenanceDevice = room.devices.some((device) => device.status === "maintenance")

      // Cập nhật status_id cho bản sao
      if (hasErrorDevice) {
        roomCopy.status_id = 3 // Bảo trì (sử dụng cho cả lỗi)
      } else if (hasMaintenanceDevice) {
        roomCopy.status_id = 3 // Bảo trì
      }

      const roomType = getRoomTypeById(roomCopy.room_type_id)
      const status = getRoomStatusById(roomCopy.status_id)
      return {
        ...roomCopy,
        room_type: roomType,
        status: status,
      }
    })
}

// Sửa hàm getRoomsByStatus để không thay đổi trực tiếp dữ liệu gốc
export function getRoomsByStatus(statusId: number): Room[] {
  return roomData
    .filter((room) => {
      // Kiểm tra trạng thái thiết bị để xác định trạng thái phòng
      const hasErrorDevice = room.devices.some((device) => device.status === "error")
      const hasMaintenanceDevice = room.devices.some((device) => device.status === "maintenance")

      // Xác định status_id thực tế mà không thay đổi dữ liệu gốc
      let effectiveStatusId = room.status_id
      if (hasErrorDevice || hasMaintenanceDevice) {
        effectiveStatusId = 3 // Bảo trì
      }

      return effectiveStatusId === statusId
    })
    .map((room) => {
      // Tạo bản sao của phòng
      const roomCopy = { ...room }

      // Kiểm tra trạng thái thiết bị để xác định trạng thái phòng
      const hasErrorDevice = room.devices.some((device) => device.status === "error")
      const hasMaintenanceDevice = room.devices.some((device) => device.status === "maintenance")

      // Cập nhật status_id cho bản sao
      if (hasErrorDevice) {
        roomCopy.status_id = 3 // Bảo trì (sử dụng cho cả lỗi)
      } else if (hasMaintenanceDevice) {
        roomCopy.status_id = 3 // Bảo trì
      }

      const roomType = getRoomTypeById(roomCopy.room_type_id)
      const status = getRoomStatusById(roomCopy.status_id)
      return {
        ...roomCopy,
        room_type: roomType,
        status: status,
      }
    })
}

// Helper function to get bookings by guest ID
export function getBookingsByGuestId(guestId: number): Booking[] {
  return bookingData.filter((booking) => booking.guest_id === guestId)
}

// Helper function to get bookings by room ID
export function getBookingsByRoomId(roomId: number): Booking[] {
  return bookingData.filter((booking) => booking.room_id === roomId)
}

// Helper function to get bookings by status
export function getBookingsByStatus(status: BookingStatus): Booking[] {
  return bookingData.filter((booking) => booking.status === status)
}

// Helper function to get devices by room type name
export function getDevicesByRoomTypeName(typeName: string): Device[] {
  return mockDevices.filter((device) => device.supportedRoomTypes.includes(typeName))
}

// Thêm hàm helper để lấy lịch sử điều khiển thiết bị
export function getDeviceControlLogs(deviceId?: string): DeviceControlLog[] {
  if (deviceId) {
    return deviceControlLogs.filter((log) => log.deviceId === deviceId)
  }
  return deviceControlLogs
}

// Thêm hàm helper để lấy lịch sử lỗi thiết bị
export function getDeviceErrorLogs(deviceId?: string): DeviceErrorLog[] {
  if (deviceId) {
    return deviceErrorLogs.filter((log) => log.deviceId === deviceId)
  }
  return deviceErrorLogs
}

// Hàm helper để lấy thiết bị theo ID
export function getDeviceById(id: string): Device | undefined {
  return mockDevices.find((device) => device.id === id)
}

// Hàm helper để lấy thiết bị theo phòng
export function getDevicesByRoom(roomNumber: string): Device[] {
  return mockDevices.filter((device) => device.roomNumber === roomNumber)
}

// Hàm helper để lấy thiết bị theo tầng
export function getDevicesByFloor(floor: number): Device[] {
  return mockDevices.filter((device) => device.floor === floor)
}
