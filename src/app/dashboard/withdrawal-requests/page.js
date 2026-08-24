"use client";
import { motion } from 'framer-motion';
import { Search, Filter, Download, Landmark, CreditCard as CreditCardIcon, CheckCircle2, Clock, XCircle, Wallet, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WithdrawalRequestsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const requests = [
    {
      id: 1,
      date: "Oct 24, 2023",
      credits: "3,200",
      amount: "$3,200.00",
      system: "Bank Transfer (...4592)",
      status: "Pending",
      action: "Details"
    },
    {
      id: 2,
      date: "Oct 15, 2023",
      credits: "1,500",
      amount: "$1,500.00",
      system: "Stripe (...1120)",
      status: "Completed",
      action: "Receipt"
    },
    {
      id: 3,
      date: "Sep 28, 2023",
      credits: "8,400",
      amount: "$8,400.00",
      system: "Bank Transfer (...4592)",
      status: "Completed",
      action: "Receipt"
    },
    {
      id: 4,
      date: "Sep 10, 2023",
      credits: "500",
      amount: "$500.00",
      system: "PayPal (a...s@email.com)",
      status: "Failed",
      action: "Retry"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#e6f7ef] text-[#2ea673] border border-[#d1f0e1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ea673] mr-1.5"></span>
            Completed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mr-1.5"></span>
            Pending
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#fef2f2] text-[#dc2626] border border-[#fee2e2]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mr-1.5"></span>
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const getSystemIcon = (system) => {
    if (system.includes('Bank')) return <Landmark className="w-4 h-4 mr-2 text-gray-500" />;
    if (system.includes('Stripe')) return <CreditCardIcon className="w-4 h-4 mr-2 text-gray-500" />;
    return <Wallet className="w-4 h-4 mr-2 text-gray-500" />; // Fallback for PayPal etc.
  };

  return (
    <motion.section 
      className="w-full max-w-6xl mx-auto pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-10">
        <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">
          Withdrawal Requests
        </h1>
        <p className="text-[14px] text-gray-500">
          Track the status of your funds transfers and payment history.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-center">
            <span className="text-[13px] font-bold text-gray-600 tracking-wide">Available Balance</span>
            <div className="w-8 h-8 rounded-full bg-[#e6f7ef] flex items-center justify-center text-[#2ea673]">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[28px] font-bold text-[#0f172a] tracking-tight">$12,450.00</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-center">
            <span className="text-[13px] font-bold text-gray-600 tracking-wide">Pending Withdrawals</span>
            <div className="w-8 h-8 rounded-full bg-[#fff7ed] flex items-center justify-center text-[#ea580c]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[28px] font-bold text-[#0f172a] tracking-tight">$3,200.00</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-center">
            <span className="text-[13px] font-bold text-gray-600 tracking-wide">Total Withdrawn</span>
            <div className="w-8 h-8 rounded-full bg-[#f3f0ff] flex items-center justify-center text-[#6d28d9]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[28px] font-bold text-[#0f172a] tracking-tight">$45,890.00</p>
        </div>
      </motion.div>

      {/* Main Table Card */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
        
        {/* Table Controls */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search requests..." 
              className="w-full pl-9 pr-4 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-colors"
            />
          </div>
          <div className="flex space-x-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter className="w-3.5 h-3.5 mr-2 text-gray-500" /> Filter
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              <Download className="w-3.5 h-3.5 mr-2 text-gray-500" /> Export
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-[#f8f9fc]">
              <tr>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Date</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Withdrawal Credits</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Amount ($)</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Payment System</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Status</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-[14px] font-medium text-[#334155]">
                    {req.date.split(',')[0]},<br/>{req.date.split(',')[1]}
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#334155]">
                    {req.credits} Credits
                  </td>
                  <td className="px-6 py-5 text-[14px] font-medium text-[#334155]">
                    {req.amount}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center text-[14px] text-[#334155]">
                      {getSystemIcon(req.system)}
                      {req.system.includes('(') ? (
                        <span>
                          {req.system.split('(')[0]}<br/>
                          <span className="text-[12px] text-gray-500">({req.system.split('(')[1]}</span>
                        </span>
                      ) : (
                        req.system
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {getStatusBadge(req.status)}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <Link href="#" className="text-[13px] font-bold text-[#3b2de6] hover:text-indigo-800 transition-colors">
                      {req.action}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-gray-500">
            Showing 1 to 4 of 24 entries
          </p>
          <div className="flex space-x-1">
            <button className="px-3 py-1.5 rounded-md text-[13px] font-bold text-gray-400 cursor-not-allowed">
              Prev
            </button>
            <button className="w-8 h-8 rounded-md bg-[#12643E] text-white text-[13px] font-bold flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-[13px] font-bold flex items-center justify-center transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-[13px] font-bold flex items-center justify-center transition-colors">
              3
            </button>
            <button className="px-3 py-1.5 rounded-md text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors border border-gray-200 ml-1">
              Next
            </button>
          </div>
        </div>

      </motion.div>
    </motion.section>
  );
}
