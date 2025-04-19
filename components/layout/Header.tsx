"use client";

import { Button } from "@/components/ui/button";
import { Bell, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

// Define props type for Header component


export default function Header() {
  const {currentUser} = useAuth();
  const pathname = usePathname(); // Get the current pathname from the router

  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/bookings':
        return 'Bookings';
      case '/rooms':
        return 'Rooms';
      case '/guests':
        return 'Guests';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className=" h-15 border-b-2 bg-card fixed top-0 right-0 left-0 z-50 flex items-center px-6 transition-all duration-300 shadow-md border-green-500">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-semibold text-green-700">{getPageTitle()}</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-800 hover:bg-green-50">
            <Bell className="h-5 w-5" />
          </Button>
          {/* User profile */}
          <Link href="/profile" className=" text-green-600 rounded-xl flex items-center gap-2 p-2 transition duration-200">
            <div className="flex items-center gap-2 border-l-2 border-green-200 pl-4 ">
              <div className="w-8 h-8 rounded-full  flex items-center justify-center bg-green-100 ">
                <UserCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-medium text-green-700">{currentUser?.name}</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}