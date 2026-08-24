"use client";
import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-white dark:bg-[#0f172a] shadow-sm sticky top-0 z-40 w-full px-10 h-20 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
      
      <div className="flex items-center">
        {/* Brand */}
        <Link href="/">
          <span className="text-2xl font-bold text-[#0f766e] dark:text-emerald-400 tracking-tight">Crowdfundly</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center ml-12 text-gray-400">
          <Search className="w-5 h-5 mr-3" />
          <input 
            type="text" 
            placeholder="Search campaigns..."
            className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 font-medium w-64"
          />
        </div>
      </div>

      {/* Header Right Section - Navigation Links */}
      <div className="flex items-center h-full">
        <Link 
          href="/dashboard"
          className="h-full flex items-center px-6 text-[15px] font-bold text-gray-800 dark:text-white border-b-2 border-[#0f766e] dark:border-emerald-400"
        >
          Dashboard
        </Link>
        <Link 
          href="/dashboard/impact"
          className="h-full flex items-center px-6 text-[15px] font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white border-b-2 border-transparent transition-colors"
        >
          Impact
        </Link>
      </div>
    </header>
  );
}
