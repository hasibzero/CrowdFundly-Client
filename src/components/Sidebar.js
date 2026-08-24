"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Home, Compass, Heart, CreditCard, History } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Explore Campaigns', href: '/campaigns', icon: Compass },
    { name: 'My Contributions', href: '/dashboard/contributions', icon: Heart },
    { name: 'Purchase Credit', href: '/dashboard/credits', icon: CreditCard },
    { name: 'Payment History', href: '/dashboard/history', icon: History },
  ];

  if (user?.role === 'creator' || user?.role === 'admin') {
    navItems.splice(2, 0, { name: 'My Campaigns', href: '/dashboard/campaigns', icon: Compass });
  }

  return (
    <nav className="bg-[#f8f9fc] dark:bg-[#0f172a] border-r border-gray-200 dark:border-gray-800 h-screen w-64 fixed left-0 top-0 flex flex-col overflow-y-auto hidden md:flex z-50">
      
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-10 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="w-20 h-20 rounded-full p-1 bg-emerald-100 dark:bg-emerald-900/30 mb-4 flex items-center justify-center">
          <img 
            src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.name || "U") + "&background=0f766e&color=fff"} 
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
          />
        </div>
        <h2 className="text-xl font-bold text-[#0f766e] dark:text-emerald-400 capitalize text-center leading-tight">
          {user?.role || 'Supporter'}<br/>Dashboard
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">Community Backer</p>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col py-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-6 py-3.5 flex items-center space-x-4 transition-colors relative ${
                isActive
                  ? 'bg-emerald-50/50 dark:bg-emerald-900/10 text-[#0f766e] dark:text-emerald-400 font-bold'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#0f766e] dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[14px]">{item.name}</span>
              
              {/* Active Indicator Border */}
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#0f766e] dark:bg-emerald-400 rounded-l-md"></div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="p-6 mt-auto">
        <Link 
          href="/campaigns"
          className="w-full bg-[#0f766e] hover:bg-[#0d655e] text-white py-3.5 rounded-lg flex justify-center items-center text-sm font-bold shadow-md transition-colors"
        >
          Discover Projects
        </Link>
      </div>
    </nav>
  );
}
