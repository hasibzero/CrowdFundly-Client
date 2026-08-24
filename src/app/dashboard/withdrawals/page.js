"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Landmark, Info, ShieldCheck, Lock, RefreshCcw, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WithdrawalsPage() {
  const [credits, setCredits] = useState('');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // 20 credits = $1 USD
  const usdAmount = credits ? (parseInt(credits) / 20).toFixed(2) : '0.00';
  const isInsufficient = credits && parseInt(credits) < 200;

  return (
    <motion.section 
      className="w-full max-w-5xl mx-auto pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-10">
        <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">
          Withdrawals
        </h1>
        <p className="text-[14px] text-gray-500">
          Manage your earnings and transfer funds to your preferred payment accounts.
        </p>
      </motion.div>

      {/* Top Stats Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Available Balance Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-[#e6f7f2] to-[#f4fbf8] rounded-xl p-8 border border-emerald-50 relative overflow-hidden">
          <div className="flex items-center text-gray-600 mb-6 font-bold text-sm">
            <Wallet className="w-5 h-5 mr-2" />
            Available for Withdrawal
          </div>
          <div className="flex items-baseline mb-4">
            <span className="text-[48px] font-bold text-[#0f172a] tracking-tight mr-3 leading-none">3,450</span>
            <span className="text-[15px] font-medium text-gray-500">Credits</span>
          </div>
          <div className="flex items-center text-[13px]">
            <span className="font-bold text-[#0f766e] mr-2">≈ $172.50 USD</span>
            <span className="text-gray-500">(Rate: 20 credits = $1)</span>
          </div>
        </div>

        {/* Ready to cash out Card */}
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 bg-[#eef2f6] rounded-full flex items-center justify-center text-[#0f766e] mb-4">
            <Landmark className="w-6 h-6" />
          </div>
          <h3 className="text-[18px] font-bold text-[#0f172a] mb-2">Ready to cash out?</h3>
          <p className="text-[12px] text-gray-500 mb-6 px-2">
            Minimum withdrawal is 200 credits ($10.00).
          </p>
          <button className="w-full bg-[#12643E] hover:bg-[#0e4f31] text-white py-2.5 rounded-lg font-bold text-[14px] transition-colors shadow-sm">
            Start Withdrawal
          </button>
        </div>
      </motion.div>

      {/* Withdrawal Form Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
        {/* Card Header */}
        <div className="bg-[#f8f9fc] px-8 py-5 border-b border-gray-100 flex items-center">
          <RefreshCcw className="w-5 h-5 text-[#0f766e] mr-3" />
          <h2 className="text-[18px] font-bold text-[#0f172a]">Request Withdrawal</h2>
        </div>

        {/* Card Body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Form Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-[12px] font-bold text-[#0f172a] mb-1.5">Credits To Withdraw</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  placeholder="e.g. 500" 
                  className="w-full pl-4 pr-16 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[12px] text-gray-500 font-bold">
                  Credits
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#0f172a] mb-1.5">Withdraw Amount ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">$</span>
                <input 
                  type="text" 
                  value={usdAmount}
                  disabled
                  className="w-full pl-8 pr-4 py-3 rounded-md border border-gray-100 bg-[#f8fafc] text-[14px] text-gray-500 font-semibold cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#0f172a] mb-1.5">Payment System</label>
              <select className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-700 bg-white appearance-none">
                <option value="">Select a payment method</option>
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe Connect</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#0f172a] mb-1.5">Account Number / Email</label>
              <input 
                type="text" 
                placeholder="Enter account details" 
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="pt-2">
              <button 
                disabled={isInsufficient || !credits}
                className={`w-full py-3.5 rounded-md font-bold text-[14px] flex items-center justify-center transition-colors ${
                  isInsufficient || !credits 
                    ? 'bg-[#eef2f6] text-gray-400 cursor-not-allowed' 
                    : 'bg-[#12643E] hover:bg-[#0e4f31] text-white shadow-sm'
                }`}
              >
                <Lock className="w-4 h-4 mr-2" />
                Withdraw Funds
              </button>
              
              {isInsufficient && (
                <p className="text-[12px] text-red-500 mt-2 text-center font-medium">
                  Insufficient credit. Minimum 200 credits required.
                </p>
              )}
            </div>
          </div>

          {/* Guidelines Column */}
          <div className="bg-[#f8fafc] rounded-xl p-8 border border-gray-100 flex flex-col">
            <h3 className="text-[14px] font-bold text-[#0f172a] mb-6">Withdrawal Guidelines</h3>
            
            <div className="space-y-6 flex-1">
              <div className="flex">
                <Info className="w-5 h-5 text-[#0f766e] mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-bold text-[#0f172a] mb-1">Processing Time</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    Most withdrawals are processed within 2-3 business days depending on the selected payment system.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <Landmark className="w-5 h-5 text-[#0f766e] mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-bold text-[#0f172a] mb-1">Fees</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    Standard platform fees may apply. Check our <Link href="#" className="text-[#3b2de6] hover:underline">fee schedule</Link> for details.
                  </p>
                </div>
              </div>

              <div className="flex">
                <ShieldCheck className="w-5 h-5 text-[#0f766e] mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-bold text-[#0f172a] mb-1">Security</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    Ensure your account details are correct. Transactions cannot be reversed once processed.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-[12px] text-gray-500 mb-2">Need Help?</p>
              <Link href="#" className="text-[13px] font-bold text-[#3b2de6] hover:text-indigo-800 transition-colors flex items-center justify-center">
                Contact Support <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.section>
  );
}
