"use client";
import { useAuth } from '@/context/AuthContext';
import { Bell, Coins, Menu } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-40 w-full px-6 lg:px-10 py-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      {/* Mobile Menu & Brand */}
      <div className="flex items-center space-x-4 md:hidden">
        <button className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/">
          <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 tracking-tight">Crowdfundly</span>
        </Link>
      </div>

      {/* Header Right Section */}
      <div className="flex items-center space-x-5 lg:space-x-8 ml-auto">
        {/* Available Credits */}
        <div className="hidden sm:flex items-center bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-2.5">
            <Coins className="text-yellow-600 dark:text-yellow-500 w-4 h-4" />
          </div>
          <span className="text-[14px] font-bold text-gray-800 dark:text-gray-200">{user?.credits || 0} <span className="text-gray-400 dark:text-gray-500 font-normal ml-0.5">Credits</span></span>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-gray-500 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/10">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0f172a]"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3.5 pl-5 lg:pl-8 border-l border-gray-100 dark:border-gray-800 cursor-pointer group">
          <div className="flex flex-col text-right hidden sm:block">
            <span className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors">{user?.name || user?.email?.split('@')[0]}</span>
            <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'Supporter'}</span>
          </div>
          <div className="relative">
            <img 
              alt={user?.name || "User"} 
              className="w-10 h-10 rounded-xl object-cover border border-gray-200 dark:border-gray-700 group-hover:border-primary transition-colors shadow-sm" 
              src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.name || user?.email || "U") + "&background=10B981&color=fff&bold=true"} 
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#0f172a] rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
