import { Room } from "@/types/room";

const API_URL = "http://localhost:3001";

export const roomService = {
  getAllRooms: async (): Promise<Room[]> => {
    const response = await fetch(`${API_URL}/rooms`);
    if (!response.ok) throw new Error("Failed to fetch rooms");
    return response.json();
  },

  getRoom: async (id: number): Promise<Room> => {
    const response = await fetch(`${API_URL}/rooms/${id}`);
    if (!response.ok) throw new Error("Failed to fetch room");
    return response.json();
  },
};
