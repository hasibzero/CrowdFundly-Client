"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, FileText, CheckCircle2, Filter, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

import { API_URL } from '@/lib/api';

const API = API_URL;

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem('crowdfundly_token');
      const res = await axios.get(`${API}/api/withdrawals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWithdrawals(res.data);
    } catch (err) {
      toast.error('Failed to load withdrawal requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWithdrawals(); }, []);

  const handleStatus = async (id, status) => {
    setProcessingId(id);
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.patch(`${API}/api/withdrawals/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Withdrawal ${status.toLowerCase()} successfully`);
      fetchWithdrawals();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setProcessingId(null);
    }
  };

  const pending = withdrawals.filter(w => w.status === 'Pending');
  const processed = withdrawals.filter(w => w.status === 'Processed');
  const pendingTotal = pending.reduce((s, w) => s + (w.credits || 0), 0);
  const processedTotal = processed.reduce((s, w) => s + (w.credits || 0), 0);

  const getInitials = (email) => email?.slice(0, 2).toUpperCase() || '??';
  const colors = ['bg-[#6366f1]', 'bg-[#d97706]', 'bg-[#059669]', 'bg-[#dc2626]', 'bg-[#7c3aed]'];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="w-full">


      <motion.div className="p-8 max-w-7xl mx-auto w-full" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">Withdrawal Requests</h1>
            <p className="text-[14px] text-gray-500">Review and process pending creator payouts.</p>
          </div>
          <div className="flex space-x-3">
            {/* Action buttons removed as requested */}
          </div>
        </motion.div>

        {/* Metric Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Pending Payouts', value: `$${pendingTotal.toFixed(2)}`, icon: MoreHorizontal, badge: 'Requires Action', badgeStyle: 'bg-[#ffe4e6] text-[#e11d48]' },
            { label: 'Pending Requests', value: pending.length, icon: FileText, badge: null },
            { label: 'Processed Today', value: `$${processedTotal.toFixed(2)}`, icon: CheckCircle2, badge: 'Completed', badgeStyle: 'bg-[#d1fae5] text-[#059669]' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-6 shadow-[0_2px_15px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col justify-between h-36">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-[#eef2ff] flex items-center justify-center border border-[#e0e7ff]">
                  <card.icon className="w-5 h-5 text-[#4f46e5]" />
                </div>
                {card.badge && (
                  <div className={`px-3 py-1 ${card.badgeStyle} rounded-full text-[10px] font-bold uppercase tracking-wider`}>{card.badge}</div>
                )}
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-500 mb-1">{card.label}</p>
                <p className="text-[28px] font-bold text-[#0f172a] leading-none">{loading ? '—' : card.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-50 overflow-hidden flex flex-col">
          {loading ? (
            <div className="flex justify-center items-center py-20"><Loader2 className="w-8 h-8 text-[#12643E] animate-spin" /></div>
          ) : withdrawals.length === 0 ? (
            <div className="py-20 text-center text-gray-400 text-sm">No withdrawal requests found.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="bg-[#fcfdfd]">
                    <tr className="border-b border-gray-100">
                      <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Creator</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Amount ($)</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Payment Method</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Request Date</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {withdrawals.map((req, idx) => (
                      <tr key={req._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] text-white flex-shrink-0 ${colors[idx % colors.length]}`}>
                              {getInitials(req.creatorEmail)}
                            </div>
                            <p className="text-[13px] font-bold text-[#0f172a] leading-tight max-w-[140px] truncate">{req.creatorEmail}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-[14px] font-bold text-[#0f172a]">${(req.credits || 0).toFixed(2)}</td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#eef2ff] text-[#4f46e5]">
                            {req.paymentMethod || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-[12px] font-medium text-gray-500">
                          {req.requestDate ? new Date(req.requestDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${req.status === 'Processed' ? 'bg-green-100 text-green-700' : req.status === 'Denied' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          {req.status === 'Pending' ? (
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleStatus(req._id, 'Processed')}
                                disabled={processingId === req._id}
                                className="bg-[#12643E] hover:bg-[#0e4f31] text-white px-4 py-1.5 rounded-md text-[12px] font-bold transition-colors shadow-sm disabled:opacity-50"
                              >
                                {processingId === req._id ? '...' : 'Process'}
                              </button>
                              <button
                                onClick={() => handleStatus(req._id, 'Denied')}
                                disabled={processingId === req._id}
                                className="bg-white hover:bg-red-50 border border-[#fca5a5] text-[#dc2626] px-4 py-1.5 rounded-md text-[12px] font-bold transition-colors shadow-sm disabled:opacity-50"
                              >
                                Deny
                              </button>
                            </div>
                          ) : (
                            <span className="text-[12px] text-gray-400 font-medium">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 text-[12px] text-gray-500">
                Showing {withdrawals.length} request{withdrawals.length !== 1 ? 's' : ''} · {pending.length} pending
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
