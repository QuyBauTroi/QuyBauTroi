// Room Status
export interface RoomStatus {
    status_id: number
    status_name: string
    color?: string // For UI display purposes
    description?: string
  }
  
  // Amenity
  export interface Amenity {
    amenity_id: number
    amenity_name: string
    description: string
    icon?: string // For UI display purposes
  }
  
  // Room Type
  export interface RoomType {
    room_type_id: number
    room_type_name: string
    description: string
    price_per_night: string // Using string for formatted price display
    max_adults: number
    max_children: number
    amenities: string // JSON string or comma-separated list
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
    floor?: number // Derived from room_number but useful for UI
    last_cleaned?: string // For UI display purposes
    next_booking?: string | null // For UI display purposes
  
    // Joined fields (not in DB schema but useful for UI)
    room_type?: RoomType
    status?: RoomStatus
    room_amenities?: RoomAmenity[]
  }
  
  // Room Amenity (junction table)
  export interface RoomAmenity {
    room_amenity_id: number
    room_id: number
    amenity_id: number
    amenity?: Amenity // Joined field
  }
  
  // Booking (for UI purposes)
  export interface Booking {
    id: string
    guest: string
    room: string
    checkIn: string
    checkOut: string
    status: string
    statusVariant: "default" | "secondary" | "outline"
    amount: string
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
  
  // Mock data for amenities
  export const amenityData: Amenity[] = [
    {
      amenity_id: 1,
      amenity_name: "WiFi",
      description: "Internet không dây tốc độ cao",
      icon: "wifi",
    },
    {
      amenity_id: 2,
      amenity_name: "TV",
      description: "TV màn hình phẳng",
      icon: "tv",
    },
    {
      amenity_id: 3,
      amenity_name: "Điều hòa",
      description: "Điều hòa nhiệt độ",
      icon: "ac",
    },
    {
      amenity_id: 4,
      amenity_name: "Minibar",
      description: "Tủ lạnh mini với đồ uống",
      icon: "minibar",
    },
    {
      amenity_id: 5,
      amenity_name: "Két an toàn",
      description: "Két an toàn trong phòng",
      icon: "safe",
    },
    {
      amenity_id: 6,
      amenity_name: "Bồn tắm",
      description: "Bồn tắm lớn",
      icon: "bathtub",
    },
    {
      amenity_id: 7,
      amenity_name: "Jacuzzi",
      description: "Bồn tắm sục Jacuzzi",
      icon: "jacuzzi",
    },
    {
      amenity_id: 8,
      amenity_name: "Phòng khách",
      description: "Phòng khách riêng biệt",
      icon: "living-room",
    },
    {
      amenity_id: 9,
      amenity_name: "Bếp",
      description: "Bếp đầy đủ tiện nghi",
      icon: "kitchen",
    },
    {
      amenity_id: 10,
      amenity_name: "Hồ bơi riêng",
      description: "Hồ bơi riêng",
      icon: "pool",
    },
    {
      amenity_id: 11,
      amenity_name: "Dịch vụ quản gia",
      description: "Dịch vụ quản gia 24/7",
      icon: "butler",
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
      amenities: "1,2,3", // IDs of WiFi, TV, AC
      room_count: 20,
    },
    {
      room_type_id: 2,
      room_type_name: "Deluxe",
      description: "Phòng cao cấp với không gian rộng rãi và view đẹp.",
      price_per_night: "1,200,000",
      max_adults: 2,
      max_children: 2,
      amenities: "1,2,3,4,6", // IDs of WiFi, TV, AC, Minibar, Bathtub
      room_count: 15,
    },
    {
      room_type_id: 3,
      room_type_name: "Suite",
      description: "Phòng suite sang trọng với phòng khách riêng biệt.",
      price_per_night: "2,500,000",
      max_adults: 3,
      max_children: 2,
      amenities: "1,2,3,4,7,8", // IDs of WiFi, TV, AC, Minibar, Jacuzzi, Living Room
      room_count: 10,
    },
    {
      room_type_id: 4,
      room_type_name: "Presidential Suite",
      description: "Phòng suite tổng thống với dịch vụ cao cấp nhất.",
      price_per_night: "5,000,000",
      max_adults: 4,
      max_children: 2,
      amenities: "1,2,3,4,7,8,9,10,11", // All premium amenities
      room_count: 2,
    },
  ]
  
  // Mock data for room amenities (junction table)
  export const roomAmenityData: RoomAmenity[] = [
    // Room 101 amenities
    { room_amenity_id: 1, room_id: 1, amenity_id: 1 }, // WiFi
    { room_amenity_id: 2, room_id: 1, amenity_id: 2 }, // TV
    { room_amenity_id: 3, room_id: 1, amenity_id: 3 }, // AC
  
    // Room 102 amenities
    { room_amenity_id: 4, room_id: 2, amenity_id: 1 }, // WiFi
    { room_amenity_id: 5, room_id: 2, amenity_id: 2 }, // TV
    { room_amenity_id: 6, room_id: 2, amenity_id: 3 }, // AC
  
    // Room 201 amenities (Deluxe)
    { room_amenity_id: 7, room_id: 3, amenity_id: 1 }, // WiFi
    { room_amenity_id: 8, room_id: 3, amenity_id: 2 }, // TV
    { room_amenity_id: 9, room_id: 3, amenity_id: 3 }, // AC
    { room_amenity_id: 10, room_id: 3, amenity_id: 4 }, // Minibar
  
    // Room 202 amenities (Deluxe)
    { room_amenity_id: 11, room_id: 4, amenity_id: 1 }, // WiFi
    { room_amenity_id: 12, room_id: 4, amenity_id: 2 }, // TV
    { room_amenity_id: 13, room_id: 4, amenity_id: 3 }, // AC
    { room_amenity_id: 14, room_id: 4, amenity_id: 4 }, // Minibar
  
    // Room 301 amenities (Suite)
    { room_amenity_id: 15, room_id: 5, amenity_id: 1 }, // WiFi
    { room_amenity_id: 16, room_id: 5, amenity_id: 2 }, // TV
    { room_amenity_id: 17, room_id: 5, amenity_id: 3 }, // AC
    { room_amenity_id: 18, room_id: 5, amenity_id: 4 }, // Minibar
    { room_amenity_id: 19, room_id: 5, amenity_id: 7 }, // Jacuzzi
  
    // Room 302 amenities (Suite)
    { room_amenity_id: 20, room_id: 6, amenity_id: 1 }, // WiFi
    { room_amenity_id: 21, room_id: 6, amenity_id: 2 }, // TV
    { room_amenity_id: 22, room_id: 6, amenity_id: 3 }, // AC
    { room_amenity_id: 23, room_id: 6, amenity_id: 4 }, // Minibar
    { room_amenity_id: 24, room_id: 6, amenity_id: 7 }, // Jacuzzi
  
    // Room 401 amenities (Presidential Suite)
    { room_amenity_id: 25, room_id: 7, amenity_id: 1 }, // WiFi
    { room_amenity_id: 26, room_id: 7, amenity_id: 2 }, // TV
    { room_amenity_id: 27, room_id: 7, amenity_id: 3 }, // AC
    { room_amenity_id: 28, room_id: 7, amenity_id: 4 }, // Minibar
    { room_amenity_id: 29, room_id: 7, amenity_id: 7 }, // Jacuzzi
    { room_amenity_id: 30, room_id: 7, amenity_id: 9 }, // Kitchen
    { room_amenity_id: 31, room_id: 7, amenity_id: 10 }, // Private Pool
  ]
  
  // Mock data for rooms
  export const roomData: Room[] = [
    {
      room_id: 1,
      room_number: "101",
      room_type_id: 1, // Standard
      status_id: 1, // Available
      capacity: 2,
      description: "Phòng Standard tầng 1 với view ra phố",
      cleaning_status: "clean",
      floor: 1,
      last_cleaned: "09/04/2025",
      next_booking: null,
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
    },
  ]
  
  // Helper function to get room type by ID
  export function getRoomTypeById(id: number): RoomType | undefined {
    return roomTypeData.find((type) => type.room_type_id === id)
  }
  
  // Helper function to get room status by ID
  export function getRoomStatusById(id: number): RoomStatus | undefined {
    return roomStatusData.find((status) => status.status_id === id)
  }
  
  // Helper function to get amenity by ID
  export function getAmenityById(id: number): Amenity | undefined {
    return amenityData.find((amenity) => amenity.amenity_id === id)
  }
  
  // Helper function to get room amenities by room ID
  export function getRoomAmenitiesByRoomId(roomId: number): RoomAmenity[] {
    return roomAmenityData.filter((ra) => ra.room_id === roomId)
  }
  
  // Helper function to get full room data with joined fields
  export function getFullRoomData(): Room[] {
    return roomData.map((room) => {
      const roomType = getRoomTypeById(room.room_type_id)
      const status = getRoomStatusById(room.status_id)
      const roomAmenities = getRoomAmenitiesByRoomId(room.room_id).map((ra) => {
        return {
          ...ra,
          amenity: getAmenityById(ra.amenity_id),
        }
      })
  
      return {
        ...room,
        room_type: roomType,
        status: status,
        room_amenities: roomAmenities,
      }
    })
  }
  
