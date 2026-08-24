"use client";
import { motion } from 'framer-motion';
import { 
  Wallet, 
  ClipboardList, 
  CheckCircle2, 
  Landmark, 
  TrendingUp, 
  AlertCircle, 
  Filter, 
  Download,
  Ban,
  BadgeCheck
} from 'lucide-react';
import Link from 'next/link';

export default function AdminWithdrawalsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const withdrawalRequests = [
    {
      id: 1,
      creatorName: "Alex Mercer",
      creatorEmail: "alex.m@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
      isVerified: true,
      credits: 15000,
      amount: "$1,500.00",
      system: "Stripe",
      systemColor: "bg-[#eef2ff] text-[#4f46e5]",
      date: "Oct 24, 2023",
      urgent: false
    },
    {
      id: 2,
      creatorName: "Luna Studios",
      creatorEmail: "contact@lunastudios.art",
      avatar: null, // Will render 'L'
      initialColor: "bg-[#fed7aa] text-[#c2410c]",
      isVerified: false,
      credits: 8500,
      amount: "$850.00",
      system: "Bkash",
      systemColor: "bg-[#fce7f3] text-[#db2777]",
      date: "Oct 24, 2023",
      urgent: false
    },
    {
      id: 3,
      creatorName: "David Chen",
      creatorEmail: "d.chen.films@mail.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
      isVerified: false,
      credits: 42000,
      amount: "$4,200.00",
      system: "PayPal",
      systemColor: "bg-[#e0f2fe] text-[#0284c7]",
      date: "Oct 23, 2023",
      urgent: true
    },
    {
      id: 4,
      creatorName: "EcoInnovate Hub",
      creatorEmail: "finance@ecoinnovate.org",
      avatar: null, // Will render 'E'
      initialColor: "bg-[#dbeafe] text-[#1d4ed8]",
      isVerified: true,
      credits: 125000,
      amount: "$12,500.00",
      system: "Stripe",
      systemColor: "bg-[#eef2ff] text-[#4f46e5]",
      date: "Oct 23, 2023",
      urgent: false
    }
  ];

  return (
    <div className="w-full flex flex-col -mt-8 -mx-6 md:-mx-8">
      {/* Admin Topbar */}
      <div className="w-full h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex space-x-8 h-full">
          <Link href="/dashboard/admin" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Stats
          </Link>
          <Link href="/dashboard/admin/campaigns" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Approvals
          </Link>
          <Link href="/dashboard/admin/withdrawals" className="h-full flex items-center border-b-2 border-[#12643E] text-[13px] font-bold text-[#12643E]">
            Finance
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="p-8 max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">
            Withdrawal Requests
          </h1>
          <p className="text-[14px] text-gray-500">
            Manage and process pending creator payouts.
          </p>
        </motion.div>

        {/* 4 Metric Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Pending Payouts */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Pending<br/>Payouts</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#ffedd5] flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[#ea580c]" />
              </div>
            </div>
            <p className="text-[32px] font-bold text-[#0f172a] leading-none mb-2">$45,230</p>
            <div className="flex items-center text-[#059669] text-[12px] font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> +12% from last week
            </div>
          </div>

          {/* Requests */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Requests</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#ede9fe] flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-[#7c3aed]" />
              </div>
            </div>
            <p className="text-[32px] font-bold text-[#0f172a] leading-none mb-2">142</p>
            <div className="flex items-center text-[#dc2626] text-[12px] font-medium">
              <AlertCircle className="w-3.5 h-3.5 mr-1" /> 24 urgent requests
            </div>
          </div>

          {/* Processed Today */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Processed<br/>Today</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#d1fae5] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#059669]" />
              </div>
            </div>
            <p className="text-[32px] font-bold text-[#0f172a] leading-none mb-2">$12,400</p>
            <div className="flex items-center text-gray-500 text-[12px] font-medium">
              38 requests completed
            </div>
          </div>

          {/* Escrow Balance */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Escrow<br/>Balance</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#e0e7ff] flex items-center justify-center">
                <Landmark className="w-5 h-5 text-[#3b2de6]" />
              </div>
            </div>
            <p className="text-[32px] font-bold text-[#0f172a] leading-none mb-2">$1,250,000</p>
            <div className="flex items-center text-[#059669] text-[12px] font-medium">
              Healthy Liquidity
            </div>
          </div>

        </motion.div>

        {/* Table Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
          
          {/* Table Header Controls */}
          <div className="px-6 py-5 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-[20px] font-bold text-[#0f172a]">Pending Requests</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select className="appearance-none pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer">
                  <option>All Payment Methods</option>
                  <option>Stripe</option>
                  <option>Bkash</option>
                  <option>PayPal</option>
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button className="p-2 bg-white border border-gray-200 rounded-md text-gray-500 hover:text-gray-700 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="bg-[#eef2f6]">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Creator</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Credits</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Amount ($)</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Payment<br/>System</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Request Date</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {withdrawalRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Creator */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {req.avatar ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={req.avatar} alt={req.creatorName} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px] flex-shrink-0 ${req.initialColor}`}>
                            {req.creatorName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center">
                            <p className="text-[14px] font-bold text-[#0f172a] mr-1">{req.creatorName}</p>
                            {req.isVerified && <BadgeCheck className="w-4 h-4 text-[#4f46e5]" fill="#eef2ff" />}
                          </div>
                          <p className="text-[12px] text-gray-500">{req.creatorEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Credits */}
                    <td className="px-6 py-4 text-[14px] font-medium text-gray-600">
                      {req.credits.toLocaleString()}
                    </td>

                    {/* Amount ($) */}
                    <td className="px-6 py-4 text-[15px] font-bold text-[#0f172a]">
                      {req.amount}
                    </td>

                    {/* Payment System */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${req.systemColor}`}>
                        {req.system}
                      </span>
                    </td>

                    {/* Request Date */}
                    <td className="px-6 py-4 text-[13px] font-medium text-gray-600">
                      <div className="flex items-center">
                        {req.urgent && <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mr-2"></div>}
                        {req.date}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        {req.id === 4 && ( // Adding the block/cancel icon specifically to the last item as seen in mockup
                          <button className="text-red-500 hover:text-red-700 transition-colors">
                            <Ban className="w-5 h-5" />
                          </button>
                        )}
                        <button className="flex items-center bg-[#12643E] hover:bg-[#0e4f31] text-white px-4 py-2 rounded-md text-[13px] font-bold transition-colors shadow-sm">
                          Approve <CheckCircle2 className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 text-[12px]">
            <div className="text-gray-500 font-medium">
              Showing 1 to 4 of 142 entries
            </div>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#eef2ff] text-[#4f46e5] font-bold">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                3
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                36
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
