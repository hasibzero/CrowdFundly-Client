"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Wallet, Banknote, TrendingUp, ArrowRight, Search, Bell, ChevronDown, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import ManualNotificationForm from '@/components/ManualNotificationForm';

import { API_URL } from '@/lib/api';
const API = API_URL;

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('crowdfundly_token');
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      axios.get(`${API}/api/dashboard/stats`, { headers }),
      axios.get(`${API}/api/admin/users`, { headers }),
      axios.get(`${API}/api/admin/campaigns`, { headers }),
    ]).then(([statsRes, usersRes, campRes]) => {
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setCampaigns(campRes.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const supporters = users.filter(u => u.role === 'Supporter').length;
  const creators = users.filter(u => u.role === 'Creator').length;
  const admins = users.filter(u => u.role === 'Admin').length;
  const totalUSD = users.reduce((s, u) => s + (u.credits || 0), 0);

  // Generate dynamic chart data based on campaign creation dates
  const generateChartData = () => {
    if (!campaigns.length) return [];
    
    // Create an object to count campaigns by month
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dataObj = {};
    months.forEach(m => dataObj[m] = 0);
    
    campaigns.forEach(c => {
      if (c.createdAt) {
        const d = new Date(c.createdAt);
        const month = months[d.getMonth()];
        dataObj[month] += 1;
      }
    });
    
    // Accumulate total campaigns over time for a growth chart
    let cumulative = 0;
    return months.map(name => {
      cumulative += dataObj[name];
      return { name, total: cumulative, new: dataObj[name] };
    });
  };

  const chartData = generateChartData();

  const pieData = [
    { name: 'Supporters', value: supporters, color: '#059669' },
    { name: 'Creators', value: creators, color: '#4f46e5' },
    { name: 'Admins', value: admins, color: '#d97706' },
  ].filter(d => d.value > 0);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="w-full">
      <motion.div className="max-w-7xl mx-auto w-full" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">Platform Overview</h1>
          <p className="text-[14px] text-gray-500">Current metrics and system health for Crowdfundly platform.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Supporters', value: loading ? '—' : supporters.toLocaleString(), icon: Users, iconBg: 'bg-[#d1fae5]', iconColor: 'text-[#059669]', badge: 'Live', badgeBg: 'bg-[#e6f7ef] text-[#059669]' },
            { label: 'Total Creators', value: loading ? '—' : creators.toLocaleString(), icon: Lightbulb, iconBg: 'bg-[#ede9fe]', iconColor: 'text-[#7c3aed]', badge: 'Live', badgeBg: 'bg-[#e6f7ef] text-[#059669]' },
            { label: 'Platform USD (CR)', value: loading ? '—' : totalUSD.toLocaleString(), icon: Wallet, iconBg: 'bg-[#ffedd5]', iconColor: 'text-[#ea580c]', badge: 'Live', badgeBg: 'bg-[#fef3c7] text-[#d97706]' },
            { label: 'Pending Campaigns', value: loading ? '—' : (stats?.pendingCampaigns ?? 0), icon: Banknote, iconBg: 'bg-[#e6f7ef]', iconColor: 'text-[#12643E]', badge: 'Action', badgeBg: 'bg-[#fee2e2] text-[#dc2626]' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                  <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <div className={`flex items-center px-2 py-1 ${card.badgeBg} rounded-full text-[11px] font-bold`}>
                  <TrendingUp className="w-3 h-3 mr-1" />{card.badge}
                </div>
              </div>
              <p className="text-[12px] font-bold text-gray-500 mb-1 tracking-wide">{card.label}</p>
              <p className="text-[28px] font-bold text-[#0f172a] leading-none">{card.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recharts Line Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-bold text-[#0f172a]">Campaign Growth (Dynamic)</h3>
              <button className="flex items-center space-x-2 bg-[#f8fafc] px-3 py-1.5 rounded-full text-[12px] font-bold text-[#334155] border border-gray-200">
                <span>This Year</span><ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-full h-72 relative">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#12643E" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#12643E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontSize: '12px' }}
                      itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="total" name="Total Campaigns" stroke="#12643E" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Recharts Donut Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col">
            <h3 className="text-[14px] font-bold text-[#0f172a] mb-2">User Distribution</h3>
            {loading ? (
              <div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center mt-2">
                <div className="w-full h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend */}
                <div className="w-full space-y-2 mt-4">
                  {pieData.map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                        <span className="text-[12px] font-medium text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-[12px] font-bold text-[#0f172a]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {[
            { href: '/dashboard/admin/campaigns', label: 'Review Campaigns', desc: `${stats?.pendingCampaigns ?? 0} awaiting approval` },
            { href: '/dashboard/admin/withdrawals', label: 'Process Withdrawals', desc: `${stats?.totalWithdrawals ?? 0} pending requests` },
            { href: '/dashboard/admin/users', label: 'Manage Users', desc: `${users.length} total members` },
          ].map(link => (
            <Link key={link.href} href={link.href} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center group">
              <div>
                <p className="text-[14px] font-bold text-[#0f172a] mb-0.5">{link.label}</p>
                <p className="text-[12px] text-gray-400">{link.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#12643E] transition-colors" />
            </Link>
          ))}
        </motion.div>

        {/* Manual Notification Form */}
        <motion.div variants={itemVariants}>
          <ManualNotificationForm />
        </motion.div>
      </motion.div>
    </div>
  );
}
