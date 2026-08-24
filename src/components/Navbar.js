"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { UserCircle, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-white border-b border-gray-100 transition-all duration-300">
      {/* Left side: Brand + Nav Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-extrabold text-[#196944] tracking-tight">
          Crowdfundly
        </Link>
        
        <div className="flex items-center gap-5">
          <Link 
            href="/campaigns" 
            className="text-sm font-semibold text-gray-700 hover:text-black transition-colors"
          >
            Explore Campaigns
          </Link>
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Right side: Auth Links or Profile Icons */}
      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link 
              href="/register" 
              className="border border-[#196944] text-[#196944] bg-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-[#196944] hover:text-white transition-all duration-200"
            >
              Register
            </Link>
            <Link 
              href="/login" 
              className="bg-[#196944] text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-[#135235] transition-all duration-200"
            >
              Sign in
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2 text-gray-700 ml-2">
            <button 
              type="button"
              className="p-1 hover:text-black transition-colors"
              title="Profile"
            >
              <UserCircle className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button 
              type="button"
              onClick={logout} 
              className="p-1 hover:text-black transition-colors"
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