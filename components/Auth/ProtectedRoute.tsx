"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Auth from "@/components/Auth/Login";

type Props = {
  children: React.ReactNode;
  allowedRoles: number[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const router = useRouter();
  const { currentUser, login } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setChecking(false); // Đã xác nhận là chưa login
    } else if (!allowedRoles.includes(currentUser.role)) {
      router.push("/unauthorized");
    } else {
      setChecking(false); // Đã login và có quyền
    }
  }, [allowedRoles, currentUser, router]);

  // Nếu đang kiểm tra thì không render gì cả (hoặc show spinner)
  if (checking) return null;

  // Nếu chưa login, render form đăng nhập
  if (!currentUser) {
    return (
      <Auth
        onLogin={({ email, role, name }) =>
          login({ email, role, name, password: "" })
        }
      />
    );
  }

  return <>{children}</>;
}
