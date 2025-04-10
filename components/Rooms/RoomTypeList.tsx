"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog,DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { roomTypeData, type RoomType } from "../../data/data"

export function RoomTypesList() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null)

  const handleEdit = (roomType: RoomType) => {
    setSelectedRoomType(roomType)
    setIsEditDialogOpen(true)
  }
  const getAmenitiesArray = (amenitiesStr: string): string[] => {
    const amenityIds = amenitiesStr.split(",")
    const amenityMap: Record<string, string> = {
      "1": "WiFi", "2": "TV", "3": "Điều hòa", "4": "Minibar",
      "5": "Két an toàn", "6": "Bồn tắm","7": "Jacuzzi",
      "8": "Phòng khách","9": "Bếp","10": "Hồ bơi riêng", "11": "Dịch vụ quản gia",
    }
    return amenityIds.map((id) => amenityMap[id] || `Tiện nghi ${id}`)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4 mr-5 ">
        <h2 className="text-lg font-medium">Loại phòng</h2>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-400 hover:bg-gray-400">
          <PlusCircle className="h-4 w-4" />
          Thêm loại phòng
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mr-5">
        {roomTypeData.map((type) => (
          <Card key={type.room_type_id}>
            <CardHeader>
              <CardTitle>{type.room_type_name}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Giá cơ bản:</span>
                  <span className="font-medium">{type.price_per_night} VND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sức chứa:</span>
                  <span className="font-medium">
                    {type.max_adults + type.max_children} người ({type.max_adults} người lớn, {type.max_children} trẻ
                    em)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Số lượng phòng:</span>
                  <span className="font-medium">{type.room_count}</span>
                </div>
                <div className="pt-2">
                  <span className="text-sm text-muted-foreground">Tiện nghi:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {getAmenitiesArray(type.amenities).map((amenity, index) => (
                      <span key={index} className="text-xs bg-secondary px-2 py-1 rounded-md">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleEdit(type)}>
                <Edit className="mr-2 h-4 w-4" />
                Sửa
              </Button>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add Room Type Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm loại phòng mới</DialogTitle>
            <DialogDescription>Tạo loại phòng mới cho khách sạn của bạn.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên loại phòng</Label>
              <Input id="name" placeholder="Ví dụ: Deluxe" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Giá cơ bản (VND)</Label>
                <Input id="price" placeholder="Ví dụ: 1,200,000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_adults">Số người lớn tối đa</Label>
                <Input id="max_adults" type="number" min="1" placeholder="Ví dụ: 2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max_children">Số trẻ em tối đa</Label>
                <Input id="max_children" type="number" min="0" placeholder="Ví dụ: 1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room_count">Số lượng phòng</Label>
                <Input id="room_count" type="number" min="1" placeholder="Ví dụ: 10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea id="description" placeholder="Mô tả về loại phòng" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenities">Tiện nghi</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="amenity-1" value="1" className="rounded border-gray-300" />
                  <label htmlFor="amenity-1">WiFi</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="amenity-2" value="2" className="rounded border-gray-300" />
                  <label htmlFor="amenity-2">TV</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="amenity-3" value="3" className="rounded border-gray-300" />
                  <label htmlFor="amenity-3">Điều hòa</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="amenity-4" value="4" className="rounded border-gray-300" />
                  <label htmlFor="amenity-4">Minibar</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="amenity-6" value="6" className="rounded border-gray-300" />
                  <label htmlFor="amenity-6">Bồn tắm</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="amenity-7" value="7" className="rounded border-gray-300" />
                  <label htmlFor="amenity-7">Jacuzzi</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Lưu loại phòng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedRoomType && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa loại phòng</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin cho loại phòng {selectedRoomType.room_type_name}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Tên loại phòng</Label>
                <Input id="edit-name" defaultValue={selectedRoomType.room_type_name} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Giá cơ bản (VND)</Label>
                  <Input id="edit-price" defaultValue={selectedRoomType.price_per_night} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-max-adults">Số người lớn tối đa</Label>
                  <Input id="edit-max-adults" type="number" min="1" defaultValue={selectedRoomType.max_adults} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-max-children">Số trẻ em tối đa</Label>
                  <Input id="edit-max-children" type="number" min="0" defaultValue={selectedRoomType.max_children} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-room-count">Số lượng phòng</Label>
                  <Input id="edit-room-count" type="number" min="1" defaultValue={selectedRoomType.room_count} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Mô tả</Label>
                <Textarea id="edit-description" defaultValue={selectedRoomType.description} />
              </div>
              <div className="space-y-2">
                <Label>Tiện nghi</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {/* In a real app, you would pre-check the checkboxes based on the amenities */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-amenity-1"
                      value="1"
                      className="rounded border-gray-300"
                      defaultChecked={selectedRoomType.amenities.includes("1")}
                    />
                    <label htmlFor="edit-amenity-1">WiFi</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-amenity-2"
                      value="2"
                      className="rounded border-gray-300"
                      defaultChecked={selectedRoomType.amenities.includes("2")}
                    />
                    <label htmlFor="edit-amenity-2">TV</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-amenity-3"
                      value="3"
                      className="rounded border-gray-300"
                      defaultChecked={selectedRoomType.amenities.includes("3")}
                    />
                    <label htmlFor="edit-amenity-3">Điều hòa</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-amenity-4"
                      value="4"
                      className="rounded border-gray-300"
                      defaultChecked={selectedRoomType.amenities.includes("4")}
                    />
                    <label htmlFor="edit-amenity-4">Minibar</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-amenity-6"
                      value="6"
                      className="rounded border-gray-300"
                      defaultChecked={selectedRoomType.amenities.includes("6")}
                    />
                    <label htmlFor="edit-amenity-6">Bồn tắm</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-amenity-7"
                      value="7"
                      className="rounded border-gray-300"
                      defaultChecked={selectedRoomType.amenities.includes("7")}
                    />
                    <label htmlFor="edit-amenity-7">Jacuzzi</label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
