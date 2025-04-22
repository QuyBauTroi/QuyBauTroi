"use client"
import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { guestData, roomData, getRoomTypeById } from "@/lib/data/data"

interface AddBookingDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AddBookingDialog({ open, onOpenChange }: AddBookingDialogProps) {
    const availableRooms = roomData.filter((room) => room.status_id === 1)
    const [formData, setFormData] = useState({
        guest_id: "",
        room_id: "",
        check_in_date: undefined as Date | undefined,
        check_out_date: undefined as Date | undefined,
        adults: "2",
        children: "0",
        special_requests: "",
        payment_status: "pending",
        source: "website",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Adding new booking:", formData)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Thêm đặt phòng mới</DialogTitle>
                        <DialogDescription>Nhập thông tin chi tiết cho đặt phòng mới. Nhấn lưu khi hoàn tất.</DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="booking-info" className="mt-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="booking-info">Thông tin đặt phòng</TabsTrigger>
                            <TabsTrigger value="guest-info">Thông tin khách hàng</TabsTrigger>
                        </TabsList>
                        <TabsContent value="booking-info" className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="room">Phòng</Label>
                                <Select value={formData.room_id} onValueChange={(value) => setFormData({ ...formData, room_id: value })} required>
                                    <SelectTrigger id="room" className="w-full">
                                        <SelectValue placeholder="Chọn phòng" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        {availableRooms.map((room) => {
                                            const roomType = getRoomTypeById(room.room_type_id)
                                            return (
                                                <SelectItem key={room.room_id} value={room.room_id.toString()}>
                                                    {room.room_number} - {roomType?.room_type_name} ({roomType?.price_per_night} VND/đêm)
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="check-in">Ngày check-in</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button id="check-in" variant="outline" className={cn("w-full justify-start text-left font-normal", !formData.check_in_date && "text-muted-foreground",)}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.check_in_date ? format(formData.check_in_date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={formData.check_in_date} onSelect={(date) => setFormData({ ...formData, check_in_date: date })} initialFocus locale={vi} disabled={(date) => date < new Date()} />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="check-out">Ngày check-out</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button id="check-out" variant="outline" className={cn("w-full justify-start text-left font-normal", !formData.check_out_date && "text-muted-foreground",)}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.check_out_date ? (
                                                    format(formData.check_out_date, "dd/MM/yyyy")
                                                ) : (
                                                    <span>Chọn ngày</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={formData.check_out_date} onSelect={(date) => setFormData({ ...formData, check_out_date: date })} initialFocus locale={vi} disabled={(date) => date < new Date() || (formData.check_in_date ? date <= formData.check_in_date : false)} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="adults">Số người lớn</Label>
                                    <Input id="adults" type="number" min="1" value={formData.adults} onChange={(e) => setFormData({ ...formData, adults: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="children">Số trẻ em</Label>
                                    <Input id="children" type="number" min="0" value={formData.children} onChange={(e) => setFormData({ ...formData, children: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="payment-status">Trạng thái thanh toán</Label>
                                <Select value={formData.payment_status} onValueChange={(value) => setFormData({ ...formData, payment_status: value })} required>
                                    <SelectTrigger id="payment-status" className="w-full">
                                        <SelectValue placeholder="Chọn trạng thái thanh toán" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="paid">Đã thanh toán</SelectItem>
                                        <SelectItem value="pending">Chưa thanh toán</SelectItem>
                                        <SelectItem value="partial">Thanh toán một phần</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="source">Nguồn đặt phòng</Label>
                                <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })} required>
                                    <SelectTrigger id="source" className="w-full">
                                        <SelectValue placeholder="Chọn nguồn đặt phòng" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="website">Website</SelectItem>
                                        <SelectItem value="direct">Trực tiếp</SelectItem>
                                        <SelectItem value="booking">Booking.com</SelectItem>
                                        <SelectItem value="agoda">Agoda</SelectItem>
                                        <SelectItem value="expedia">Expedia</SelectItem>
                                        <SelectItem value="traveloka">Traveloka</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="special-requests">Yêu cầu đặc biệt</Label>
                                <Textarea id="special-requests" placeholder="Nhập yêu cầu đặc biệt của khách hàng" value={formData.special_requests} onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })} />
                            </div>
                        </TabsContent>
                        <TabsContent value="guest-info" className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="guest">Khách hàng</Label>
                                <Select value={formData.guest_id} onValueChange={(value) => setFormData({ ...formData, guest_id: value })} required>
                                    <SelectTrigger id="guest" className="w-full">
                                        <SelectValue placeholder="Chọn khách hàng" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {guestData.map((guest) => (
                                            <SelectItem key={guest.guest_id} value={guest.guest_id.toString()}>
                                                {guest.name} - {guest.phone}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">hoặc thêm khách hàng mới</span>
                                <Button type="button" variant="outline" size="sm">Thêm khách hàng mới</Button>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <DialogFooter className="mt-6">
                        <Button type="submit">Lưu đặt phòng</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
