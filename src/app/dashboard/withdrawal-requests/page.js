"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Landmark, CreditCard as CreditCardIcon, CheckCircle2, Clock, Wallet, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { API_URL } from '@/lib/api';
const API = API_URL;

export default function WithdrawalRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('crowdfundly_token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        const [wdRes, meRes] = await Promise.all([
          axios.get(`${API}/api/withdrawals`, { headers }),
          axios.get(`${API}/api/users/me`, { headers }),
        ]);
        setRequests(wdRes.data);
        setCredits(meRes.data.credits || 0);
      } catch (err) {
        console.error('Failed to fetch withdrawals:', err);
        toast.error('Failed to load withdrawal history');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const filtered = requests.filter(r =>
    r.paymentMethod?.toLowerCase().includes(search.toLowerCase()) ||
    r.status?.toLowerCase().includes(search.toLowerCase())
  );

  const pendingAmount = requests.filter(r => r.status === 'Pending').reduce((s, r) => s + (r.amountUSD || 0), 0);
  const completedAmount = requests.filter(r => r.status === 'Processed').reduce((s, r) => s + (r.amountUSD || 0), 0);

  const getStatusBadge = (status) => {
    const styles = {
      Processed: <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#e6f7ef] text-[#2ea673] border border-[#d1f0e1]"><span className="w-1.5 h-1.5 rounded-full bg-[#2ea673] mr-1.5"></span>Processed</span>,
      Pending: <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5]"><span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mr-1.5"></span>Pending</span>,
      Denied: <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#fef2f2] text-[#dc2626] border border-[#fee2e2]"><span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mr-1.5"></span>Denied</span>,
    };
    return styles[status] || <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-gray-100 text-gray-600">{status}</span>;
  };

  const getSystemIcon = (method) => {
    if (!method) return <Wallet className="w-4 h-4 mr-2 text-gray-500" />;
    if (method.toLowerCase().includes('bank')) return <Landmark className="w-4 h-4 mr-2 text-gray-500" />;
    if (method.toLowerCase().includes('stripe') || method.toLowerCase().includes('card')) return <CreditCardIcon className="w-4 h-4 mr-2 text-gray-500" />;
    return <Wallet className="w-4 h-4 mr-2 text-gray-500" />;
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.section className="w-full max-w-6xl mx-auto pt-4" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="mb-10">
        <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">Withdrawal Requests</h1>
        <p className="text-[14px] text-gray-500">Track the status of your funds transfers and payment history.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Available Balance', value: `${credits.toLocaleString()} CR`, icon: Wallet, bg: 'bg-[#e6f7ef]', color: 'text-[#2ea673]' },
          { label: 'Pending Withdrawals', value: `$${pendingAmount.toFixed(2)}`, icon: Clock, bg: 'bg-[#fff7ed]', color: 'text-[#ea580c]' },
          { label: 'Total Processed', value: `$${completedAmount.toFixed(2)}`, icon: CheckCircle2, bg: 'bg-[#f3f0ff]', color: 'text-[#6d28d9]' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-gray-600 tracking-wide">{card.label}</span>
              <div className={`w-8 h-8 rounded-full ${card.bg} flex items-center justify-center ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[26px] font-bold text-[#0f172a] tracking-tight">{loading ? '—' : card.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by method or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#12643E]/20 focus:border-[#12643E] transition-colors"
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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#12643E] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            {requests.length === 0 ? 'No withdrawal requests yet.' : 'No results match your search.'}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-[#f8f9fc]">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Amount (USD)</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Payment Method</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((req) => (
                    <tr key={req._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-[13px] font-medium text-gray-600">
                        {req.requestDate ? new Date(req.requestDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      </td>
                      <td className="px-6 py-4 text-[14px] font-bold text-[#0f172a]">${(req.amountUSD || 0).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-[14px] text-[#334155]">
                          {getSystemIcon(req.paymentMethod)}
                          {req.paymentMethod || '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">{getStatusBadge(req.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 border-t border-gray-100 text-[13px] text-gray-500">
              Showing {filtered.length} of {requests.length} requests
            </div>
          </>
        )}
      </motion.div>
    </motion.section>
  );
}
