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
  | "smart-shower";

export type DeviceSettings = {
  ac: {
    power: boolean;
    temperature: number;
    mode: string;
    fanSpeed: string;
  };
  light: {
    power: boolean;
    brightness: number;
    color?: string;
  };
  "bedside-light": {
    power: boolean;
    brightness: number;
    color?: string;
  };
  "bathroom-light": {
    power: boolean;
    brightness: number;
    color?: string;
  };
  tv: {
    power: boolean;
    volume: number;
    source: string;
  };
  lock: {
    locked: boolean;
    dndMode: boolean;
  };
  "coffee-machine": {
    power: boolean;
    coffeeType: string;
  };
  "air-purifier": {
    power: boolean;
    mode: string;
  };
  "music-system": {
    power: boolean;
    volume: number;
    source: string;
  };
  "smart-shower": {
    power: boolean;
    temperature: number;
    mode: string;
  };
};

export interface Device<T extends DeviceType = DeviceType> {
  id: string;
  name: string;
  type: T;
  status: "active" | "maintenance" | "error";
  macAddress: string;
  state: DeviceSettings[T];
  supportedRoomTypes?: string[];
  model?: string;
  firmware?: string;
  installDate?: string;
  manufacturer?: string;
  serialNumber?: string;
  isOnline?: boolean;
  lastOnline?: string;
  roomId?: number;
}