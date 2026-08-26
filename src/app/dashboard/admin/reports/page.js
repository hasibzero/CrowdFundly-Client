"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Banknote, Megaphone, UserPlus, AlertTriangle, MessageSquare, Filter, Flag } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { API_URL } from '@/lib/api';

const API = API_URL;

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem('crowdfundly_token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [reportsRes, statsRes, withdrawalsRes] = await Promise.all([
        axios.get(`${API}/api/reports`, { headers }),
        axios.get(`${API}/api/platform/stats`).catch(() => ({ data: {} })),
        axios.get(`${API}/api/withdrawals`, { headers }).catch(() => ({ data: [] })),
      ]);
      setReports(reportsRes.data || []);
      setStats(statsRes.data || null);
      setWithdrawals(withdrawalsRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const totalVolume = stats?.totalFunded ? stats.totalFunded.toLocaleString() : null;
  const activeCamps = stats?.activeCampaigns ? stats.activeCampaigns.toLocaleString() : null;
  const newUsers = stats?.supporters ? stats.supporters.toLocaleString() : null;
  const pendingReports = reports.filter(r => r.status === 'Pending').length;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="w-full bg-[#f8f9fc] min-h-screen">
      <motion.div className="p-8 max-w-7xl mx-auto w-full" variants={containerVariants} initial="hidden" animate="visible">
        
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
          <h1 className="text-[28px] font-bold text-[#0f172a] tracking-tight">Platform Reports</h1>
          <div className="flex items-center gap-4">
            
            
          </div>
        </motion.div>

        {/* Dynamic Stat Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {totalVolume !== null && (
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Volume</p>
                <div className="w-10 h-10 rounded-lg bg-[#d1fae5] flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-[#059669]" />
                </div>
              </div>
              <h2 className="text-[28px] font-bold text-[#0f172a] mb-3">{totalVolume} credits</h2>
            </div>
          )}

          {activeCamps !== null && (
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Campaigns</p>
                <div className="w-10 h-10 rounded-lg bg-[#e0e7ff] flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-[#4f46e5]" />
                </div>
              </div>
              <h2 className="text-[28px] font-bold text-[#0f172a] mb-3">{activeCamps}</h2>
            </div>
          )}

          {newUsers !== null && (
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">New Supporters</p>
                <div className="w-10 h-10 rounded-lg bg-[#ffedd5] flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-[#ea580c]" />
                </div>
              </div>
              <h2 className="text-[28px] font-bold text-[#0f172a] mb-3">{newUsers}</h2>
            </div>
          )}

        </motion.div>

        {/* Dynamic Reported Issues */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dynamic Reported Issues */}
          <div className="bg-white rounded-xl p-8 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <h3 className="text-[16px] font-bold text-[#0f172a] mr-3">Reported Issues</h3>
                {pendingReports > 0 && (
                  <span className="bg-[#fee2e2] text-[#dc2626] px-2 py-0.5 rounded-full text-[10px] font-bold">{pendingReports} Pending</span>
                )}
              </div>
            </div>

            {reports.length > 0 ? (
              <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {reports.map(report => (
                  <div key={report._id} className="border border-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center text-[#dc2626] text-[13px] font-bold">
                        <Flag className="w-4 h-4 mr-1.5" /> {report.reason || 'Flagged Content'}
                      </div>
                      <span className="text-[11px] font-medium text-gray-400">
                        {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : '—'}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#0f172a] font-medium mb-3">
                      {report.description || 'No description provided by the reporter.'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="bg-[#eef2f6] text-[#475569] px-2 py-1 rounded text-[11px] font-bold">
                        Camp ID: {report.campaignId ? report.campaignId.toString().slice(-6) : 'Unknown'}
                      </span>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                        report.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        report.status === 'Reviewed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
                  <h3 className="text-[16px] font-bold">No issues reported!</h3>
                  <p className="text-[13px] mt-2">The platform is operating smoothly.</p>
                </div>
              )
            )}
          </div>

          {/* Withdrawal History */}
          <div className="bg-white rounded-xl p-8 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[16px] font-bold text-[#0f172a]">Withdrawal History</h3>
            </div>

            {withdrawals.length > 0 ? (
              <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {withdrawals.map(withdrawal => (
                  <div key={withdrawal._id} className="border border-gray-100 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-[14px] font-bold text-[#0f172a]">{(withdrawal.credits || 0).toLocaleString()} credits</p>
                      <p className="text-[12px] font-medium text-gray-500">{withdrawal.creatorEmail}</p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {withdrawal.requestDate ? new Date(withdrawal.requestDate).toLocaleDateString() : '—'} • {withdrawal.paymentMethod || 'Unknown'}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                      withdrawal.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                      withdrawal.status === 'Processed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {withdrawal.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
                  <h3 className="text-[16px] font-bold">No withdrawals yet</h3>
                  <p className="text-[13px] mt-2">No withdrawal requests have been made.</p>
                </div>
              )
            )}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
