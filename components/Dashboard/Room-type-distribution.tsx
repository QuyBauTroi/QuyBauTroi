"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RoomTypeDistributionProps {
  className?: string
}

export function RoomTypeDistribution({ className }: RoomTypeDistributionProps) {
  // Mock data for room type distribution
  const data = [
    { name: "Phòng tiêu chuẩn", value: 61, color: "#4F46E5" },
    { name: "Phòng cao cấp", value: 19, color: "#FBBF24" },
    { name: "Phòng suite", value: 20, color: "#EF4444" },
  ]

  // Mock data for room status
  const statusData = [
    { status: "Đã đặt", count: 61, percentage: 76 },
    { status: "Trống", count: 19, percentage: 24 },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Phân bố loại phòng</CardTitle>
        <CardDescription>Tỷ lệ các loại phòng trong khách sạn</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          {/* Simple pie chart visualization using CSS */}
          <div className="flex justify-center items-center">
            <div className="relative w-40 h-40">
              <div
                className="absolute inset-0 rounded-full border-8 border-primary"
                style={{
                  clipPath: `polygon(50% 50%, 0 0, 0 100%, 100% 100%, 100% 0)`,
                  transform: `rotate(${data[0].value * 3.6}deg)`,
                }}
              ></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-blue-500"
                style={{
                  clipPath: `polygon(50% 50%, 0 0, ${data[1].value * 3.6}% 0)`,
                  transform: `rotate(${data[0].value * 3.6}deg)`,
                }}
              ></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-amber-500"
                style={{
                  clipPath: `polygon(50% 50%, 0 0, ${data[2].value * 3.6}% 0)`,
                  transform: `rotate(${(data[0].value + data[1].value) * 3.6}deg)`,
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">{data.reduce((acc, item) => acc + item.value, 0)}</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                <div className="flex flex-col">
                  <span className="text-xs">{item.name}</span>
                  <span className="text-xs font-medium">
                    {item.value} ({Math.round((item.value / data.reduce((acc, d) => acc + d.value, 0)) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room status */}
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Trạng thái phòng</h4>
          <div className="space-y-4">
            {statusData.map((item) => (
              <div key={item.status} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.status}</span>
                  <span className="font-medium">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.status === "Đã đặt" ? "bg-primary" : "bg-muted-foreground/30"}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
