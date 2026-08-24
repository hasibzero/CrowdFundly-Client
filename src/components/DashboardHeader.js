"use client";
import { useAuth } from '@/context/AuthContext';
import { Bell, Coins } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-40 w-full px-10 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
      {/* Mobile Brand (Hidden on Desktop where SideNav handles it) */}
      <div className="md:hidden">
        <Link href="/">
          <span className="text-2xl font-extrabold text-primary">Crowdfundly</span>
        </Link>
      </div>

      {/* Header Right Section */}
      <div className="flex items-center space-x-6 ml-auto">
        {/* Available Credits */}
        <div className="hidden sm:flex items-center bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
          <Coins className="text-yellow-500 mr-2 w-5 h-5" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">{user?.credits || 0} Credits</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-primary transition-colors duration-200">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-4 border-l border-gray-200 dark:border-gray-700 pl-6">
          <div className="flex flex-col text-right hidden sm:block">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user?.name || user?.email?.split('@')[0]}</span>
            <span className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</span>
          </div>
          <img 
            alt={user?.name || "User"} 
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" 
            src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.name || user?.email || "U")} 
          />
        </div>
      </div>
    </header>
  );
}
