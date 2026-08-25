"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Home, Compass, Heart, CreditCard, History, PlusCircle, Layers, Wallet, Settings, LogOut, LayoutGrid, Users, BarChart, ClipboardList, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const { logout, user } = useAuth();
  const pathname = usePathname();
  
  const isCreator = user?.role === 'Creator';
  const isAdmin = user?.role === 'Admin';
  const isSupporter = !isCreator && !isAdmin;

  const backerNavItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Explore Campaigns', href: '/dashboard/campaigns', icon: Compass },
    { name: 'My Contributions', href: '/dashboard/contributions', icon: Heart },
    { name: 'Add USD', href: '/dashboard/credits', icon: CreditCard },
    { name: 'Payment History', href: '/dashboard/history', icon: History },
  ];

  const creatorNavItems = [
    { name: 'Home', href: '/dashboard', icon: LayoutGrid },
    { name: 'Review Pending', href: '/dashboard/review-contributions', icon: ClipboardList },
    { name: 'Add New Campaign', href: '/dashboard/create', icon: PlusCircle },
    { name: 'My Campaigns', href: '/dashboard/my-campaigns', icon: Layers },
    { name: 'Withdrawals', href: '/dashboard/withdrawals', icon: Wallet },
    { name: 'Withdrawal Requests', href: '/dashboard/withdrawal-requests', icon: History },
  ];

  const adminNavItems = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutGrid },
    { name: 'Campaigns', href: '/dashboard/admin/campaigns', icon: ClipboardList },
    { name: 'Withdrawals', href: '/dashboard/admin/withdrawals', icon: Wallet },
    { name: 'Users', href: '/dashboard/admin/users', icon: Users },
    { name: 'Reports', href: '/dashboard/admin/reports', icon: BarChart },
  ];

  const navItems = isAdmin ? adminNavItems : (isCreator ? creatorNavItems : backerNavItems);

  return (
    <>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-900/50 z-40 backdrop-blur-sm transition-opacity" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}
      
      <nav className={`${isAdmin ? 'bg-white' : isCreator ? 'bg-[#eef2f6]' : 'bg-[#f8f9fc]'} border-r border-gray-200 h-screen w-64 fixed left-0 top-0 flex flex-col overflow-y-auto z-50 transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* Profile Header */}
        <div className="flex flex-col items-center pt-8 pb-6 mb-2 border-b border-gray-200/50">
          <div className="w-20 h-20 rounded-full p-1 bg-white mb-3 shadow-sm border border-gray-100">
            <img 
              src={user?.photoURL || user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User") + "&background=12643E&color=fff"} 
              alt={user?.name || "Profile"}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h2 className="text-[17px] font-bold text-gray-900 text-center leading-tight mb-1">
            {user?.name || 'Loading...'}
          </h2>
          <p className="text-[13px] text-gray-500 font-medium mb-3">
            {user?.email || ''}
          </p>
          <div className="text-[10px] uppercase tracking-widest font-bold text-[#12643E] bg-[#12643E]/10 px-3 py-1.5 rounded-full">
            {user?.role || 'Supporter'} Dashboard
          </div>
        </div>

        {/* Navigation Links */}
        <div className={`flex-1 flex flex-col ${isAdmin ? 'py-4' : 'px-3'}`}>
          {navItems.map((item) => {
            const isActive = (item.href === '/dashboard' || item.href === '/dashboard/admin') ? pathname === item.href : (pathname === item.href || pathname.startsWith(item.href + '/'));
            const Icon = item.icon;
            
            if (isAdmin) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
                  className={`px-6 py-3.5 flex items-center space-x-4 transition-colors relative ${
                    isActive
                      ? 'bg-[#f4f7fc] text-[#12643E] font-bold border-r-4 border-[#12643E]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#12643E]' : 'text-gray-500'}`} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[14px] tracking-wide">{item.name}</span>
                </Link>
              );
            }
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
                className={`px-4 py-3 mb-2 rounded-xl flex items-center space-x-4 transition-colors relative ${
                  isActive && isCreator 
                    ? 'bg-[#2ea673] text-gray-900 font-bold shadow-sm'
                    : isActive && isSupporter
                    ? 'bg-[#f4fbf8] text-[#0f766e] font-bold'
                    : 'text-gray-600 hover:bg-gray-200/60 hover:text-gray-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? (isCreator ? 'text-gray-900' : 'text-[#0f766e]') : 'text-gray-500'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[14px] tracking-wide">{item.name}</span>
                {isActive && isSupporter && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#0f766e] rounded-l-md"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className={`mt-auto pb-8 pt-4 ${isAdmin ? 'px-6' : 'px-3'}`}>
          {isAdmin ? (
            <div className="flex flex-col space-y-4">
              <Link href="/dashboard/admin/campaigns" className="w-full bg-[#12643E] hover:bg-[#0e4f31] text-white py-3 rounded-lg font-bold text-[13px] shadow-sm transition-colors flex justify-center items-center">
                Review Campaigns
              </Link>
              <div className="pt-2 flex flex-col">
                <Link 
                  href="/"
                  className="py-2 flex items-center space-x-4 transition-colors text-gray-600 hover:text-gray-900 font-medium"
                >
                  <Globe className="w-5 h-5 text-gray-400" strokeWidth={2} />
                  <span className="text-[14px] tracking-wide">Back to Website</span>
                </Link>
                <Link 
                  href="/dashboard/settings"
                  className="py-2 flex items-center space-x-4 transition-colors text-gray-600 hover:text-gray-900 font-medium"
                >
                  <Settings className="w-5 h-5 text-gray-400" strokeWidth={2} />
                  <span className="text-[14px] tracking-wide">Settings</span>
                </Link>
                <button 
                  onClick={logout}
                  className="w-full py-2 flex items-center space-x-4 transition-colors text-gray-600 hover:text-red-600 font-medium text-left"
                >
                  <LogOut className="w-5 h-5 text-gray-400" strokeWidth={2} />
                  <span className="text-[14px] tracking-wide">Logout</span>
                </button>
              </div>
            </div>
          ) : isCreator ? (
            <div className="border-t border-gray-200/60 pt-4 flex flex-col">
              <Link 
                href="/"
                className="px-4 py-3 mb-1 rounded-xl flex items-center space-x-4 transition-colors text-gray-600 hover:bg-gray-200/60 hover:text-gray-900 font-medium"
              >
                <Globe className="w-5 h-5 text-gray-500" strokeWidth={2} />
                <span className="text-[14px] tracking-wide">Back to Website</span>
              </Link>
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
            <div className="flex flex-col space-y-4">
              <Link 
                href="/dashboard/campaigns"
                className="w-full bg-[#12643E] hover:bg-[#0e4f31] text-white py-3.5 rounded-lg flex justify-center items-center text-sm font-bold shadow-md transition-colors"
              >
                Discover Projects
              </Link>
              <div className="border-t border-gray-200 pt-4 flex flex-col">
                <Link 
                  href="/"
                  className="px-4 py-3 mb-1 rounded-xl flex items-center space-x-4 transition-colors text-gray-600 hover:bg-gray-200/60 hover:text-gray-900 font-medium"
                >
                  <Globe className="w-5 h-5 text-gray-500" strokeWidth={2} />
                  <span className="text-[14px] tracking-wide">Back to Website</span>
                </Link>
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
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
