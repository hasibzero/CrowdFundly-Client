"use client";
import { motion } from 'framer-motion';
import { 
  Download, 
  Calendar, 
  UserPlus, 
  CheckCircle2, 
  Banknote, 
  Flag, 
  Filter, 
  ArrowUp
} from 'lucide-react';
import Link from 'next/link';

export default function AdminReportsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const reportedIssues = [
    {
      id: 1,
      reporterName: "Sarah Jenkins",
      reporterHandle: "@sjenkins92",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      campaignTitle: "Next-Gen Solarglass Rooftiles",
      reason: "Misleading Claims",
      reasonColor: "bg-[#fee2e2] text-[#dc2626]",
      date: "Oct 24, 2023"
    },
    {
      id: 2,
      reporterName: "Marcus Thorne",
      reporterHandle: "@mthorne_invest",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
      campaignTitle: "AI-Powered Dream Journal App",
      reason: "Plagiarism",
      reasonColor: "bg-[#ffedd5] text-[#d97706]",
      date: "Oct 23, 2023"
    },
    {
      id: 3,
      reporterName: "Elena Rostova",
      reporterHandle: "@elena_creates",
      avatar: null,
      initial: "EL",
      campaignTitle: "Urban Hydroponics Kit",
      reason: "Inappropriate Content",
      reasonColor: "bg-[#dbeafe] text-[#2563eb]",
      date: "Oct 21, 2023"
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
          <Link href="/dashboard/admin/withdrawals" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
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
        {/* Header Area */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-4">
          <div>
            <h1 className="text-[32px] md:text-[36px] font-bold text-[#0f172a] mb-2 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Reports & Analytics
            </h1>
            <p className="text-[15px] text-gray-500">
              Monitor platform health, user acquisition, and flagged activities.
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-md text-[13px] font-medium text-[#0f172a] hover:bg-gray-50 transition-colors shadow-sm">
              <Download className="w-4 h-4 text-gray-500" />
              <span>Export CSV</span>
            </button>
            <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-md text-[13px] font-medium text-[#0f172a] hover:bg-gray-50 transition-colors shadow-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Last 30 Days</span>
            </button>
          </div>
        </motion.div>

        {/* 3 Metric Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* User Acquisition */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.03)] flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-[#e6f7ef] flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#059669]" />
              </div>
              <div className="flex items-center px-2 py-1 bg-[#e6f7ef] rounded-full text-[#059669] text-[11px] font-bold">
                <ArrowUp className="w-3 h-3 mr-1" /> 12.5%
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-500 mb-1">User Acquisition</p>
              <p className="text-[28px] font-bold text-[#0f172a] leading-none" style={{ fontFamily: 'Georgia, serif' }}>14,208</p>
            </div>
          </div>

          {/* Campaign Success Rate */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.03)] flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-[#ede9fe] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#7c3aed]" />
              </div>
              <div className="flex items-center px-2 py-1 bg-[#e6f7ef] rounded-full text-[#059669] text-[11px] font-bold">
                <ArrowUp className="w-3 h-3 mr-1" /> 4.2%
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-500 mb-1">Campaign Success Rate</p>
              <p className="text-[28px] font-bold text-[#0f172a] leading-none" style={{ fontFamily: 'Georgia, serif' }}>68.4%</p>
            </div>
          </div>

          {/* Total Funds Flow (Dark Green Card) */}
          <div className="bg-[#24704e] rounded-xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.05)] flex flex-col justify-between h-40 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-lg bg-[#33825f] flex items-center justify-center">
                <Banknote className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[12px] font-bold text-[#86efac] mb-1">Total Funds Flow (30d)</p>
              <p className="text-[28px] font-bold text-white leading-none" style={{ fontFamily: 'Georgia, serif' }}>$2.4M</p>
            </div>
          </div>

        </motion.div>

        {/* Reported Issues Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
          
          {/* Section Header */}
          <div className="px-8 py-6 flex justify-between items-start border-b border-gray-100">
            <div>
              <div className="flex items-center mb-1">
                <Flag className="w-5 h-5 text-[#dc2626] mr-2" fill="#fca5a5" />
                <h2 className="text-[20px] font-bold text-[#0f172a]" style={{ fontFamily: 'Georgia, serif' }}>Reported Issues</h2>
              </div>
              <p className="text-[14px] text-gray-500">
                Campaigns flagged by community members requiring admin review.
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors mt-2">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#f8f9fc]">
                <tr>
                  <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[25%]">Reporter</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[30%]">Campaign Title</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[20%]">Reason</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[15%]">Date Reported</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[10%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reportedIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Reporter */}
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        {issue.avatar ? (
                          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={issue.avatar} alt={issue.reporterName} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#10b981] flex items-center justify-center font-bold text-[13px] text-white flex-shrink-0">
                            {issue.initial}
                          </div>
                        )}
                        <div>
                          <p className="text-[13px] font-bold text-[#0f172a] leading-tight">{issue.reporterName}</p>
                          <p className="text-[11px] text-gray-500">{issue.reporterHandle}</p>
                        </div>
                      </div>
                    </td>

                    {/* Campaign Title */}
                    <td className="px-8 py-5">
                      <Link href="#" className="text-[14px] font-bold text-[#4f46e5] hover:text-[#4338ca] transition-colors leading-tight block">
                        {issue.campaignTitle}
                      </Link>
                    </td>

                    {/* Reason */}
                    <td className="px-8 py-5">
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${issue.reasonColor}`}>
                        {issue.reason}
                      </span>
                    </td>

                    {/* Date Reported */}
                    <td className="px-8 py-5 text-[13px] font-medium text-[#0f172a]">
                      <div className="max-w-[70px] leading-tight">
                        {issue.date}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-5 text-right">
                      {/* Empty space reserved as per mockup */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-5 flex items-center justify-between border-t border-gray-100 text-[12px]">
            <div className="text-gray-500 font-medium">
              Showing 1 to 3 of 12 flagged items
            </div>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 flex items-center justify-center border border-transparent rounded text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#12643E] text-white font-bold">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-transparent rounded text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
