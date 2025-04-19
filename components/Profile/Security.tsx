import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export function Security(){
    const { currentUser } = useAuth();
    const [ currentPassword , setCurrentPassword] = useState<string>("");
    const [ newPassword , setNewPassword] = useState<string>("");
    const [ confirmNewPassword , setConfirmNewPassword ] = useState<string>("")

    const handleUpdatePassword = () => {
        // Kiểm tra mật khẩu hiện tại
        if (!currentUser || currentPassword !== currentUser.password) {
          toast.error("Current password is incorrect.");
          return;
        }
        if (newPassword === currentPassword) {
            toast.error("New password cannot be the same as the current password.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error("New password and confirmation do not match.");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }
        toast.success("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    }
    return (
      <div className="mr-10 mt-4">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">CHANGE PASSWORD</CardTitle>
                <CardDescription>Update your password to keep your secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input type="password" id="old-password" placeholder="Enter your current password"></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input type="password" id="new-password" placeholder="Enter your new password"></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Confirm New Password</Label>
                    <Input type="password" id="cf-new-password" placeholder="Confirm your new password"></Input>
                </div>
                <Button size="sm" className="mt-5 bg-green-300 text-black">Update Password</Button>
            </CardContent>
        </Card>
      </div>
    );
}