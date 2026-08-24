"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Home, Compass, Heart, CreditCard, History, PlusCircle, Layers, Wallet, Settings, LogOut, LayoutGrid, RefreshCw } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const { logout, user } = useAuth();
  const pathname = usePathname();
  
  // Temporary state to allow easy toggling during development
  const [testRole, setTestRole] = useState(user?.role?.toLowerCase() === 'creator' ? 'creator' : 'supporter');
  
  const isCreator = testRole === 'creator' || user?.role === 'admin';

  const backerNavItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Explore Campaigns', href: '/dashboard/campaigns', icon: Compass },
    { name: 'My Contributions', href: '/dashboard/contributions', icon: Heart },
    { name: 'Purchase Credit', href: '/dashboard/credits', icon: CreditCard },
    { name: 'Payment History', href: '/dashboard/history', icon: History },
  ];

  const creatorNavItems = [
    { name: 'Home', href: '/dashboard', icon: LayoutGrid },
    { name: 'Add New Campaign', href: '/dashboard/create', icon: PlusCircle },
    { name: 'My Campaigns', href: '/dashboard/my-campaigns', icon: Layers },
    { name: 'Withdrawals', href: '/dashboard/withdrawals', icon: Wallet },
    { name: 'Payment History', href: '/dashboard/history', icon: History },
  ];

  const navItems = isCreator ? creatorNavItems : backerNavItems;

  return (
    <>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-900/50 z-40 backdrop-blur-sm transition-opacity" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}
      
      <nav className={`bg-[#eef2f6] border-r border-gray-200 h-screen w-64 fixed left-0 top-0 flex flex-col overflow-y-auto z-50 transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* Profile Header (Keep consistent unless asked otherwise) */}
        <div className="flex flex-col items-center pt-10 pb-6 mb-2">
          {!isCreator && (
            <div className="w-20 h-20 rounded-full p-1 bg-[#f4fbf8] mb-4 flex items-center justify-center">
              <img 
                src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.name || "U") + "&background=0f766e&color=fff"} 
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
          )}
          {isCreator ? (
            <div className="w-full px-8 text-left mb-2">
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                Creator Panel
              </h2>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-[#0f766e] capitalize text-center leading-tight">
                {user?.role || 'Supporter'}<br/>Dashboard
              </h2>
              <p className="text-xs text-gray-500 mt-2 font-medium">Community Backer</p>
            </>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
                className={`px-4 py-3 mb-2 rounded-xl flex items-center space-x-4 transition-colors ${
                  isActive
                    ? 'bg-[#2ea673] text-gray-900 font-bold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200/60 hover:text-gray-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[14px] tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto px-3 pb-8 pt-4">
          {isCreator ? (
            <div className="border-t border-gray-200/60 pt-4 flex flex-col">
              <Link 
                href="/dashboard/settings"
                className="px-4 py-3 mb-1 rounded-xl flex items-center space-x-4 transition-colors text-gray-600 hover:bg-gray-200/60 hover:text-gray-900 font-medium"
              >
                <Settings className="w-5 h-5 text-gray-500" strokeWidth={2} />
                <span className="text-[14px] tracking-wide">Settings</span>
              </Link>
              <button 
                onClick={logout}
                className="w-full px-4 py-3 rounded-xl flex items-center space-x-4 transition-colors text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium text-left"
              >
                <LogOut className="w-5 h-5 text-gray-500" strokeWidth={2} />
                <span className="text-[14px] tracking-wide">Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              href="/dashboard/campaigns"
              className="w-full bg-[#12643E] hover:bg-[#0e4f31] text-white py-3.5 rounded-lg flex justify-center items-center text-sm font-bold shadow-md transition-colors"
            >
              Discover Projects
            </Link>
          )}
          {/* View Toggle for Development */}
          <div className="pt-6">
            <button
              onClick={() => setTestRole(prev => prev === 'creator' ? 'supporter' : 'creator')}
              className="w-full text-xs font-bold text-gray-400 hover:text-[#0f766e] flex items-center justify-center transition-colors"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Switch to {isCreator ? 'Supporter' : 'Creator'} View
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
