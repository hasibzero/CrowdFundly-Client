"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ArrowRight, DollarSign, Rocket, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { API_URL } from '@/lib/api';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({ totalFunded: 0, activeCampaigns: 0, supporters: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHome = async () => {
      try {
        const [campaignsResponse, statsResponse] = await Promise.all([
          axios.get(`${API_URL}/api/campaigns`),
          axios.get(`${API_URL}/api/platform/stats`),
        ]);
        // Sort campaigns by amount raised descending, then take top 3
        const sortedCampaigns = [...campaignsResponse.data].sort((a, b) => (b.raised || 0) - (a.raised || 0));
        setCampaigns(sortedCampaigns.slice(0, 3));
        setStats(statsResponse.data);
      } finally {
        setLoading(false);
      }
    };
    loadHome();
  }, []);

  return <div className="min-h-screen bg-[#F8FAFC] text-zinc-900">
    <Navbar />
    <section className="relative flex min-h-[540px] items-end justify-center overflow-hidden bg-zinc-900 px-6 pb-20 pt-32 text-center">
      <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2070" className="absolute inset-0 h-full w-full object-cover opacity-55" alt="People collaborating" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#202738] via-[#202738]/60 to-[#202738]/20" />
      <div className="relative z-10 max-w-3xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">Crowdfundly</p>
        <h1 className="mb-5 font-serif text-4xl font-bold text-white md:text-6xl">Back ideas that move communities forward.</h1>
        <p className="mb-9 text-base leading-relaxed text-zinc-200 md:text-lg">Discover approved projects, support creators with secure credit contributions, and follow the impact you help make.</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row"><Link href="/campaigns" className="rounded-full bg-[#12643E] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0e4f31]">Explore campaigns</Link><Link href="/register" className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#12643E] transition-colors hover:bg-zinc-100">Create an account</Link></div>
      </div>
    </section>
    <section className="border-b border-zinc-100 bg-white py-14"><div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 text-center md:grid-cols-3"><Metric value={currency.format(stats.totalFunded)} label="Total funded" /><Metric value={stats.activeCampaigns.toLocaleString()} label="Active campaigns" /><Metric value={stats.supporters.toLocaleString()} label="Supporters" /></div></section>
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-[#0f172a]">How Crowdfundly Works</h2>
        <p className="mt-2 text-sm text-gray-500">Three simple steps to bring ideas to life.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Step 
          icon={<Search className="w-6 h-6 text-indigo-500" />} 
          title="1. Discover" 
          text="Explore thousands of verified campaigns across diverse categories that match your interests." 
          iconBg="bg-indigo-50"
        />
        <Step 
          icon={<DollarSign className="w-6 h-6 text-emerald-500" />} 
          title="2. Contribute" 
          text="Back projects securely. Choose reward tiers or simply donate to fuel their passion." 
          iconBg="bg-emerald-50"
        />
        <Step 
          icon={<Rocket className="w-6 h-6 text-orange-400" />} 
          title="3. Impact" 
          text="Watch ideas become reality. Get updates directly from creators and see your impact grow." 
          iconBg="bg-orange-50"
        />
      </div>
    </section>
    
    <section className="border-y border-zinc-200/60 bg-[#EEF2F6] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#0f172a]">Top Funded Campaigns</h2>
            <p className="mt-1 text-sm text-zinc-500">Projects currently leading the charge on Crowdfundly.</p>
          </div>
          <Link href="/campaigns" className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {loading ? (
          <div className="py-12 text-center text-sm text-zinc-500">Loading campaigns…</div>
        ) : campaigns.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center text-sm text-zinc-500">No campaigns found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {campaigns.map((campaign) => <CampaignCard key={campaign._id} campaign={campaign} />)}
          </div>
        )}
      </div>
    </section>

    {/* Removed Hardcoded Community Voices Section as requested */}

    {/* Footer */}
    <footer className="bg-[#f8fafc] border-t border-gray-200 pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-[#12643E] mb-4">Crowdfundly</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Empowering creators and supporters to build a better future together through transparent, community-driven funding.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/campaigns" className="hover:text-[#12643E]">All Campaigns</Link></li>
              <li><Link href="/campaigns" className="hover:text-[#12643E]">Technology</Link></li>
              <li><Link href="/campaigns" className="hover:text-[#12643E]">Art & Design</Link></li>
              <li><Link href="/campaigns" className="hover:text-[#12643E]">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-[#12643E]">How it Works</Link></li>
              <li><Link href="#" className="hover:text-[#12643E]">Pricing</Link></li>
              <li><Link href="#" className="hover:text-[#12643E]">Help Center</Link></li>
              <li><Link href="#" className="hover:text-[#12643E]">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-[#12643E]">LinkedIn</Link></li>
              <li><Link href="#" className="hover:text-[#12643E]">Facebook</Link></li>
              <li><Link href="#" className="hover:text-[#12643E]">GitHub</Link></li>
              <li><Link href="#" className="hover:text-[#12643E]">Twitter</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 Crowdfundly. Built for creators.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  </div>;
}

function Metric({ value, label }) { return <div><p className="font-serif text-4xl font-bold text-[#12643E]">{value}</p><p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p></div>; }
function Step({ icon, title, text, iconBg }) { 
  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow">
      <div className={`mb-5 rounded-full p-4 ${iconBg}`}>{icon}</div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-3 text-[14px] leading-relaxed text-gray-500">{text}</p>
    </div>
  ); 
}

function TestimonialCard({ quote, name, role, image }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        <div className="text-orange-400 font-serif text-5xl leading-none h-6 mb-4">"</div>
        <p className="text-[15px] italic text-gray-600 leading-relaxed mb-8">
          {quote}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <h4 className="text-[13px] font-bold text-gray-900">{name}</h4>
          <p className="text-[12px] text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
function CampaignCard({ campaign }) {
  const percent = campaign.targetAmount ? Math.min(Math.round(((campaign.raised || 0) / campaign.targetAmount) * 100), 100) : 0;
  const end = new Date(new Date(campaign.createdAt).getTime() + campaign.duration * 86400000);
  const days = Math.max(Math.ceil((end - new Date()) / 86400000), 0);
  return <Link href={`/campaigns/${campaign._id}`} className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md"><div className="h-44 bg-zinc-100">{campaign.coverImage ? <img src={campaign.coverImage} alt={campaign.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-zinc-400">No campaign image</div>}</div><div className="p-5"><span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">{campaign.category}</span><h3 className="mt-3 truncate font-serif text-lg font-bold group-hover:text-[#12643E]">{campaign.title}</h3><p className="mt-2 line-clamp-2 min-h-10 text-sm text-zinc-500">{campaign.shortDescription || campaign.story}</p><div className="mt-5 flex justify-between text-sm"><span className="font-bold text-[#12643E]">{percent}% funded</span><span className="text-zinc-500">{days} days left</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-[#12643E]" style={{ width: `${percent}%` }} /></div><p className="mt-2 text-sm text-zinc-600"><strong>{currency.format(campaign.raised || 0)}</strong> of {currency.format(campaign.targetAmount || 0)}</p></div></Link>;
}
