"use client";
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, Clock, XCircle, Download, CreditCard } from 'lucide-react';

export default function PaymentHistoryPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const transactions = [
    {
      id: "tx_1Nj9L2K8Xj9pY3qZ",
      date: "Oct 15, 2026",
      time: "14:23 PM",
      package: "Pro Package",
      credits: "+800",
      amount: "$60.00",
      paymentMethod: "•••• 4242",
      status: "Completed",
    },
    {
      id: "tx_1Mg7K1J9Wh8oX2pY",
      date: "Sep 02, 2026",
      time: "09:15 AM",
      package: "Standard Package",
      credits: "+300",
      amount: "$25.00",
      paymentMethod: "•••• 5555",
      status: "Completed",
    },
    {
      id: "tx_1Lf6J0H8Vg7nW1oX",
      date: "Aug 20, 2026",
      time: "18:45 PM",
      package: "Elite Package",
      credits: "+1500",
      amount: "$110.00",
      paymentMethod: "•••• 4242",
      status: "Failed",
    },
    {
      id: "tx_1Ke5I9G7Uf6mV0nW",
      date: "Aug 20, 2026",
      time: "19:10 PM",
      package: "Elite Package",
      credits: "+1500",
      amount: "$110.00",
      paymentMethod: "•••• 4242",
      status: "Completed",
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#d1fae5] text-[#059669] border border-[#a7f3d0]">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#fef3c7] text-[#d97706] border border-[#fde68a]">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#fee2e2] text-[#dc2626] border border-[#fecaca]">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <motion.section 
      className="w-full max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-[32px] font-bold text-[#0f172a] mb-2 tracking-tight">
            Payment History
          </h1>
          <p className="text-[15px] text-gray-600 max-w-2xl">
            Review your past credit purchases, transaction details, and download receipts.
          </p>
        </div>
        
        {/* Optional quick stat or action */}
        <div className="hidden md:flex items-center space-x-3 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm">
           <div className="bg-[#eef2f6] p-2 rounded-lg text-gray-500">
             <FileText className="w-4 h-4" />
           </div>
           <div>
             <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Purchases</p>
             <p className="text-sm font-bold text-[#0f172a]">{transactions.filter(t => t.status === 'Completed').length} Orders</p>
           </div>
        </div>
      </motion.div>

      {/* Transaction Table Container */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
        
        {/* Table Controls (Search/Filter mockups) */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#f8fafc]/50">
          <h3 className="text-[15px] font-bold text-[#0f172a]">Recent Transactions</h3>
          <button className="text-xs font-bold text-[#0f766e] hover:text-[#0d655e] transition-colors flex items-center bg-emerald-50 px-3 py-1.5 rounded-lg">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
          </button>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-[#f8f9fc] border-b border-gray-200/80">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Date & Time</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Transaction ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Package</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Method</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group">
                  {/* Date & Time */}
                  <td className="px-6 py-5">
                    <p className="text-[13px] font-bold text-[#0f172a] mb-0.5">{tx.date}</p>
                    <p className="text-[11px] text-gray-500 font-medium">{tx.time}</p>
                  </td>
                  
                  {/* Transaction ID */}
                  <td className="px-6 py-5">
                    <code className="text-[12px] bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
                      {tx.id}
                    </code>
                  </td>

                  {/* Package & Credits */}
                  <td className="px-6 py-5">
                    <p className="text-[13px] font-bold text-gray-900 mb-0.5">{tx.package}</p>
                    <p className="text-[11px] font-bold text-[#0f766e]">{tx.credits} CR</p>
                  </td>

                  {/* Payment Method */}
                  <td className="px-6 py-5">
                    <div className="flex items-center text-gray-500 text-[13px] font-medium">
                      <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                      {tx.paymentMethod}
                    </div>
                  </td>

                  {/* Amount Paid */}
                  <td className="px-6 py-5 text-right">
                    <span className="text-[14px] font-bold text-[#0f172a]">{tx.amount}</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5 text-center">
                    {getStatusBadge(tx.status)}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-right">
                    {tx.status === 'Completed' ? (
                      <button className="text-gray-400 hover:text-[#0f766e] transition-colors p-2 rounded-lg hover:bg-emerald-50 inline-flex" title="Download Receipt">
                        <Download className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-gray-300 text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State Fallback (if no transactions exist) */}
          {transactions.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Transactions Yet</h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                You haven't made any credit purchases yet. When you do, your payment history will appear here.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}
