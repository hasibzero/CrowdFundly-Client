"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Compass, Heart, CreditCard, History, Settings, LogOut } from 'lucide-react';
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
    <nav className="bg-surface-container dark:bg-surface-container-highest shadow-sm h-screen w-64 fixed left-0 top-0 flex flex-col p-4 space-y-2 overflow-y-auto hidden md:flex z-50">
      {/* Brand Header */}
      <div className="mb-10 px-2 py-4">
        <Link href="/">
          <span className="text-2xl font-black text-primary">Crowdfundly</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`rounded-lg px-4 py-3 flex items-center space-x-4 transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-primary-container text-white font-bold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col space-y-1">
        <Link
          href="/dashboard/settings"
          className="text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-3 flex items-center space-x-4 hover:text-primary transition-colors duration-200 cursor-pointer active:scale-95 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <button
          onClick={logout}
          className="w-full text-left text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-3 flex items-center space-x-4 hover:text-primary transition-colors duration-200 cursor-pointer active:scale-95 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
