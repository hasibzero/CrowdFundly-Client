"use client";
import { motion } from 'framer-motion';
import { Search, Bell, HelpCircle, Users, Lightbulb, Wallet, Banknote, TrendingUp, TrendingRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full flex flex-col -mt-8 -mx-6 md:-mx-8">
      {/* Admin Topbar */}
      <div className="w-full h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex space-x-8 h-full">
          <Link href="#" className="h-full flex items-center border-b-2 border-[#12643E] text-[13px] font-bold text-[#12643E]">
            Stats
          </Link>
          <Link href="#" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Approvals
          </Link>
          <Link href="#" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Finance
          </Link>
        </div>

        <div className="flex items-center space-x-5">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-300 w-64 transition-colors"
            />
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-600 transition-colors hidden sm:block">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-1.5 rounded-md text-[13px] font-bold transition-colors shadow-sm">
            Create Notice
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 ml-2">
            <img 
              src={user?.avatar || "https://ui-avatars.com/api/?name=Admin&background=f3f4f6&color=1f2937"} 
              alt="Admin Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Admin Content */}
      <motion.div 
        className="p-8 max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">
            Platform Overview
          </h1>
          <p className="text-[14px] text-gray-500">
            Current metrics and system health for CrowdFund platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Total Supporters */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#d1fae5] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#059669]" />
              </div>
              <div className="flex items-center px-2 py-1 bg-[#e6f7ef] rounded-full text-[#059669] text-[11px] font-bold">
                <TrendingUp className="w-3 h-3 mr-1" /> +12%
              </div>
            </div>
            <p className="text-[12px] font-bold text-gray-500 mb-1 tracking-wide">Total Supporters</p>
            <p className="text-[28px] font-bold text-[#0f172a] leading-none">12,450</p>
          </div>

          {/* Total Creators */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#ede9fe] flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#7c3aed]" />
              </div>
              <div className="flex items-center px-2 py-1 bg-[#e6f7ef] rounded-full text-[#059669] text-[11px] font-bold">
                <TrendingUp className="w-3 h-3 mr-1" /> +5%
              </div>
            </div>
            <p className="text-[12px] font-bold text-gray-500 mb-1 tracking-wide">Total Creators</p>
            <p className="text-[28px] font-bold text-[#0f172a] leading-none">3,120</p>
          </div>

          {/* Available Credits */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#ffedd5] flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[#ea580c]" />
              </div>
              <div className="flex items-center px-2 py-1 bg-[#f1f5f9] rounded-full text-gray-500 text-[11px] font-bold">
                <TrendingRight className="w-3 h-3 mr-1" /> 0%
              </div>
            </div>
            <p className="text-[12px] font-bold text-gray-500 mb-1 tracking-wide">Available Credits (CR)</p>
            <p className="text-[28px] font-bold text-[#0f172a] leading-none">850,000</p>
          </div>

          {/* Payments Processed */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#e6f7ef] flex items-center justify-center">
                <Banknote className="w-5 h-5 text-[#12643E]" />
              </div>
              <div className="flex items-center px-2 py-1 bg-[#e6f7ef] rounded-full text-[#059669] text-[11px] font-bold">
                <TrendingUp className="w-3 h-3 mr-1" /> +24%
              </div>
            </div>
            <p className="text-[12px] font-bold text-gray-500 mb-1 tracking-wide">Payments Processed</p>
            <p className="text-[28px] font-bold text-[#0f172a] leading-none">$1.2M</p>
          </div>

        </motion.div>

        {/* Charts Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Line Chart Card */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-bold text-[#0f172a]">Revenue Growth</h3>
              <button className="flex items-center space-x-2 bg-[#f8fafc] px-3 py-1.5 rounded-full text-[12px] font-bold text-[#334155] border border-gray-200">
                <span>This Year</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* SVG Line Chart Mockup */}
            <div className="w-full h-64 relative mt-4">
              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[10px] font-medium text-gray-400">
                <span>160</span><span>140</span><span>120</span><span>100</span>
                <span>80</span><span>60</span><span>40</span><span>20</span><span>0</span>
              </div>
              
              {/* Chart Area */}
              <div className="absolute left-8 right-0 top-1 bottom-6 border-l border-b border-gray-200">
                {/* Grid Lines */}
                <div className="w-full h-full flex flex-col justify-between">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-full border-t border-gray-100 flex-1"></div>
                  ))}
                </div>
                
                {/* SVG Line */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#12643E" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#12643E" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill Area */}
                  <path 
                    d="M 0,85 L 10,80 L 20,72 L 30,73 L 40,60 L 50,58 L 60,45 L 70,50 L 80,38 L 90,28 L 100,18 L 100,100 L 0,100 Z" 
                    fill="url(#gradient)" 
                  />
                  
                  {/* Stroke Line */}
                  <path 
                    d="M 0,85 L 10,80 L 20,72 L 30,73 L 40,60 L 50,58 L 60,45 L 70,50 L 80,38 L 90,28 L 100,18" 
                    fill="none" 
                    stroke="#12643E" 
                    strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                  />
                  
                  {/* Data Points */}
                  {[
                    {x:0,y:85}, {x:10,y:80}, {x:20,y:72}, {x:30,y:73}, {x:40,y:60},
                    {x:50,y:58}, {x:60,y:45}, {x:70,y:50}, {x:80,y:38}, {x:90,y:28}, {x:100,y:18}
                  ].map((pt, i) => (
                    <circle 
                      key={i} 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="2" 
                      fill="white" 
                      stroke="#12643E" 
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
              </div>

              {/* X-Axis Labels */}
              <div className="absolute left-8 right-0 bottom-0 h-6 flex justify-between items-end text-[10px] font-medium text-gray-400">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
                <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
                <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>
          </div>

          {/* Donut Chart Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col">
            <h3 className="text-[14px] font-bold text-[#0f172a] mb-8">User Distribution</h3>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* CSS Donut Chart */}
              <div className="relative w-48 h-48 rounded-full mb-8" style={{
                background: `conic-gradient(
                  #4f46e5 0% 15%, 
                  #f59e0b 15% 30%, 
                  #0f766e 30% 100%
                )`
              }}>
                <div className="absolute inset-0 m-4 bg-white rounded-full"></div>
              </div>

              {/* Legend */}
              <div className="w-full flex justify-center space-x-6">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#0f766e] mr-2"></span>
                  <span className="text-[11px] font-medium text-gray-600">Supporters</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#4f46e5] mr-2"></span>
                  <span className="text-[11px] font-medium text-gray-600">Creators</span>
                </div>
              </div>
              <div className="w-full flex justify-center mt-3">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2"></span>
                  <span className="text-[11px] font-medium text-gray-600">Guests</span>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}
