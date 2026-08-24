"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { UserCircle, LogOut, Rocket } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-white border-b border-gray-100 transition-all duration-300">
      {/* Left side: Brand */}
      <div className="flex items-center gap-2">
        <Rocket className="w-6 h-6 text-[#12643E]" />
        <Link href="/" className="text-xl font-extrabold text-[#12643E] tracking-tight">
          Crowdfundly
        </Link>
      </div>

      {/* Center Nav Links */}
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
        <Link 
          href={user ? "/dashboard/create" : "/login"} 
          className="text-[14px] font-semibold text-gray-600 hover:text-gray-900 transition-colors py-5"
        >
          Start a Project
        </Link>
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
        {loading ? (
          <div className="w-20 h-6 bg-gray-200 animate-pulse rounded-md"></div>
        ) : !user ? (
          <>
            <Link 
              href="/login" 
              className="border border-indigo-400 text-indigo-600 bg-white px-5 py-1.5 rounded-md text-[13px] font-bold hover:bg-indigo-50 transition-all duration-200"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-[#12643E] text-white px-5 py-1.5 rounded-md text-[13px] font-bold hover:bg-[#0e4f31] transition-all duration-200"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2 text-gray-700 ml-2">
            <span className="text-[14px] font-bold mr-2 text-gray-800">{user.name}</span>
            <button 
              type="button"
              className="p-1 hover:text-[#12643E] transition-colors"
              title="Profile"
            >
              <UserCircle className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button 
              type="button"
              onClick={logout} 
              className="p-1 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}