"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RoomOccupancyProps {
  className?: string
}

// Mock data for different time periods
const mockData = {
  daily: [
    { date: "T2", standard: 65, deluxe: 72, suite: 85 },
    { date: "T3", standard: 70, deluxe: 75, suite: 90 },
    { date: "T4", standard: 75, deluxe: 80, suite: 95 },
    { date: "T5", standard: 30, deluxe: 85, suite: 100 },
    { date: "T6", standard: 50, deluxe: 75, suite: 90 },
    { date: "T7", standard: 65, deluxe: 40, suite: 30 },
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
    { date: "T5", standard: 85, deluxe: 90, suite: 10 },
    { date: "T6", standard: 90, deluxe: 95, suite: 100 },
  ],
}

export function RoomOccupancy({ className }: RoomOccupancyProps) {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">("weekly")
  const data = mockData[activeTab]
  const maxValue = 100 // Maximum percentage value

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Tỷ lệ lấp đầy phòng</CardTitle>
          <CardDescription>Tỷ lệ lấp đầy phòng theo thời gian</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tabs defaultValue="weekly" value={activeTab} onValueChange={(value) => setActiveTab(value as "daily" | "weekly" | "monthly")} className="mr-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Ngày</TabsTrigger>
              <TabsTrigger value="weekly">Tuần</TabsTrigger>
              <TabsTrigger value="monthly">Tháng</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {/* Chart Legend */}
          <div className="flex items-center justify-end gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
              <span className="text-sm">Standard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-sm">Deluxe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
              <span className="text-sm">Suite</span>
            </div>
          </div>
          {/* Chart */}
          <div className="relative h-[220px] w-full">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            {/* Chart grid lines */}
            <div className="absolute left-8 right-0 top-0 h-full flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-dashed border-muted-foreground/20 w-full h-0"></div>
              ))}
            </div>
            {/* Bar chart */}
            <div className="absolute left-10 right-0 top-0 h-full flex items-end">
              <div className="flex-1 flex justify-around items-end h-full">
                {data.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-1 group">
                    <div className="relative flex gap-1 h-[200px] items-end">
                      {/* Standard room bar */}
                      <div className="w-4 bg-primary rounded-sm transition-all duration-300 hover:opacity-80 cursor-pointer relative group" style={{ height: `${(item.standard / maxValue) * 100}%` }}>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-background border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          Standard: {item.standard}%
                        </div>
                      </div>
                      {/* Deluxe room bar */}
                      <div className="w-4 bg-blue-500 rounded-sm transition-all duration-300 hover:opacity-80 cursor-pointer relative group" style={{ height: `${(item.deluxe / maxValue) * 100}%` }}>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-background border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          Deluxe: {item.deluxe}%
                        </div>
                      </div>
                      {/* Suite room bar */}
                      <div className="w-4 bg-amber-500 rounded-sm transition-all duration-300 hover:opacity-80 cursor-pointer relative group" style={{ height: `${(item.suite / maxValue) * 100}%` }}>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-background border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          Suite: {item.suite}%
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="border rounded-md p-3">
            <div className="text-sm font-medium">Standard</div>
            <div className="text-2xl font-bold">
              {Math.round(data.reduce((acc, item) => acc + item.standard, 0) / data.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Tỷ lệ trung bình</div>
          </div>
          <div className="border rounded-md p-3">
            <div className="text-sm font-medium">Deluxe</div>
            <div className="text-2xl font-bold">
              {Math.round(data.reduce((acc, item) => acc + item.deluxe, 0) / data.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Tỷ lệ trung bình</div>
          </div>
          <div className="border rounded-md p-3">
            <div className="text-sm font-medium">Suite</div>
            <div className="text-2xl font-bold">
              {Math.round(data.reduce((acc, item) => acc + item.suite, 0) / data.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Tỷ lệ trung bình</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
