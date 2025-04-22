"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2, Key } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { bookingData, getBookingStatusText, getPaymentStatusText, type BookingStatus, type Booking } from "@/lib/data/data"

interface BookingsListProps {
    filter: "all" | "current" | "past" | "cancelled"
}

export function BookingList({ filter }: BookingsListProps) {
    const router = useRouter()
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [bookingToDelete, setBookingToDelete] = useState<string | null>(null)

    const filteredBookings = bookingData.filter((booking) => {
        const today = new Date()
        const checkInDate = new Date(booking.check_in.split("/").reverse().join("-"))
        const checkOutDate = new Date(booking.check_out.split("/").reverse().join("-"))
        switch (filter) {
            case "current":
                return booking.status === "confirmed" && checkInDate <= today && checkOutDate >= today
            case "past":
                return booking.status === "completed" || (booking.status === "confirmed" && checkOutDate < today)
            case "cancelled":
                return booking.status === "cancelled" || booking.status === "no-show"
            default:
                return true
        }
    })
    const handleEdit = (booking: Booking) => {
        setEditingBooking(booking)
        setIsEditDialogOpen(true)
    }
    const handleDelete = (bookingId: string) => {
        setBookingToDelete(bookingId)
        setIsDeleteDialogOpen(true)
    }
    const confirmDelete = () => {
        console.log(`Deleting room with ID: ${bookingToDelete}`)
        setIsDeleteDialogOpen(false)
    }
    const navigateToBookingDetail = (bookingId: string) => {
        router.push(`/bookings/${bookingId}`)
    }
    const getCustomBadgeClass = (status: string): string => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "confirmed":
                return "bg-green-100 text-green-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }
    function getPaymentStatusBadgeClass(status: string): string {
        switch (status) {
            case "unpaid":
                return "bg-yellow-100 text-yellow-800 border border-yellow-300"
            case "paid":
                return "bg-green-100 text-green-800 border border-green-300"
            case "refunded":
                return "bg-red-100 text-red-800 border border-red-300"
            default:
                return "bg-gray-100 text-gray-800 border border-gray-300"
        }
    }

    return (
        <>
            <div className="rounded-md border mr-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mã đặt phòng</TableHead>
                            <TableHead>Khách hàng</TableHead>
                            <TableHead>Phòng</TableHead>
                            <TableHead>Check in</TableHead>
                            <TableHead>Check out</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Thanh toán</TableHead>
                            <TableHead>Tổng tiền</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBookings.map((booking) => (
                            <TableRow key={booking.booking_id} className="cursor-pointer hover:bg-gray-100" >
                                <TableCell className="font-medium">
                                    <Button variant="link" className="p-0 h-auto font-medium" onClick={() => navigateToBookingDetail(booking.booking_id)}>
                                        {booking.booking_id}
                                    </Button>
                                </TableCell>
                                <TableCell>{booking.guest_name}</TableCell>
                                <TableCell>{booking.room_number} - {booking.room_type}</TableCell>
                                <TableCell>{booking.check_in}</TableCell>
                                <TableCell>{booking.check_out}</TableCell>
                                <TableCell>
                                    <Badge className={getCustomBadgeClass(booking.status)}>
                                        {getBookingStatusText(booking.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={getPaymentStatusBadgeClass(booking.payment_status)}>
                                        {getPaymentStatusText(booking.payment_status)}
                                    </Badge>
                                </TableCell>
                                <TableCell>{booking.total_amount}</TableCell>
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
                                            <DropdownMenuItem onClick={() => navigateToBookingDetail(booking.booking_id)}>Xem chi tiết</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEdit(booking)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Chỉnh sửa
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Key className="mr-2 h-4 w-4" />
                                                Đổi trạng thái
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(booking.booking_id)}>
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
