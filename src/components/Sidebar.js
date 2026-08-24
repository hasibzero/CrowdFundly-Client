"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Compass, Heart, CreditCard, History, Settings, LogOut, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Explore Campaigns', href: '/campaigns', icon: Compass },
    { name: 'My Contributions', href: '/dashboard/contributions', icon: Heart },
    { name: 'Purchase Credit', href: '/dashboard/credits', icon: CreditCard },
    { name: 'Payment History', href: '/dashboard/history', icon: History },
  ];

  if (user?.role === 'creator' || user?.role === 'admin') {
    navItems.splice(2, 0, { name: 'My Campaigns', href: '/dashboard/campaigns', icon: Compass });
  }

  return (
    <nav className="bg-white dark:bg-[#0f172a] border-r border-gray-100 dark:border-gray-800 shadow-[2px_0_24px_rgba(0,0,0,0.02)] h-screen w-72 fixed left-0 top-0 flex flex-col p-6 space-y-4 overflow-y-auto hidden md:flex z-50 transition-colors duration-300">
      {/* Brand Header */}
      <div className="mb-8 flex items-center px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg shadow-primary/20 mr-3">
          <span className="text-white font-black text-xl leading-none">C</span>
        </div>
        <Link href="/">
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 tracking-tight">Crowdfundly</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col space-y-1.5">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group rounded-xl px-3 py-3 flex items-center justify-between transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                isActive
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary font-bold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`} />
                <span className="text-[15px]">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-primary opacity-70" />}
            </Link>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col space-y-1.5">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">Account</p>
        <Link
          href="/dashboard/settings"
          className="group text-gray-600 hover:bg-gray-50 rounded-xl px-3 py-3 flex items-center space-x-3.5 hover:text-gray-900 transition-all duration-300 cursor-pointer active:scale-[0.98] dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white"
        >
          <Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
          <span className="text-[15px] font-medium">Settings</span>
        </Link>
        <button
          onClick={logout}
          className="group w-full text-left text-gray-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl px-3 py-3 flex items-center space-x-3.5 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 cursor-pointer active:scale-[0.98] dark:text-gray-400"
        >
          <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
          <span className="text-[15px] font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
