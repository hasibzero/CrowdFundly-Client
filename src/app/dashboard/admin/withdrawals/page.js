"use client";
import { motion } from 'framer-motion';
import { 
  MoreHorizontal, 
  FileText, 
  CheckCircle2, 
  Filter, 
  Download
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
      creatorName: "Sarah Thompson",
      initials: "ST",
      initialColor: "bg-[#6366f1] text-white", // indigo
      credits: 45000,
      amount: "$45,000.00",
      system: "Stripe",
      date: "Oct 24, 2023"
    },
    {
      id: 2,
      creatorName: "Marcus Johnson",
      initials: "MJ",
      initialColor: "bg-[#d97706] text-white", // amber
      credits: 12500,
      amount: "$12,500.00",
      system: "PayPal",
      date: "Oct 23, 2023"
    },
    {
      id: 3,
      creatorName: "Elena Rodriguez",
      initials: "EL",
      initialColor: "bg-[#059669] text-white", // emerald
      credits: 8200,
      amount: "$8,200.00",
      system: "Bank Transfer",
      date: "Oct 23, 2023"
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
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">
              Withdrawal Requests
            </h1>
            <p className="text-[14px] text-gray-500">
              Review and process pending creator payouts.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-white border border-[#c7d2fe] px-4 py-2 rounded-md text-[13px] font-bold text-[#4f46e5] hover:bg-indigo-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 bg-white border border-[#c7d2fe] px-4 py-2 rounded-md text-[13px] font-bold text-[#4f46e5] hover:bg-indigo-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </motion.div>

        {/* 3 Metric Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Total Pending Payouts */}
          <div className="bg-white rounded-xl p-6 shadow-[0_2px_15px_rgb(0,0,0,0.04)] border border-gray-50 relative overflow-hidden flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-[#eef2ff] flex items-center justify-center border border-[#e0e7ff]">
                <MoreHorizontal className="w-5 h-5 text-[#4f46e5]" />
              </div>
              <div className="px-3 py-1 bg-[#ffe4e6] rounded-full text-[#e11d48] text-[10px] font-bold uppercase tracking-wider">
                Requires Action
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-500 mb-1">Total Pending Payouts</p>
              <p className="text-[28px] font-bold text-[#0f172a] leading-none">$124,500.00</p>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white rounded-xl p-6 shadow-[0_2px_15px_rgb(0,0,0,0.04)] border border-gray-50 relative overflow-hidden flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-[#eef2ff] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#4f46e5]" />
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-500 mb-1">Pending Requests</p>
              <p className="text-[28px] font-bold text-[#0f172a] leading-none">42</p>
            </div>
          </div>

          {/* Processed Amount */}
          <div className="bg-white rounded-xl p-6 shadow-[0_2px_15px_rgb(0,0,0,0.04)] border border-gray-50 relative overflow-hidden flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-[#eef2ff] flex items-center justify-center border border-[#e0e7ff]">
                <CheckCircle2 className="w-5 h-5 text-[#4f46e5]" />
              </div>
              <div className="px-3 py-1 bg-[#d1fae5] rounded-full text-[#059669] text-[10px] font-bold uppercase tracking-wider">
                Today
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-500 mb-1">Processed Amount</p>
              <p className="text-[28px] font-bold text-[#0f172a] leading-none">$18,200.00</p>
            </div>
          </div>

        </motion.div>

        {/* Table Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-50 overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-[#fcfdfd]">
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Creator Name</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Credits</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Amount ($)</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Payment<br/>System</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Request<br/>Date</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {withdrawalRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Creator */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] flex-shrink-0 ${req.initialColor}`}>
                          {req.initials}
                        </div>
                        <p className="text-[13px] font-bold text-[#0f172a] max-w-[100px] leading-tight">
                          {req.creatorName}
                        </p>
                      </div>
                    </td>

                    {/* Credits */}
                    <td className="px-6 py-5 text-[13px] font-medium text-gray-600">
                      {req.credits.toLocaleString()}
                    </td>

                    {/* Amount ($) */}
                    <td className="px-6 py-5 text-[14px] font-bold text-[#0f172a]">
                      {req.amount}
                    </td>

                    {/* Payment System */}
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#eef2ff] text-[#4f46e5]">
                        {req.system}
                      </span>
                    </td>

                    {/* Request Date */}
                    <td className="px-6 py-5 text-[12px] font-medium text-gray-500 leading-tight">
                      {req.date.split(', ')[0]},<br/>{req.date.split(', ')[1]}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <button className="bg-[#12643E] hover:bg-[#0e4f31] text-white px-4 py-1.5 rounded-md text-[12px] font-bold transition-colors shadow-sm">
                          Process
                        </button>
                        <button className="bg-white hover:bg-red-50 border border-[#fca5a5] text-[#dc2626] px-4 py-1.5 rounded-md text-[12px] font-bold transition-colors shadow-sm">
                          Deny
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-5 flex items-center justify-between border-t border-gray-100 text-[11px]">
            <div className="text-gray-500 font-medium">
              Showing 1 to 3 of 42 entries
            </div>
            <div className="flex items-center space-x-1">
              <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                &lt;
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded bg-[#12643E] text-white font-bold shadow-sm">
                1
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                2
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                3
              </button>
              <span className="w-7 h-7 flex items-center justify-center text-gray-400">...</span>
              <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
