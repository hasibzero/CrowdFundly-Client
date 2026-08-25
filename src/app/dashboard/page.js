"use client";
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Hourglass, WalletCards, ArrowRight, TrendingUp, CheckCircle2, Loader2, LayoutDashboard, Users, Clock } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { API_URL } from '@/lib/api';

const API = API_URL;

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('crowdfundly_token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        const [statsRes] = await Promise.all([
          axios.get(`${API}/api/dashboard/stats`, { headers }),
        ]);
        setStats(statsRes.data);

        if (user.role === 'Supporter') {
          const contRes = await axios.get(`${API}/api/contributions`, { headers });
          const contribs = Array.isArray(contRes.data) ? contRes.data : contRes.data.contributions || [];
          setContributions(contribs.slice(0, 5));
        }
        if (user.role === 'Creator') {
          const campRes = await axios.get(`${API}/api/creator/campaigns`, { headers });
          setMyCampaigns(campRes.data.slice(0, 5));
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-[#12643E] animate-spin" />
      </div>
    );
  }

  // ── ADMIN DASHBOARD ──────────────────────────────────────────
  if (user?.role === 'Admin') {
    return (
      <motion.section className="max-w-6xl w-full" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-1 tracking-tight">Admin Dashboard</h1>
          <p className="text-[15px] text-gray-500">Platform overview and management center.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { label: 'Total Campaigns', value: stats?.totalCampaigns ?? 0, icon: LayoutDashboard, color: 'bg-indigo-50 text-indigo-600' },
            { label: 'Total Users', value: stats?.totalUsers ?? 0, icon: Users, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Pending Campaigns', value: stats?.pendingCampaigns ?? 0, icon: Clock, color: 'bg-amber-50 text-amber-600' },
            { label: 'Pending Withdrawals', value: stats?.totalWithdrawals ?? 0, icon: WalletCards, color: 'bg-purple-50 text-purple-600' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-1">{card.label}</p>
                <p className="text-[32px] font-bold text-[#0f172a] leading-none">{card.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link href="/dashboard/admin/campaigns" className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center group">
            <div>
              <p className="text-[14px] font-bold text-[#0f172a] mb-1">Review Campaigns</p>
              <p className="text-[13px] text-gray-500">{stats?.pendingCampaigns ?? 0} pending approval</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
          </Link>
          <Link href="/dashboard/admin/withdrawals" className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center group">
            <div>
              <p className="text-[14px] font-bold text-[#0f172a] mb-1">Process Withdrawals</p>
              <p className="text-[13px] text-gray-500">{stats?.totalWithdrawals ?? 0} pending requests</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
          </Link>
        </motion.div>
      </motion.section>
    );
  }

  // ── CREATOR DASHBOARD ─────────────────────────────────────────
  if (user?.role === 'Creator') {
    return (
      <motion.section className="max-w-6xl w-full" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-1 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-[15px] text-gray-500">Here's how your campaigns are performing.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { label: 'My Campaigns', value: stats?.totalCampaigns ?? 0, icon: LayoutDashboard, color: 'bg-indigo-50 text-indigo-600' },
            { label: 'Total Raised', value: `$${(stats?.totalRaised ?? 0).toLocaleString()}`, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Approved', value: stats?.approvedCampaigns ?? 0, icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
            { label: 'Pending Review', value: stats?.pendingCampaigns ?? 0, icon: Clock, color: 'bg-amber-50 text-amber-600' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-1">{card.label}</p>
                <p className="text-[28px] font-bold text-[#0f172a] leading-none">{card.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Recent Campaigns */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-[18px] font-bold text-[#0f172a]">Recent Campaigns</h3>
            <Link href="/dashboard/my-campaigns" className="text-sm font-bold text-[#4f46e5] hover:text-indigo-700 flex items-center transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          {myCampaigns.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">No campaigns yet. <Link href="/dashboard/create" className="text-indigo-600 font-bold">Create one!</Link></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-100 text-[11px] text-gray-500 uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-6 py-4">Campaign</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Raised</th>
                    <th className="px-6 py-4 text-right">Goal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {myCampaigns.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={c.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.title)}&background=e0e7ff&color=4f46e5`} alt={c.title} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-bold text-[#0f172a] text-[13px]">{c.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${c.status === 'Approved' ? 'bg-green-100 text-green-700' : c.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-[#0f172a] text-[13px]">${(c.raised || 0).toLocaleString()}</td>
                      <td className="px-6 py-4 text-right text-gray-500 text-[13px]">${(c.targetAmount || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.section>
    );
  }

  // ── SUPPORTER DASHBOARD ───────────────────────────────────────
  return (
    <motion.section className="max-w-6xl w-full" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0f172a] mb-1 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-[15px] text-gray-500">Here is an overview of your recent impact and active contributions.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="absolute top-6 right-6 w-10 h-10 rounded-lg bg-[#d1fae5] flex items-center justify-center text-[#0f766e] z-10">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-4 relative z-10">Total Contributions</p>
          <p className="text-[40px] font-bold text-[#0f172a] leading-none mb-3 relative z-10 tracking-tight">{stats?.totalContributions ?? 0}</p>
          <div className="flex items-center text-xs font-semibold text-emerald-600 relative z-10">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>{stats?.projectsSupported ?? 0} projects supported</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="absolute top-6 right-6 w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center text-[#d97706] z-10">
            <Hourglass className="w-5 h-5" />
          </div>
          <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-4 relative z-10">Total Contributed</p>
          <p className="text-[40px] font-bold text-[#0f172a] leading-none mb-3 relative z-10 tracking-tight">{(stats?.totalContributed ?? 0).toLocaleString()}</p>
          <p className="text-xs text-gray-500 relative z-10 font-medium">Credits deployed</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="absolute top-6 right-6 w-10 h-10 rounded-lg bg-[#e0e7ff] flex items-center justify-center text-[#4f46e5] z-10">
            <WalletCards className="w-5 h-5" />
          </div>
          <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-4 relative z-10">Available Credits</p>
          <div className="flex items-baseline mb-3 relative z-10">
            <p className="text-[40px] font-bold text-[#0f172a] leading-none tracking-tight">{(stats?.credits ?? user?.credits ?? 0).toLocaleString()}</p>
            <span className="text-lg font-bold text-gray-400 ml-2">CR</span>
          </div>
          <p className="text-xs text-gray-500 relative z-10 font-medium">Ready to deploy</p>
        </div>
      </motion.div>

      {/* Recent Contributions Table */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-[18px] font-bold text-[#0f172a] tracking-tight">Recent Contributions</h3>
          <Link href="/dashboard/contributions" className="text-sm font-bold text-[#4f46e5] hover:text-indigo-700 flex items-center transition-colors">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        {contributions.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            No contributions yet. <Link href="/campaigns" className="text-indigo-600 font-bold">Explore campaigns!</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-gray-500 font-bold uppercase tracking-widest bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold">Campaign</th>
                  <th className="px-6 py-4 font-bold">Amount (Credits)</th>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contributions.map((item, idx) => (
                  <tr key={item._id || idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-800 text-[13px]">Campaign #{item.campaignId?.toString().slice(-6)}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#0f172a] text-[13px]">{(item.amount || 0).toLocaleString()} CR</td>
                    <td className="px-6 py-4 text-gray-500 text-[13px]">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#d1fae5] text-[#059669] border border-[#a7f3d0]">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {item.status || 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}
