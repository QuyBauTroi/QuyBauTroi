
import { Device, DeviceSettings } from "@/types/device";

const API_URL = "http://localhost:3001";

export const deviceService = {
  getAllDevices: async (): Promise<Device[]> => {
    const response = await fetch(`${API_URL}/devices`);
    if (!response.ok) throw new Error("Failed to fetch devices");
    return response.json();
  },

  getDevice: async (id: string): Promise<Device> => {
    const response = await fetch(`${API_URL}/devices/${id}`);
    if (!response.ok) throw new Error("Failed to fetch device");
    return response.json();
  },

  createDevice: async (device: Omit<Device, "id">): Promise<Device> => {
    const response = await fetch(`${API_URL}/devices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    });
    if (!response.ok) throw new Error("Failed to create device");
    return response.json();
  },

  updateDevice: async (id: string, device: Partial<Device>): Promise<Device> => {
    const response = await fetch(`${API_URL}/devices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    });
    if (!response.ok) throw new Error("Failed to update device");
    return response.json();
  },

  deleteDevice: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/devices/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete device");
  },

  updateDeviceState: async <T extends Device["type"]>(
    id: string,
    state: Partial<DeviceSettings[T]>
  ): Promise<Device> => {
    const currentDevice = await fetch(`${API_URL}/devices/${id}`).then((res) => res.json());
    // Cập nhật state, giữ nguyên các trường khác
    const updatedDevice = {
      ...currentDevice,
      state: {
        ...currentDevice.state,
        ...state, // Gộp tất cả các trường được gửi (power, temperature, v.v.)
      },
    };

    const response = await fetch(`${API_URL}/devices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDevice),
    });
    if (!response.ok) throw new Error("Failed to update device state");
    return response.json();
  },
};
