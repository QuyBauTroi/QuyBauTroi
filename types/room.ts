export interface Room {
  room_id: number;
  room_number: string;
  floor: number;
  room_type: {
    room_type_id: number;
    room_type_name: string;
  };
  status: string;
  devices: number[];
} 