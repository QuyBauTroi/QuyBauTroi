"use client";
import { TabsContent } from "@/components/ui/tabs";
import { Card , CardContent, CardDescription, CardHeader ,CardTitle} from "../ui/card";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useRef } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function PersonalInformation() {
  const { currentUser } = useAuth();
  const [ avatarSrc, setAvaterSrc] = useState("/placeholder.svg");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvaUpLoad = (event:React.ChangeEvent<HTMLInputElement> ) => {
    const file = event.target.files?.[0]
    if (file) {
      if(file.size > 5 * 1024 * 1024) {
        toast.error("Lỗi, không thể upload ảnh. Ảnh không được lớn hơn 5MB");
        return;
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvaterSrc(e.target?.result as string)
        toast.success("Upload ảnh thành công")
      }
      reader.onerror = () =>{
        toast.error("Lỗi, không thể upload ảnh")
      }
      reader.readAsDataURL(file)
    }
  };
  const removeAvatar = () => {
    setAvaterSrc("/placeholder.svg")
    toast.success("Xóa ảnh thành công")
  }
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }
  const roleMap: { [key: number]: string } = {
    1: "Admin",
    2: "Lễ tân",
    3: "Kỹ sư"
  };
  return (
    <div className="mt-4 grid gap-5  lg:grid-cols-6 mr-7 ">
      <Card className="lg:col-span-2 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">PROFILE PICTURE</CardTitle>
          <CardDescription>Update your profile photo</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 ">
          <Avatar className="w-72 h-72">
            <AvatarImage src={avatarSrc} alt=""></AvatarImage>
            <AvatarFallback className="text-2xl">js</AvatarFallback>
          </Avatar>
          <input  type="file" ref={fileInputRef} onChange={handleAvaUpLoad} className="hidden" accept="image/*" />
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={triggerFileInput}>Upload</Button>
            <Button size="sm" variant="outline" className="text-red-500 " onClick={removeAvatar}>Remove</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">PERSONAL INFORMATION</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid  md:grid-cols-1 lg:grid-cols-2 gap-7">
            <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue={currentUser?.name} /> 
            </div>
            <div className="space-y-2">
            <Label htmlFor="firstName">Last Name</Label>
            <Input id="lastName" defaultValue={currentUser?.name} /> 
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailAddress">Email Address</Label>
            <Input id="email" defaultValue={currentUser?.email} /> 
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input type="number" id="phone" defaultValue={currentUser?.email} /> 
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input id="position" value={currentUser?.role !== undefined ? roleMap[currentUser.role] : "Không xác định"} readOnly /> 
          </div>
          <Button size="sm" className="mt-5 float-right">Save Chances</Button>
        </CardContent>
      </Card>
    </div>
  );
}