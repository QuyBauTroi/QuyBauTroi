"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthProps {
  onLogin: (user: { email: string; role: number, name:string }) => void; // Prop để thông báo đăng nhập thành công
}

const mockUsers = [
    { email: "admin@example.com", password: "1234567",name: "QuyBauTroi", role: 1 }, // Admin
    { email: "quy@gmail.com", password: "123", name: "LeTan", role: 2 }, // Lễ tân
    { email: "kythuat@gmail.com", password: "123", name: "KySu", role: 3 }, // Kỹ sư
];

export default function Auth({ onLogin }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
        onLogin({ email: user.email, role: user.role, name: user.name });
        setTimeout(() => {
          let redirectPath = "";
          switch (user.role) {
            case 1:
              redirectPath = "/manager/dashboard";
              break;
            case 2:
              redirectPath = "/receptionist/dashboard";
              break;
            case 3:
              redirectPath = "/technician/dashboard";
              break;
            default:
              redirectPath = "/";
          }
        
          router.push(redirectPath);
          toast.success("Đăng nhập thành công");
        }, 100); // chờ React cập nhật context
    } else {
      setError("Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm sm:text-base font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
            placeholder="Nhập email"
            required
          />
        </div>
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm sm:text-base font-medium mb-2">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        {error && <div className="mb-4 text-red-500 text-xs sm:text-sm">{error}</div>}
        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2 p-2 sm:p-3 text-sm sm:text-base"
        >
          <LogIn size={16} className="sm:w-5 sm:h-5" />
          Đăng nhập
        </Button>
      </form>
  </div>
</div>
  );
}