"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Banknote, Rocket, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

import { API_URL } from '@/lib/api';
const API = API_URL;

export default function ContributionsPage() {
  const { user } = useAuth();
  const [contributions, setContributions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalContributed: 0, projectsSupported: 0 });

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('crowdfundly_token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetch = async () => {
      setLoading(true);
      try {
        const [contRes, statsRes] = await Promise.all([
          axios.get(`${API}/api/contributions?page=${currentPage}&limit=10`, { headers }),
          axios.get(`${API}/api/dashboard/stats`, { headers }),
        ]);
        setContributions(contRes.data.contributions || []);
        setTotalPages(contRes.data.totalPages || 1);
        setTotalItems(contRes.data.totalItems || 0);
        setStats(statsRes.data);
      } catch (err) {
        console.error('Failed to load contributions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user, currentPage]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const getStatusBadge = (status) => {
    const s = { Completed: 'bg-green-100 text-green-700', Pending: 'bg-amber-100 text-amber-700', Failed: 'bg-red-100 text-red-700' };
    return <span className={`px-3 py-1 text-xs font-bold rounded-full ${s[status] || 'bg-gray-100 text-gray-600'}`}>{status || 'Completed'}</span>;
  };

  return (
    <motion.section className="w-full max-w-6xl mx-auto pt-4" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="mb-10">
        <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">My Contributions</h1>
        <p className="text-[14px] text-gray-500">Track your support for innovative campaigns.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-center h-28">
          <div className="w-14 h-14 rounded-full bg-[#2ea673]/10 flex items-center justify-center mr-5 shadow-sm">
            <Banknote className="w-6 h-6 text-[#2ea673]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Contributed</p>
            <p className="text-[24px] font-bold text-[#0f172a] leading-none">
              {loading ? '—' : stats.totalContributed?.toLocaleString()} <span className="text-[18px] font-medium text-gray-700">Credits</span>
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-center h-28">
          <div className="w-14 h-14 rounded-full bg-[#6d28d9]/10 flex items-center justify-center mr-5 shadow-sm">
            <Rocket className="w-6 h-6 text-[#6d28d9]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Projects Supported</p>
            <p className="text-[24px] font-bold text-[#0f172a] leading-none">
              {loading ? '—' : stats.projectsSupported} <span className="text-[18px] font-medium text-gray-700">Campaigns</span>
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#12643E] animate-spin" />
          </div>
        ) : contributions.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            No contributions yet. <a href="/campaigns" className="text-indigo-600 font-bold">Explore campaigns to support!</a>
          </div>
        ) : (
          <>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-[#f8f9fc]">
                  <tr>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Campaign ID</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Date</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Amount (Credits)</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Method</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contributions.map((c, idx) => (
                    <tr key={c._id || idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          </div>
                          <span className="text-[13px] font-bold text-[#0f172a]">{c.campaignTitle || `#${c.campaignId?.toString().slice(-8)}`}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-[14px] text-[#475569] font-medium">
                        {c.date ? new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      </td>
                      <td className="px-6 py-5 text-[15px] font-bold text-[#0f172a]">{(c.amount || 0).toLocaleString()}</td>
                      <td className="px-6 py-5 text-[14px] text-[#475569]">{c.paymentMethod || 'Credits'}</td>
                      <td className="px-6 py-5">{getStatusBadge(c.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden divide-y divide-gray-100">
              {contributions.map((c, idx) => (
                <div key={c._id || idx} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                      </div>
                      <span className="text-[13px] font-bold text-[#0f172a]">{c.campaignTitle || `#${c.campaignId?.toString().slice(-8)}`}</span>
                    </div>
                    {getStatusBadge(c.status)}
                  </div>
                  <div className="flex justify-between text-[13px] text-gray-500 mt-2">
                    <span>{c.date ? new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</span>
                    <span className="font-bold text-[#0f172a]">{(c.amount || 0).toLocaleString()} credits</span>
                  </div>
                </div>
              ))}
            </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-[13px] text-gray-500">
                  Showing {contributions.length} of {totalItems} contribution{totalItems !== 1 ? 's' : ''}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-[13px] font-medium border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-[13px] font-medium text-gray-700 bg-gray-50 rounded-md border border-gray-100">
                    {currentPage} / {totalPages || 1}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage >= totalPages || totalPages === 0}
                    className="px-3 py-1 text-[13px] font-medium border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
          </>
        )}
      </motion.div>
    </motion.section>
  );
}
