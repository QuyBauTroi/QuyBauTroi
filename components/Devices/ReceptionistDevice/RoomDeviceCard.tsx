"use cliant"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, ThermometerSun, Wifi } from "lucide-react"
import Link from "next/link"

interface RoomCardProps {
    roomNumber: string
    status: "active" | "maintenance" | "error"
    roomType: "standard" | "junior" | "deluxe" | "suite" | "president"
}

export default function RoomCard({ roomNumber, status, roomType }: RoomCardProps) {
    return (
        <Card className={`overflow-hidden ${status === "error" ? "border-red-400 border-2 bg-red-100" : status === "maintenance" ? "border-amber-500 border-2 bg-amber-100" : " border-2 border-green-400 bg-green-100"}`} >
        <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
            <Link className="text-2xl font-medium" href={`/receptionist/devices/${roomNumber}`}>Phòng {roomNumber}</Link>
            {status === "active" ? (
                <CheckCircle className="h-7 w-7 text-green-600" />
            ) : status === "error" ? (
                <AlertTriangle className="h-7 w-7 text-red-600" />
            ) : (
                <Clock className="h-7 w-7 text-amber-600" />
            )}
            </div>
            <CardDescription className="flex items-center gap-2">
            <span className="capitalize">{roomType}</span>
            <span>•</span>
            <span>{status === "active" ? "Đang hoạt động" : status === "error" ? "Có lỗi" : "Đang bảo trì"}</span>
            </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-2 text-sm">
                <ThermometerSun className="h-6 w-6 text-orange-500" />
                <span>{status === "error" ? "Lỗi" : "24°C"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <Wifi className="h-6 w-6 text-blue-500" />
                <span>{status === "error" ? "Lỗi" : "Kết nối"}</span>
            </div>
            </div>
            <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/receptionist/devices/${roomNumber}`}>Chi tiết</Link>
            </Button>
            </div>
        </CardContent>
        </Card>
    )
}
