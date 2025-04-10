"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { toast } from "sonner";

interface AuthProps {
  onLogin: (user: { email: string; role: number, name:string }) => void; // Prop để thông báo đăng nhập thành công
}
// Giả lập kiểm tra đăng nhập (thay bằng API thực tế)
const mockUsers = [
    { email: "admin@example.com", password: "1234567",name: "QuyBauTroi", role: 1 }, // Admin
    { email: "quy@gmail.com", password: "123", name: "LeTan", role: 2 }, // Lễ tân
    { email: "kythuat@gmail.com", password: "123", name: "KySu", role: 3 }, // Kỹ sư
];

export default function Auth({ onLogin }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      onLogin({email : user.email, role: user.role , name: user.name}); // Gọi callback khi đăng nhập thành công
      toast.success("Đăng nhập thành công")
    } else {
      setError("Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Nhập email" required />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Mật khẩu</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Nhập mật khẩu" required/>
          </div>
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full flex items-center justify-center gap-2">
            <LogIn size={20} />
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
}