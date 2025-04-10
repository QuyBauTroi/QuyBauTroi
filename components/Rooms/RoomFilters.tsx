"use client"
import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose,} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function RoomFilters() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mr-5">
        <div className="flex flex-1 items-center space-x-2">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search for room..." className="pl-8" value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
            <Sheet>
                <SheetTrigger>
                    <Button variant="outline" size="icon">
                    <Filter className = "w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Filter</SheetTitle>
                        <SheetDescription>Filter room list by criteria</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4 ml-5">
                        <div className="space-y-2">
                            <Label htmlFor="room-type">Type of room</Label>
                            <Select>
                                <SelectTrigger id="room-type">
                                    <SelectValue placeholder="All Rooms" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All type of room</SelectItem>
                                    <SelectItem value="standard">Standard</SelectItem>
                                    <SelectItem value="deluxe">Deluxe</SelectItem>
                                    <SelectItem value="suite">Suite</SelectItem>
                                    <SelectItem value="presidential">Presidential Suite</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="floor">Floor</Label>
                            <Select>
                                <SelectTrigger id="floor">
                                    <SelectValue placeholder="All Floors" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Floors</SelectItem>
                                    <SelectItem value="1">Floor 1</SelectItem>
                                    <SelectItem value="2">Floor 2</SelectItem>
                                    <SelectItem value="3">Floor 3</SelectItem>
                                    <SelectItem value="4">Floor 4</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="occupied">In Use</SelectItem>
                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                    <SelectItem value="cleaning">Cleaning</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Amenities</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="wifi" />
                                    <label htmlFor="wifi" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">WiFi</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="ac" />
                                    <label htmlFor="ac" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Air Conditioner</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="minibar" />
                                    <label htmlFor="minibar" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Minibar</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="jacuzzi" />
                                    <label htmlFor="jacuzzi" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Jacuzzi</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button className="w-full">Apply Filter</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
        <div className="flex items-center gap-2">
            <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Vailable</SelectItem>
                    <SelectItem value="occupied">Cccupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Loại phòng" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Rooms</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="presidential">Presidential Suite</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
  );
}
