"use client";

import { Button } from "@/components/ui/button";
import { Home, BedDouble, UserCircle, Settings, Calendar, LogOut, ChevronLeft, ChevronRight, TableProperties, Hotel ,LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "Bookings", path: "/bookings" },
  { icon: TableProperties, label: "Properties", path: "/properties" },
  { icon: BedDouble, label: "Rooms", path: "/rooms" },
  { icon: UserCircle, label: "Guests", path: "/guests" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void; // Đảm bảo prop này được sử dụng
}

export default function Navbar({ sidebarOpen, setSidebarOpen, onLogout }: NavbarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed top-0 left-0 h-full transition-all duration-300 z-70 shadow-md border-r-2 border-blue-300 bg-sky-50 
        ${sidebarOpen ? "w-64" : "w-28"
      }`}
    >
      <div className="h-15 p-6 flex items-center justify-between border-b-2 border-blue-300">
        <div className="flex items-center space-x-2">
          <Hotel className="text-blue-700 h-8 w-8 ml-2" />
          <Link href="/">
            <span
              className={`font-bold text-xl text-blue-700 transition-opacity duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              Hotel Admin
            </span>
          </Link>
        </div>
      </div>

      <nav className="p-5">
        {navItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <Button
              variant={pathname === item.path ? "secondary" : "ghost"}
              className={`w-full justify-start mb-2 flex items-center text-sm font-medium text-blue-600 ${
                pathname === item.path
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : "hover:bg-blue-50 hover:text-blue-700"
              } ${sidebarOpen ? "px-4" : "px-4"}`}
            >
              <item.icon className={`h-5 w-5 ${pathname === item.path ? "text-blue-700" : ""}`} />
              <span
                className={`ml-2 transition-opacity duration-300 ${
                  sidebarOpen ? "opacity-100" : "opacity-0 w-0"
                }`}
              >
                {item.label}
              </span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 w-full px-4">
        <Button
          variant="ghost"
          className={`w-full justify-center text-red-500 hover:text-red-600 hover:bg-red-50 border border-red-200 ${
            sidebarOpen ? "px-4" : "px-2"
          }`}
          onClick={onLogout} // Gọi hàm logout
        >
          <LogOut className="h-5 w-5" />
          <span
            className={`ml-2 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            Logout
          </span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full bg-green-500 hover:bg-green-600 text-white mt-4"
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
    </div>
  );
}