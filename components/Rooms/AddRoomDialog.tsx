"use client"

import type React from "react"
import { useState } from "react"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface AddRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddRoomDialog({ open, onOpenChange }: AddRoomDialogProps) {
  const [formData, setFormData] = useState({
    number: "",
    type: "",
    floor: "",
    price: "",
    capacity: "",
    features: [] as string[],
  })
  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        features: [...formData.features, feature],
      })
    } else {
      setFormData({
        ...formData,
        features: formData.features.filter((f) => f !== feature),
      })
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding new room:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
            <DialogDescription>Enter the details for the new room. Press save when finished.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room-number">Room Number</Label>
                <Input id="room-number" placeholder="Example: 101" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-floor">Floor</Label>
                <Select value={formData.floor} onValueChange={(value) => setFormData({ ...formData, floor: value })} required >
                  <SelectTrigger id="room-floor">
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Floor 1</SelectItem>
                    <SelectItem value="2">Floor 2</SelectItem>
                    <SelectItem value="3">Floor 3</SelectItem>
                    <SelectItem value="4">Floor 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="room-type">Room Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })} required >
                <SelectTrigger id="room-type">
                  <SelectValue placeholder="Select type of room"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                  <SelectItem value="Presidential Suite">Presidential Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room-price">Price (VND/night)</Label>
                <Input id="room-price" placeholder="Example: 800,000" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-capacity">Capacity (people)</Label>
                <Input id="room-capacity" type="number" min="1" placeholder="Example: 2" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}required/>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tiện nghi</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-tv" checked={formData.features.includes("TV")} onCheckedChange={(checked) => handleFeatureChange("TV", checked as boolean)}/>
                  <label htmlFor="feature-tv" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">TV</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-ac" checked={formData.features.includes("AC")} onCheckedChange={(checked) => handleFeatureChange("AC", checked as boolean)}/>
                  <label htmlFor="feature-ac" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >Air conditioner</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox  id="feature-wifi"  checked={formData.features.includes("WiFi")} onCheckedChange={(checked) => handleFeatureChange("WiFi", checked as boolean)}/>
                  <label htmlFor="feature-wifi" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> WiFi</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox  id="feature-minibar" checked={formData.features.includes("Minibar")} onCheckedChange={(checked) => handleFeatureChange("Minibar", checked as boolean)}/>
                  <label htmlFor="feature-minibar" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Minibar</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-jacuzzi" checked={formData.features.includes("Jacuzzi")} onCheckedChange={(checked) => handleFeatureChange("Jacuzzi", checked as boolean)} />
                  <label htmlFor="feature-jacuzzi" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Jacuzzi</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-kitchen" checked={formData.features.includes("Kitchen")} onCheckedChange={(checked) => handleFeatureChange("Kitchen", checked as boolean)}/>
                  <label htmlFor="feature-kitchen" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Kitchen</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Room</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
