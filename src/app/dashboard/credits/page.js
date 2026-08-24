"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Wallet, ShieldCheck, CheckCircle2, DollarSign, Banknote, Gem, Star, Circle, CheckCircle } from 'lucide-react';

export default function PurchaseCreditPage() {
  const [selectedPackage, setSelectedPackage] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');

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
      credits: 500,
      price: 50.00,
      icon: <DollarSign className="w-5 h-5 text-white" />,
      popular: false
    },
    {
      credits: 1000,
      price: 100.00,
      icon: <Banknote className="w-5 h-5 text-white" />,
      popular: true
    },
    {
      credits: 2500,
      price: 250.00,
      icon: <Gem className="w-5 h-5 text-white" />,
      popular: false
    },
    {
      credits: 5000,
      price: 500.00,
      icon: <Star className="w-5 h-5 text-white" />,
      popular: false
    }
  ];

  // Determine current active amount and price
  const activeCredits = customAmount ? parseInt(customAmount) : selectedPackage;
  const activePrice = activeCredits ? (activeCredits / 10).toFixed(2) : '0.00';

  const handlePackageSelect = (credits) => {
    setSelectedPackage(credits);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val) {
      setSelectedPackage(null); // Deselect packages if typing custom
    } else {
      setSelectedPackage(1000); // Default back to popular if cleared
    }
  };

  return (
    <motion.section 
      className="w-full max-w-6xl mx-auto pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">
            Purchase Credit
          </h1>
          <p className="text-[14px] text-gray-500">
            Top up your balance to back the next big idea.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center min-w-[250px]">
          <div className="w-12 h-12 rounded-full bg-[#e6f7ef] flex items-center justify-center mr-4">
            <Wallet className="w-6 h-6 text-[#12643E]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Current Balance</p>
            <p className="text-[20px] font-bold text-[#0f172a] leading-none">
              1,250 <span className="text-[#2ea673] font-medium text-[16px]">Credits</span>
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Packages */}
        <motion.div variants={itemVariants} className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
            <h2 className="text-[20px] font-bold text-[#0f172a] mb-1">Select a Package</h2>
            <p className="text-[13px] text-gray-500 mb-6">Exchange rate: $1 = 10 Credits.</p>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {packages.map((pkg) => {
                const isSelected = selectedPackage === pkg.credits;
                return (
                  <div 
                    key={pkg.credits}
                    onClick={() => handlePackageSelect(pkg.credits)}
                    className={`relative rounded-xl border-2 p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-[#12643E] bg-[#f4fbf8]' 
                        : 'border-gray-100 bg-white hover:border-[#12643E]/30'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 left-3">
                        <CheckCircle2 className="w-5 h-5 text-[#12643E]" />
                      </div>
                    )}
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-[#5a4add] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        Popular
                      </div>
                    )}

                    <div className="w-10 h-10 rounded-full bg-[#12643E] flex items-center justify-center mb-4">
                      {pkg.icon}
                    </div>
                    <div className="text-[20px] font-bold text-[#0f172a] mb-1">
                      {pkg.credits.toLocaleString()} Credits
                    </div>
                    <div className="text-[13px] font-medium text-gray-500">
                      ${pkg.price.toFixed(2)} USD
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-[11px] font-bold uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* Custom Amount */}
            <div className="mt-2">
              <label className="block text-[12px] font-bold text-[#0f172a] mb-2">Custom Amount (Credits)</label>
              <div className="relative">
                <Circle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="number"
                  value={customAmount}
                  onChange={handleCustomChange}
                  placeholder="e.g. 1500"
                  className="w-full pl-11 pr-24 py-3 bg-[#f8fafc] border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#12643E] focus:ring-1 focus:ring-[#12643E] transition-colors"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[13px] font-medium text-gray-500">
                  ~ ${customAmount ? (parseInt(customAmount) / 10).toFixed(2) : '0.00'}
                </div>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">Minimum purchase: 100 Credits ($10.00)</p>
            </div>

          </div>
        </motion.div>

        {/* Right Column: Payment Details */}
        <motion.div variants={itemVariants} className="w-full lg:w-[400px]">
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
            <h2 className="text-[20px] font-bold text-[#0f172a] mb-6">Payment Details</h2>

            {/* Summary Box */}
            <div className="bg-[#f8f9fc] rounded-lg p-5 mb-8 border border-gray-100">
              <div className="flex justify-between items-center mb-3 text-[13px]">
                <span className="text-gray-500 font-medium">Credits to Buy</span>
                <span className="font-bold text-[#0f172a]">{activeCredits ? activeCredits.toLocaleString() : '0'}</span>
              </div>
              <div className="flex justify-between items-center mb-5 text-[13px]">
                <span className="text-gray-500 font-medium">Rate</span>
                <span className="font-bold text-[#0f172a]">10 / $1</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between items-end">
                <span className="font-bold text-[#0f172a] text-[15px]">Total Cost</span>
                <span className="text-[24px] font-bold text-[#12643E] leading-none">${activePrice}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="text-[12px] font-bold text-[#0f172a] mb-3">Select Payment Method</h3>
              
              <div className="space-y-3">
                {/* Stripe Only as requested */}
                <div className="flex items-center p-4 border-2 border-[#12643E] rounded-lg bg-[#f4fbf8] cursor-pointer">
                  <CheckCircle className="w-4 h-4 text-[#3b2de6] mr-3" />
                  <Landmark className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-[14px] font-medium text-[#0f172a]">Stripe Checkout</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <button 
              disabled={!activeCredits || activeCredits < 100}
              className={`w-full py-3.5 rounded-lg font-bold text-[15px] flex items-center justify-center transition-colors shadow-sm ${
                (!activeCredits || activeCredits < 100)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#12643E] hover:bg-[#0e4f31] text-white'
              }`}
            >
              <Lock className="w-4 h-4 mr-2" />
              Pay ${activePrice}
            </button>

            <div className="mt-4 flex items-center justify-center text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              <span className="text-[11px]">Secure SSL Encrypted Transaction</span>
            </div>

          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}

// Re-using Landmark for Stripe icon for simplicity as it resembles a bank building, 
// though lucide doesn't have a Stripe logo.
import { Landmark } from 'lucide-react';
