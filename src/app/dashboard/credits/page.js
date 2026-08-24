"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard } from 'lucide-react';

export default function PurchaseCreditPage() {
  const [selectedPackage, setSelectedPackage] = useState('mini');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const packages = [
    {
      id: 'mini',
      name: 'Mini',
      credits: 100,
      price: 10.00,
      badgeColor: 'bg-[#e0e7ff] text-[#3b2de6]',
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard',
      credits: 300,
      price: 25.00,
      badgeColor: 'bg-[#ede9fe] text-[#7c3aed]',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      credits: 800,
      price: 60.00,
      badgeColor: 'bg-[#e0e7ff] text-[#3b2de6]',
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite',
      credits: 1500,
      price: 110.00,
      badgeColor: 'bg-[#ffedd5] text-[#ea580c]',
      popular: false
    }
  ];

  const currentPackage = packages.find(p => p.id === selectedPackage);

  return (
    <motion.section 
      className="w-full max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-10">
        <h1 className="text-3xl md:text-[32px] font-bold text-[#0f172a] mb-2 tracking-tight">
          Fuel Your Portfolio
        </h1>
        <p className="text-[15px] text-gray-600 max-w-2xl">
          Select a credit package to start backing high-potential campaigns securely.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column: Select Package */}
        <motion.div variants={itemVariants} className="flex-1">
          <h2 className="text-xl font-bold text-[#0f172a] mb-6">Select Package</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {packages.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              
              return (
                <div 
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-[#0f766e] bg-[#f8fafc] shadow-sm' 
                      : 'border-gray-200 bg-white hover:border-[#0f766e]/30'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-4 transform -translate-y-1/2">
                      <span className="bg-[#5a4add] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-sm">
                        POPULAR
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${pkg.badgeColor}`}>
                      {pkg.name}
                    </span>
                  </div>

                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-[#0f172a] tracking-tight mr-2">{pkg.credits}</span>
                    <span className="text-sm font-medium text-gray-500">credits</span>
                  </div>

                  <div className="text-[15px] font-bold text-[#0f766e]">
                    ${pkg.price.toFixed(2)} USD
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Payment Details */}
        <motion.div variants={itemVariants} className="w-full lg:w-[400px]">
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#0f172a] mb-1">Payment Details</h2>
              <div className="flex items-center text-xs text-gray-500 font-medium">
                <Lock className="w-3.5 h-3.5 mr-1.5" />
                Secure Stripe Payment
              </div>
            </div>

            {/* Selected Package Summary Box */}
            <div className="bg-[#eef2f6] rounded-xl p-5 mb-8 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Total Due</p>
                <p className="text-2xl font-bold text-[#0f172a] tracking-tight">${currentPackage.price.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Package</p>
                <p className="text-sm font-bold text-[#0f766e]">{currentPackage.name} ({currentPackage.credits} Credits)</p>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1.5">Name on Card</label>
                <input 
                  type="text" 
                  placeholder="Jane Doe" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-sm text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1.5">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000" 
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-sm text-gray-900 placeholder-gray-400 tracking-wide"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1.5">Expiry</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1.5">CVC</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              <button className="w-full bg-[#12643E] hover:bg-[#0e4f31] text-white py-3.5 rounded-lg font-bold text-sm flex items-center justify-center transition-colors mt-4">
                <Lock className="w-4 h-4 mr-2" />
                Pay Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
