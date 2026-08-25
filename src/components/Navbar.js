"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { UserCircle, LogOut, Rocket, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-12 h-16 bg-white border-b border-gray-100 transition-all duration-300">
        {/* Left side: Brand */}
        <div className="flex items-center gap-2">
          <Rocket className="w-6 h-6 text-[#12643E]" />
          <Link href="/" className="text-xl font-extrabold text-[#12643E] tracking-tight">
            Crowdfundly
          </Link>
        </div>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/campaigns" 
            className={`text-[14px] font-semibold transition-colors ${
              pathname === '/campaigns' 
                ? 'text-[#12643E] border-b-2 border-[#12643E] py-5' 
                : 'text-gray-600 hover:text-gray-900 py-5'
            }`}
          >
            Explore Campaigns
          </Link>
          {user?.role === 'Creator' && (
            <Link 
              href="/dashboard/create" 
              className="text-[14px] font-semibold text-gray-600 hover:text-gray-900 transition-colors py-5"
            >
              Start a Project
            </Link>
          )}
          <Link 
            href="#" 
            className="text-[14px] font-semibold text-gray-600 hover:text-gray-900 transition-colors py-5"
          >
            About Us
          </Link>
          {user && !loading && (
            <Link 
              href="/dashboard" 
              className="text-[14px] font-semibold text-gray-600 hover:text-gray-900 transition-colors py-5"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right side: Auth Links or Profile Icons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-6 bg-gray-200 animate-pulse rounded-md"></div>
            ) : !user ? (
              <>
                <Link href="/login" className="border border-indigo-400 text-indigo-600 bg-white px-4 py-1.5 rounded-md text-[13px] font-bold hover:bg-indigo-50 transition-all duration-200">
                  Login
                </Link>
                <Link href="/register" className="bg-[#12643E] text-white px-4 py-1.5 rounded-md text-[13px] font-bold hover:bg-[#0e4f31] transition-all duration-200">
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2 text-gray-700 ml-2">
                <span className="text-[14px] font-bold mr-2 text-gray-800 hidden lg:block">{user.name}</span>
                <Link href="/dashboard" className="transition-opacity hover:opacity-80" title="Dashboard">
                  <img 
                    src={user?.photoURL || user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User") + "&background=12643E&color=fff"} 
                    alt={user?.name || "Profile"}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                </Link>
                <button type="button" onClick={logout} className="p-2 ml-1 hover:text-red-500 transition-colors" title="Logout">
                  <LogOut className="w-5 h-5 stroke-[1.8]" />
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg z-40 flex flex-col p-4 animate-in slide-in-from-top-2">
          <Link 
            href="/campaigns" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 text-[15px] font-semibold text-gray-700 border-b border-gray-50"
          >
            Explore Campaigns
          </Link>
          {user?.role === 'Creator' && (
            <Link 
              href="/dashboard/create" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-[15px] font-semibold text-gray-700 border-b border-gray-50"
            >
              Start a Project
            </Link>
          )}
          <Link 
            href="#" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 text-[15px] font-semibold text-gray-700 border-b border-gray-50"
          >
            About Us
          </Link>
          {user && !loading && (
            <Link 
              href="/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-[15px] font-semibold text-[#12643E] border-b border-gray-50"
            >
              Dashboard
            </Link>
          )}
          
          {/* Mobile Auth Links (if not logged in) */}
          {!loading && !user && (
            <div className="flex flex-col gap-2 mt-4">
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center border border-indigo-400 text-indigo-600 bg-white px-4 py-2 rounded-md text-[14px] font-bold"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#12643E] text-white px-4 py-2 rounded-md text-[14px] font-bold"
              >
                Register
              </Link>
            </div>
          )}
          
          {/* Mobile Auth Links (if logged in) */}
          {!loading && user && (
            <div className="flex items-center justify-between mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <img 
                  src={user?.photoURL || user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User") + "&background=12643E&color=fff"} 
                  alt={user?.name || "Profile"}
                  className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm"
                />
                <span className="text-[14px] font-bold text-gray-800">{user.name}</span>
              </div>
              <button 
                type="button"
                onClick={() => { logout(); setMobileMenuOpen(false); }} 
                className="flex items-center gap-1 text-red-500 text-[13px] font-bold px-3 py-1 bg-red-50 rounded-md"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}