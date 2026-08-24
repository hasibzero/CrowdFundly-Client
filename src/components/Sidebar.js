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
    { name: 'Explore Campaigns', href: '/dashboard/campaigns', icon: Compass },
    { name: 'My Contributions', href: '/dashboard/contributions', icon: Heart },
    { name: 'Purchase Credit', href: '/dashboard/credits', icon: CreditCard },
    { name: 'Payment History', href: '/dashboard/history', icon: History },
  ];

  if (user?.role === 'creator' || user?.role === 'admin') {
    navItems.splice(2, 0, { name: 'My Campaigns', href: '/dashboard/campaigns', icon: Compass });
  }

  return (
    <nav className="bg-[#f8f9fc] border-r border-gray-200 h-screen w-64 fixed left-0 top-0 flex flex-col overflow-y-auto hidden md:flex z-50">
      
      {/* Top Logo Area */}
      <div className="pt-8 pb-8 px-6 flex items-center space-x-3 border-b border-gray-200/50">
        <div className="w-10 h-10 bg-[#0f766e] rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold tracking-wider text-sm shadow-sm">
          FF
        </div>
        <div>
          <h2 className="text-[#0f766e] font-extrabold text-lg leading-tight tracking-tight">
            FundForward
          </h2>
          <p className="text-gray-500 text-[11px] font-semibold tracking-wide">
            Supporter Dashboard
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`mx-3 px-4 py-3.5 flex items-center space-x-4 transition-colors relative rounded-r-xl ${
                isActive
                  ? 'bg-[#e2e8f0]/60 text-[#0f766e] font-bold'
                  : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 font-semibold'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#0f766e]' : 'text-gray-500'}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[13px]">{item.name}</span>
              
              {/* Active Indicator Border on the LEFT */}
              {isActive && (
                <div className="absolute left-[-12px] top-0 bottom-0 w-1 bg-[#0f766e] rounded-r-md"></div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="px-6 pb-6">
        <Link 
          href="/campaigns"
          className="w-full bg-[#0f766e] hover:bg-[#0d655e] text-white py-3.5 rounded-lg flex justify-center items-center text-[13px] font-bold shadow-md transition-colors"
        >
          <div className="w-4 h-4 mr-2 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
          </div>
          Discover Projects
        </Link>
      </div>

      {/* User Profile Footer */}
      <div className="border-t border-gray-200/80 p-6 flex items-center space-x-3 bg-white/30">
        <div className="w-10 h-10 rounded-full border border-gray-200 shadow-sm flex items-center justify-center bg-gray-50 flex-shrink-0">
          <img 
            src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.name || "U") + "&background=0f766e&color=fff"} 
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[13px] font-bold text-gray-900 truncate">
            {user?.name || 'Community Backer'}
          </span>
          <span className="text-[11px] font-medium text-gray-500">
            Level 3 Supporter
          </span>
        </div>
      </div>
    </nav>
  );
}
