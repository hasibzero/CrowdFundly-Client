"use client";
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Search, Filter, ChevronDown, CheckCircle2, User, Rocket, MapPin } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { API_URL } from '@/lib/api';

export default function ExploreCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPledge, setSelectedPledge] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Trending');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchApprovedCampaigns = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/campaigns`);
        setCampaigns(response.data);
        setFilteredCampaigns(response.data);
      } catch (error) {
        console.error("Failed to fetch campaigns", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedCampaigns();
  }, []);

  useEffect(() => {
    let result = campaigns;

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) || 
        (c.shortDescription && c.shortDescription.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(c => c.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 3. Status Filter
    if (selectedStatus !== 'All') {
      result = result.filter(c => {
        const truePercent = calculateTruePercent(c.raised, c.targetAmount);
        const daysLeft = getDaysLeft(c.createdAt, c.duration);
        if (selectedStatus === 'Active') return truePercent < 100 && daysLeft > 0;
        if (selectedStatus === 'Ending Soon') return daysLeft <= 5 && daysLeft > 0 && truePercent < 100;
        if (selectedStatus === 'Fully Funded') return truePercent >= 100;
        return true;
      });
    }

    // 4. Pledge Amount Filter (Based on min reward available)
    if (selectedPledge !== 'All') {
      result = result.filter(c => {
        if (!c.rewards || c.rewards.length === 0) return true; // If no rewards data, don't filter them out to be safe
        const minReward = Math.min(...c.rewards.map(r => r.amount));
        if (selectedPledge === 'Under $50') return minReward < 50;
        if (selectedPledge === '$50 - $100') return minReward >= 50 && minReward <= 100;
        if (selectedPledge === '$100 - $500') return minReward >= 100 && minReward <= 500;
        if (selectedPledge === '$500+') return minReward > 500;
        return true;
      });
    }

    // 5. Sort Logic
    if (selectedSort === 'Trending') {
      // Dummy trending logic: random or by raised amount. Let's just do by most raised for now as a proxy.
      result.sort((a, b) => b.raised - a.raised);
    } else if (selectedSort === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (selectedSort === 'Most Funded') {
      result.sort((a, b) => {
        const percentA = calculateTruePercent(a.raised, a.targetAmount);
        const percentB = calculateTruePercent(b.raised, b.targetAmount);
        return percentB - percentA;
      });
    } else if (selectedSort === 'Ending Soon') {
      result.sort((a, b) => {
        const daysA = getDaysLeft(a.createdAt, a.duration);
        const daysB = getDaysLeft(b.createdAt, b.duration);
        // Put completed ones at the bottom
        if (daysA === 0) return 1;
        if (daysB === 0) return -1;
        return daysA - daysB;
      });
    }

    setFilteredCampaigns([...result]);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, selectedCategory, selectedStatus, selectedSort, selectedPledge, campaigns]);

  const calculateProgress = (raised, target) => {
    if (!target) return 0;
    return Math.min(Math.round((raised / target) * 100), 100);
  };

  const calculateTruePercent = (raised, target) => {
    if (!target) return 0;
    return Math.round((raised / target) * 100);
  };

  const getDaysLeft = (createdAt, duration) => {
    if (!createdAt || !duration) return 30;
    const start = new Date(createdAt);
    const end = new Date(start.getTime() + duration * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diff = end - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const getCategoryColor = (category) => {
    const cat = category?.toLowerCase();
    if (cat === 'technology') return 'bg-[#e0e7ff] text-[#4f46e5]';
    if (cat === 'environment' || cat === 'community') return 'bg-[#ffedd5] text-[#ea580c]';
    if (cat === 'design' || cat === 'art') return 'bg-[#f3e8ff] text-[#9333ea]';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 mt-8">
          <h1 className="text-[36px] md:text-[42px] font-extrabold text-[#0f172a] mb-4 tracking-tight">
            Explore Projects
          </h1>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Discover ambitious ideas, support visionary creators, and be part of the momentum building tomorrow's innovations in technology, sustainability, and design.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white p-2 md:p-3 rounded-lg shadow-[0_2px_15px_rgb(0,0,0,0.04)] border border-gray-200 mb-12 flex flex-col md:flex-row items-center gap-3 w-full">
          
          <div className="flex-1 flex items-center px-4 py-2 w-full">
            <Search className="w-4 h-4 text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-[14px] text-gray-800 placeholder-gray-400"
            />
          </div>

          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex w-full md:w-auto items-center gap-3 flex-wrap md:flex-nowrap px-2">
            <div className="relative flex-1 md:flex-none">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full bg-gray-50 border border-gray-200 px-4 py-2 pr-10 rounded-md text-[13px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {['Technology', 'Art', 'Community', 'Design', 'Film', 'Games', 'Food'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative flex-1 md:flex-none">
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none w-full bg-gray-50 border border-gray-200 px-4 py-2 pr-10 rounded-md text-[13px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors outline-none cursor-pointer"
              >
                {['All', 'Active', 'Ending Soon', 'Fully Funded'].map(status => (
                  <option key={status} value={status}>{status === 'All' ? 'Any Status' : status}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative flex-1 md:flex-none">
              <select 
                value={selectedSort} 
                onChange={(e) => setSelectedSort(e.target.value)}
                className="appearance-none w-full bg-gray-50 border border-gray-200 px-4 py-2 pr-10 rounded-md text-[13px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors outline-none cursor-pointer"
              >
                <option value="Trending">Trending</option>
                <option value="Newest">Newest</option>
                <option value="Most Funded">Most Funded</option>
                <option value="Ending Soon">Ending Soon</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Removed Sidebar as per request */}

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#12643E]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-20 text-gray-500 font-medium col-span-1 md:col-span-2">
                No campaigns match your filters. Try adjusting them!
              </div>
            ) : (
              filteredCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((campaign, index) => {
                const truePercent = calculateTruePercent(campaign.raised, campaign.targetAmount);
                const progressWidth = calculateProgress(campaign.raised, campaign.targetAmount);
                const daysLeft = getDaysLeft(campaign.createdAt, campaign.duration);
                const isOverFunded = truePercent >= 100;

                return (
                  <motion.div 
                    key={campaign._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] duration-300"
                  >
                    {/* Cover Image */}
                    <div className="relative h-48 w-full bg-gray-100">
                      <img 
                        src={campaign.coverImage} 
                        alt={campaign.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-[#f3e8ff] text-[#7e22ce] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center shadow-sm">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${getCategoryColor(campaign.category)}`}>
                            {campaign.category}
                          </span>
                          {(campaign.subCategory) && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-[#f1f5f9] text-[#475569]">
                              {campaign.subCategory}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="text-[11px] font-medium">{campaign.location || 'Global'}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-[20px] font-bold text-[#0f172a] mb-2 leading-tight line-clamp-1">
                        {campaign.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <div className="w-5 h-5 rounded-full bg-[#e0e7ff] text-[#4f46e5] flex items-center justify-center text-[9px] font-bold mr-2">
                          {campaign.creatorInitials || campaign.creatorName?.substring(0, 2).toUpperCase() || 'NA'}
                        </div>
                        <span className="text-[12px] font-medium">{campaign.creatorName}</span>
                      </div>

                      <p className="text-[14px] text-gray-600 mb-6 line-clamp-2 leading-relaxed flex-1">
                        {campaign.shortDescription || campaign.story}
                      </p>

                      {/* Progress Stats */}
                      <div className="mb-5">
                        <div className="flex justify-between items-end mb-2">
                          <span className={`text-[12px] font-bold ${isOverFunded ? 'text-[#059669]' : 'text-[#12643E]'}`}>
                            {truePercent}% Funded
                          </span>
                          <span className="text-[12px] font-semibold text-gray-500">
                            {(campaign.backers || 0).toLocaleString()} backers
                          </span>
                        </div>
                        
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${isOverFunded ? 'bg-[#059669]' : 'bg-[#12643E]'}`}
                            style={{ width: `${progressWidth}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-end mt-2">
                          <div className="text-[12px] text-gray-600 font-medium">
                            <span className="font-bold text-gray-900">{(campaign.raised || 0).toLocaleString()}</span> credits raised
                          </div>
                          <div className="text-[12px] text-gray-600 font-medium">
                            {daysLeft} Days Left
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link href={`/campaigns/${campaign._id}`} className="w-full flex justify-center items-center py-2 border border-indigo-200 text-indigo-600 rounded-md text-[13px] font-bold hover:bg-indigo-50 transition-colors">
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                );
              })
            )}
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && filteredCampaigns.length > itemsPerPage && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[13px] text-gray-500 font-medium">
                  Showing {Math.min(filteredCampaigns.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(filteredCampaigns.length, currentPage * itemsPerPage)} of {filteredCampaigns.length} projects
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md text-[13px] font-bold hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredCampaigns.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredCampaigns.length / itemsPerPage)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md text-[13px] font-bold hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#f1f3f9] pt-16 pb-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-6 h-6 text-[#12643E]" />
                <span className="text-xl font-extrabold text-[#12643E] tracking-tight">
                  Crowdfundly
                </span>
              </div>
              <p className="text-[13px] text-gray-500 max-w-[20rem] mt-16">
                © 2024 Crowdfundly. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="text-[14px] font-bold text-gray-900 mb-4">Categories</h4>
              <ul className="space-y-3 text-[13px] font-medium text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Technology</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Art</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Film</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-bold text-gray-900 mb-4 invisible">Space</h4>
              <ul className="space-y-3 text-[13px] font-medium text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Games</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Design</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-3 text-[13px] font-medium text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Help Center</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
