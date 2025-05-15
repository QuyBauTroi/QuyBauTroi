"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BedDouble, UserCircle, Settings, Calendar, LogOut, Wrench, Touchpad, LayoutDashboard, Users, Bell, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

// Define navigation items for each role
const getNavItems = (role: number) => {
  switch (role) {
    case 1:
      return [
        { icon: LayoutDashboard, label: "Tổng Quan", path: "/manager/dashboard" },
        { icon: Calendar, label: "Quản Lý Đặt Phòng", path: "/bookings" },
        { icon: BedDouble, label: "Quản Lý Phòng", path: "/rooms" },
        { icon: Touchpad, label: "Quản Lý Thiết Bị Phòng", path: "/receptionist/devices" },
        { icon: Wrench, label: "Quản Lý Thiết Bị", path: "/manager/devices" },
        { icon: Users, label: "Quản Lý Nhân Viên", path: "/manager/staffs" },
        { icon: Bell, label: "Cảnh Báo Hệ Thống", path: "/guests" },
        { icon: Settings, label: "Cài Đặt Hệ Thống", path: "/settings" },
      ];
    case 2:
      return [
        { icon: LayoutDashboard, label: "Tổng Quan", path: "/receptionist/dashboard" },
        { icon: Touchpad, label: "Điều Khiển Thiết Bị", path: "/receptionist/devices" },
        { icon: Calendar, label: "Quản Lý Đặt Phòng", path: "/bookings" },
        { icon: BedDouble, label: "Quản Lý Phòng", path: "/rooms" },
        { icon: Bell, label: "Cảnh Báo Hệ Thống", path: "/guests" },
      ];
    case 3:
      return [
        { icon: Wrench, label: "Quản Lý Thiết Bị", path: "/devices/technician" },
        { icon: Bell, label: "Cảnh Báo Hệ Thống", path: "/guests/technician" },
      ];
    default:
      return [];
  }
};

interface NavbarProps {
  onLogout: () => void;
  role: string;
}

export default function Navbar({ onLogout, role }: NavbarProps) {
  const pathname = usePathname();
  const navItems = getNavItems(Number(role));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {currentUser} = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Header for all screens */}
      <header className="h-16 border-b-2 bg-white fixed top-0 right-0 left-0 z-50 flex items-center px-4 sm:px-6 transition-all duration-300 shadow-md border-green-500">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu Button (visible on mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-green-600 hover:text-green-800 hover:bg-green-50"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link href={"/"}>
              <h1 className="text-lg sm:text-xl font-semibold text-green-700">Hotel Admin.</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-green-600 hover:text-green-800 hover:bg-green-50"
            >
              <Bell className="h-5 w-5" />
            </Button>
            {/* User Profile */}
            <Link
              href="/profile"
              className="text-green-600 rounded-xl flex items-center gap-2 p-2 transition duration-200"
            >
              <div className="flex items-center gap-2 border-l-2 border-green-200 pl-2 sm:pl-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100">
                  <UserCircle className="h-6 w-6 text-green-600" />
                </div>
                <span className="hidden sm:inline font-medium text-green-700">{currentUser?.name}</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar (visible on md and larger screens) */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-64 transition-all duration-300 z-40 shadow-md border-r-2 border-green-600 bg-white">
        {/* Navigation menu */}
        <nav className="p-5 mt-16">
          {navItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <Button
                variant={pathname === item.path ? "secondary" : "ghost"}
                className={`w-full justify-start mb-2 flex items-center text-sm font-medium text-green-600
                  ${pathname === item.path ? "bg-green-200 text-green-700 hover:bg-green-200" : "hover:bg-green-50 hover:text-green-700"}`}
              >
                <item.icon className={`h-8 w-8 ${pathname === item.path ? "text-green-700" : ""}`} />
                <span className="ml-2 transition-opacity duration-300">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 w-full px-4">
          <Button
            variant="ghost"
            className="w-full justify-center text-red-500 hover:text-red-600 hover:bg-red-50 border border-red-200"
            onClick={onLogout}
          >
            <LogOut className="h-8 w-8" />
            <span className="ml-2 transition-opacity duration-300">Logout</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu (visible when toggled on mobile) */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/0 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
          {/* Navbar */}
          <div className="md:hidden fixed inset-y-0 left-0 w-4/5 bg-white z-50 flex flex-col pt-16 transition-all duration-300 shadow-lg">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 text-green-600 hover:text-green-800 hover:bg-green-50"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <X className="h-10 w-10" />
            </Button>

            <nav className="flex-1 p-5 overflow-y-auto">
              {navItems.map((item, index) => (
                <Link href={item.path} key={index} onClick={toggleMobileMenu}>
                  <Button
                    variant={pathname === item.path ? "secondary" : "ghost"}
                    className={`w-full justify-start mb-2 flex items-center text-base font-medium text-green-600
                      ${pathname === item.path ? "bg-green-200 text-green-700 hover:bg-green-200" : "hover:bg-green-50 hover:text-green-700"}`}
                  >
                    <item.icon className={`h-10 w-10 ${pathname === item.path ? "text-green-700" : ""}`} />
                    <span className="ml-3 transition-opacity duration-300">{item.label}</span>
                  </Button>
                </Link>
              ))}
            </nav>
            <div className="p-5">
              <Button
                variant="ghost"
                className="w-full justify-center text-red-500 hover:text-red-600 hover:bg-red-50 border border-red-200 text-base"
                onClick={() => {
                  onLogout();
                  toggleMobileMenu();
                }}
              >
                <LogOut className="h-10 w-10" />
                <span className="ml-3 transition-opacity duration-300">Logout</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}