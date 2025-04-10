"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2, Key } from "lucide-react"
import { EditRoomDialog } from "@/components/Rooms/EditRoomDialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,} from "@/components/ui/alert-dialog"
import { getFullRoomData, getRoomStatusById, type Room } from "@/data/data"


export function RoomsList() {
    const router = useRouter()
    const [editingRoom, setEditingRoom] = useState<Room | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [roomToDelete, setRoomToDelete] = useState<number | null>(null)

  // Get full room data with joined fields
    const rooms = getFullRoomData()

    const getStatusBadge = (statusId: number) => {
        const status = getRoomStatusById(statusId)
        if (!status) return <Badge variant="outline">Không xác định</Badge>
        switch (status.status_name) {
        case "Trống":
            return <Badge  className="border-green-500 bg-green-400 text-white">Trống</Badge>
        case "Đang sử dụng":
            return <Badge className="bg-blue-400">Đang sử dụng</Badge>
        case "Bảo trì":
            return <Badge variant="destructive">Bảo trì</Badge>
        case "Đang dọn dẹp":
            return (
            <Badge variant="outline" className="border-amber-500 text-amber-500">
                Đang dọn dẹp
            </Badge>
            )
        default:
            return <Badge variant="outline">{status.status_name}</Badge>
        }
    }

    const handleEdit = (room: Room) => {
        setEditingRoom(room)
        setIsEditDialogOpen(true)
    }
    const handleDelete = (roomId: number) => {
        setRoomToDelete(roomId)
        setIsDeleteDialogOpen(true)
    }
    const confirmDelete = () => {
        console.log(`Deleting room with ID: ${roomToDelete}`)
        setIsDeleteDialogOpen(false)
    }
    const navigateToRoomDetail = (roomId: number) => {
        router.push(`/Rooms/${roomId}`)
    }


    return (
        <>
        <div className="rounded-md border mr-5">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Số phòng</TableHead>
                <TableHead>Loại phòng</TableHead>
                <TableHead>Tầng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Giá (VND/đêm)</TableHead>
                <TableHead>Sức chứa</TableHead>
                <TableHead>Đặt phòng tiếp theo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rooms.map((room) => (
                <TableRow key={room.room_id} className="cursor-pointer hover:bg-gray-100" >
                    <TableCell className="font-medium">
                        <Button variant="link" className="p-0 h-auto font-medium" onClick={() => navigateToRoomDetail(room.room_id)}>
                            {room.room_number}
                        </Button>
                    </TableCell>
                    <TableCell>{room.room_type?.room_type_name}</TableCell>
                    <TableCell>{room.floor}</TableCell>
                    <TableCell>{getStatusBadge(room.status_id)}</TableCell>
                    <TableCell>{room.room_type?.price_per_night}</TableCell>
                    <TableCell>{room.capacity} người</TableCell>
                    <TableCell>{room.next_booking || "Không có"}</TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigateToRoomDetail(room.room_id)}>Xem chi tiết</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(room)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Key className="mr-2 h-4 w-4" />
                            Đổi trạng thái
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(room.room_id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa phòng
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>

        {/* Edit Room Dialog */}
        {editingRoom && <EditRoomDialog room={editingRoom} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                <AlertDialogDescription>
                Hành động này không thể hoàn tác. Phòng này sẽ bị xóa vĩnh viễn khỏi hệ thống.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Xóa
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
    )
}
