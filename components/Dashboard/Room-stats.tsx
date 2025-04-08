import { BedDouble, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function RoomStats() {
  // Mock data for room statistics
  const roomStats = [
    {
      type: "Standard",
      total: 45,
      occupied: 18,
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

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {roomStats.map((stat) => (
            <Card key={stat.type}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.type}</CardTitle>
                    <BedDouble className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{Math.round((stat.occupied / stat.total) * 100)}%</div>
                        <div className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                            {stat.trend === "up" ? (<TrendingUp className="mr-1 h-3 w-3" />) : (<TrendingDown className="mr-1 h-3 w-3" />)}{stat.change}%
                        </div>
                    </div>
                <Progress value={(stat.occupied / stat.total) * 100} className="h-2 mt-2" />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>
                    {stat.occupied} / {stat.total} phòng
                </span>
                <span>Đã đặt</span>
                </div>
            </CardContent>
        </Card>
      ))}
    </div>
  )
}