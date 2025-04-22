import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Device } from "@/lib/data/data"

// Định nghĩa kiểu dữ liệu cho trạng thái thiết bị
export interface DeviceState {
  power?: boolean
  temperature?: number
  brightness?: number
  volume?: number
  mode?: string
  source?: string
  locked?: boolean
  dndMode?: boolean
  coffeeType?: string
  color?: string
  colorTemp?: number
  openPercentage?: number
}

// Định nghĩa kiểu dữ liệu cho store
interface DeviceStore {
  // Lưu trữ trạng thái thiết bị theo ID
  deviceStates: Record<string, DeviceState>

  // Lưu trữ thiết bị đang được báo cáo lỗi
  selectedErrorDevice: Device | null

  // Lưu trữ trạng thái dialog báo cáo lỗi
  isReportDialogOpen: boolean

  // Lưu trữ lịch sử báo cáo lỗi
  errorReports: ErrorReport[]

  // Actions
  initializeDeviceState: (devices: Device[]) => void
  updateDeviceState: (deviceId: string, key: string, value: any) => void
  setSelectedErrorDevice: (device: Device | null) => void
  setIsReportDialogOpen: (isOpen: boolean) => void
  addErrorReport: (report: ErrorReport) => void
  toggleDevicePower: (deviceId: string) => void
  resetAllDevices: () => void

  // Helpers
  getDeviceState: (deviceId: string) => DeviceState
}

// Định nghĩa kiểu dữ liệu cho báo cáo lỗi
export interface ErrorReport {
  id: string
  deviceId: string
  deviceName: string
  deviceType: string
  roomNumber: string
  timestamp: number
  priority: "high" | "medium" | "low"
  description: string
  status: "pending" | "in-progress" | "resolved"
  assignedTo?: string
  resolvedAt?: number
}

// Tạo store với Zustand
export const useDeviceStore = create<DeviceStore>()(
  persist(
    (set, get) => ({
      deviceStates: {},
      selectedErrorDevice: null,
      isReportDialogOpen: false,
      errorReports: [],

      // Khởi tạo trạng thái thiết bị từ danh sách thiết bị
      initializeDeviceState: (devices: Device[]) => {
        const currentStates = get().deviceStates
        const newStates: Record<string, DeviceState> = { ...currentStates }

        devices.forEach((device) => {
          // Chỉ khởi tạo nếu thiết bị chưa có trong store
          if (!newStates[device.id]) {
            newStates[device.id] = { ...device.settings }
          }
        })

        set({ deviceStates: newStates })
      },

      // Cập nhật trạng thái của một thiết bị
      updateDeviceState: (deviceId: string, key: string, value: any) => {
        set((state) => ({
          deviceStates: {
            ...state.deviceStates,
            [deviceId]: {
              ...state.deviceStates[deviceId],
              [key]: value,
            },
          },
        }))
      },

      // Lấy trạng thái của một thiết bị
      getDeviceState: (deviceId: string) => {
        return get().deviceStates[deviceId] || {}
      },

      // Đặt thiết bị đang được báo cáo lỗi
      setSelectedErrorDevice: (device: Device | null) => {
        set({ selectedErrorDevice: device })
      },

      // Đặt trạng thái dialog báo cáo lỗi
      setIsReportDialogOpen: (isOpen: boolean) => {
        set({ isReportDialogOpen: isOpen })
      },

      // Thêm báo cáo lỗi mới
      addErrorReport: (report: ErrorReport) => {
        set((state) => ({
          errorReports: [...state.errorReports, report],
        }))
      },

      // Bật/tắt thiết bị
      toggleDevicePower: (deviceId: string) => {
        set((state) => {
          const currentPower = state.deviceStates[deviceId]?.power || false
          return {
            deviceStates: {
              ...state.deviceStates,
              [deviceId]: {
                ...state.deviceStates[deviceId],
                power: !currentPower,
              },
            },
          }
        })
      },

      // Reset tất cả thiết bị về trạng thái mặc định
      resetAllDevices: () => {
        set({ deviceStates: {} })
      },
    }),
    {
      name: "hotel-device-storage", // Tên của localStorage key
      partialize: (state) => ({
        deviceStates: state.deviceStates,
        errorReports: state.errorReports,
      }), // Chỉ lưu trữ deviceStates và errorReports
    },
  ),
)
