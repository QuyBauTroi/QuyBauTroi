"use client"
import { useState } from "react"
import { Search, Filter, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose,} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export function BookingFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4 mr-5">
        <div className="flex flex-1 items-center space-x-2">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Tìm kiếm đặt phòng, khách hàng..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                    <Filter className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Bộ lọc</SheetTitle>
                        <SheetDescription>Lọc danh sách đặt phòng theo các tiêu chí</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4 ml-5 mr-5">
                    <div className="space-y-2">
                        <Label htmlFor="booking-status">Trạng thái đặt phòng</Label>
                        <Select>
                        <SelectTrigger id="booking-status">
                            <SelectValue placeholder="Tất cả trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả trạng thái</SelectItem>
                            <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                            <SelectItem value="pending">Đang xử lý</SelectItem>
                            <SelectItem value="cancelled">Đã hủy</SelectItem>
                            <SelectItem value="completed">Đã hoàn thành</SelectItem>
                            <SelectItem value="no-show">Không đến</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="payment-status">Trạng thái thanh toán</Label>
                        <Select>
                        <SelectTrigger id="payment-status">
                            <SelectValue placeholder="Tất cả trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả trạng thái</SelectItem>
                            <SelectItem value="paid">Đã thanh toán</SelectItem>
                            <SelectItem value="pending">Chưa thanh toán</SelectItem>
                            <SelectItem value="partial">Thanh toán một phần</SelectItem>
                            <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="room-type">Loại phòng</Label>
                        <Select>
                        <SelectTrigger id="room-type">
                            <SelectValue placeholder="Tất cả loại phòng" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả loại phòng</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="deluxe">Deluxe</SelectItem>
                            <SelectItem value="suite">Suite</SelectItem>
                            <SelectItem value="presidential">Presidential Suite</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="booking-source">Nguồn đặt phòng</Label>
                        <Select>
                        <SelectTrigger id="booking-source">
                            <SelectValue placeholder="Tất cả nguồn" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả nguồn</SelectItem>
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
                        <Label>Khoảng thời gian</Label>
                        <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <Label htmlFor="date-from">Từ ngày</Label>
                            <Input id="date-from" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date-to">Đến ngày</Label>
                            <Input id="date-to" type="date" />
                        </div>
                        </div>
                    </div>
                    </div>
                    <SheetFooter>
                    <SheetClose asChild>
                        <Button className="w-full">Áp dụng bộ lọc</Button>
                    </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <Calendar className="mr-2 h-4 w-4" />
              {checkInDate ? format(checkInDate, "dd/MM/yyyy") : "Ngày check-in"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus locale={vi}/>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <Calendar className="mr-2 h-4 w-4" />
              {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "Ngày check-out"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus locale={vi} disabled={(date) => (checkInDate ? date < checkInDate : false)}/>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
