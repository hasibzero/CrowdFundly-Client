"use client";
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, CheckCircle2, ArrowRight, Hourglass } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function ExploreCampaignsPage() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const categories = ["All Projects", "Technology", "Art & Design", "Community", "Environment", "Health & Wellness", "Games"];
  const sortOptions = ["Trending", "Funding Goal (High-Low)", "Most Funded"];

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Projects');
  const [sort, setSort] = useState('Trending');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/campaigns`);
        setCampaigns(response.data);
      } catch (error) {
        console.error("Failed to load campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Client-side filtering & sorting
  const filtered = useMemo(() => {
    let result = [...campaigns];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.title?.toLowerCase().includes(q) ||
        c.shortDescription?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q) ||
        c.creatorName?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category && category !== 'All Projects') {
      result = result.filter(c => c.category === category);
    }

    // Sort
    if (sort === 'Funding Goal (High-Low)') {
      result.sort((a, b) => (b.targetAmount || 0) - (a.targetAmount || 0));
    } else if (sort === 'Most Funded') {
      result.sort((a, b) => (b.raised || 0) - (a.raised || 0));
    }

    return result;
  }, [campaigns, search, category, sort]);

  return (
    <>
    <motion.section 
      className="w-full max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
          <input 
            type="text" 
            placeholder="Search campaigns by title, category or creator..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisibleCount(6); }}
            style={{ color: '#111827', backgroundColor: '#ffffff' }}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#0f766e] text-[15px] font-medium placeholder-gray-400 shadow-sm"
          />
        </div>
        <div className="bg-[#a7f3d0] text-[#047857] px-5 py-3.5 rounded-xl font-bold text-sm shadow-sm whitespace-nowrap flex-shrink-0 text-center">
          {user?.credits?.toLocaleString() ?? 0} USD
        </div>
      </div>

      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-[32px] md:text-4xl font-bold text-[#0f172a] mb-2 tracking-tight">
            Explore Campaigns
          </h1>
          <p className="text-[15px] text-gray-600 max-w-2xl">
            Discover innovative projects and ambitious creators looking for support to launch their next big idea.
          </p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm min-w-[180px] hover:bg-gray-50 transition-colors"
          >
            <span>Sort by: {sort}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 ml-2 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showSortDropdown && (
            <div className="absolute right-0 mt-2 w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSort(opt); setShowSortDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${sort === opt ? 'font-bold text-[#0f766e]' : 'text-gray-700'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Categories Filter */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            onClick={() => { setCategory(cat); setVisibleCount(6); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors flex-shrink-0 ${
              category === cat 
                ? 'bg-[#3b2de6] text-white shadow-md' 
                : 'bg-[#e0e7ff] text-[#3b2de6] hover:bg-[#c7d2fe]'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Campaign Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {loading ? (
          <div className="col-span-3 text-center py-20 text-gray-400 font-medium">Loading campaigns...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-3 text-center py-20 text-gray-400 font-medium">No campaigns found matching your filters.</div>
        ) : (
          filtered.slice(0, visibleCount).map((camp) => {
            const raised = camp.raised || 0;
            const target = camp.targetAmount || 1;
            const percent = Math.min(Math.round((raised / target) * 100), 100);
            
            return (
            <div key={camp._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              
              {/* Image Container */}
              <div className="relative h-[220px] w-full overflow-hidden">
                <img src={camp.coverImage || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600"} alt={camp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {/* Days Left Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm flex items-center text-[#d97706] text-xs font-bold">
                  <Hourglass className="w-3.5 h-3.5 mr-1.5" />
                  {camp.deadline ? Math.max(0, Math.ceil((new Date(camp.deadline) - new Date()) / (1000 * 60 * 60 * 24))) + " Days Left" : "Ongoing"}
                </div>

                {/* Tag Badge */}
                <div className="absolute bottom-4 left-4 bg-indigo-50/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <span className="text-[#3b2de6] text-xs font-bold">{camp.category}</span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1">
                
                {/* Creator Info */}
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
                  <span className="font-medium">by {camp.creatorName || camp.creatorEmail}</span>
                </div>

                {/* Title & Description */}
                <h3 className="text-[20px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
                  {camp.title}
                </h3>
                <p className="text-gray-500 text-[14px] leading-relaxed mb-6 line-clamp-2 flex-1">
                  {camp.shortDescription || camp.description}
                </p>

                {/* Funding Stats */}
                <div className="mt-auto">
                  <div className="flex items-baseline mb-2">
                    <span className="text-[22px] font-bold text-[#059669] tracking-tight">{raised.toLocaleString()} USD</span>
                    <span className="text-xs text-gray-400 font-medium ml-2">raised of {target.toLocaleString()}</span>
                    <span className="text-[13px] font-bold text-gray-900 ml-auto">{percent}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-[#d1fae5] rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-[#059669] rounded-full" style={{ width: `${percent}%` }}></div>
                  </div>

                  {/* Action Button */}
                  <Link 
                    href={`/campaigns/${camp._id}`}
                    className="w-full py-3 px-4 border border-[#3b2de6] text-[#3b2de6] hover:bg-indigo-50 rounded-lg flex items-center justify-center text-sm font-bold transition-colors group-hover:bg-[#3b2de6] group-hover:text-white"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </div>
              </div>

            </div>
          )})
        )}
      </motion.div>
    </motion.section>
    
    {/* Load More Button */}
    {!loading && visibleCount < filtered.length && (
      <div className="mt-12 flex justify-center pb-12">
        <button 
          onClick={() => setVisibleCount(prev => prev + 6)}
          className="bg-[#3b2de6] hover:bg-[#2e23b2] text-white px-8 py-3 rounded-full text-sm font-bold transition-colors shadow-sm"
        >
          Load More Projects
        </button>
      </div>
    )}
    </>
  );
}
