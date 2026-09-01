'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, MessageSquare, Sparkles, Shield, ArrowRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PricingCalculatorProps {
  phone: string;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ phone }) => {
  const [platform, setPlatform] = useState<'web' | 'apk' | 'playstore' | 'dual'>('web');
  const [websiteType, setWebsiteType] = useState<'starter' | 'business' | 'ecommerce'>('business');
  const [includeSeo, setIncludeSeo] = useState(true);
  const [includeMaintenance, setIncludeMaintenance] = useState(true);
  const [includeDomain, setIncludeDomain] = useState(true);

  let basePrice = 0;
  let platformLabel = '';

  if (platform === 'web') {
    if (websiteType === 'starter') {
      basePrice = 14999;
      platformLabel = 'Starter Website (5 Pages)';
    } else if (websiteType === 'business') {
      basePrice = 19999;
      platformLabel = 'Business / Coaching Enterprise (10 Pages)';
    } else {
      basePrice = 24999;
      platformLabel = 'E-Commerce & WhatsApp Store';
    }
  } else if (platform === 'apk') {
    basePrice = 14999;
    platformLabel = 'Direct Installable Android APK';
  } else if (platform === 'playstore') {
    basePrice = 24999;
    platformLabel = 'Google Play Store Official App';
  } else {
    basePrice = 44999;
    platformLabel = 'Android + iOS Dual Cross-Platform App';
  }

  let addOnPrice = 0;
  if (includeSeo && platform === 'web') addOnPrice += 2000;
  if (includeMaintenance) addOnPrice += 0;
  if (includeDomain && platform === 'web') addOnPrice += 1500;

  const totalPrice = basePrice + addOnPrice;

  const handleGenerateQuote = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff007f', '#00f5c8', '#a855f7', '#f59e0b'],
    });

    const text = encodeURIComponent(
      `Hello Tarun! I calculated my project estimate on your 3D Portfolio:\n` +
      `• Selected Architecture: ${platformLabel}\n` +
      `• Google SEO Schema: ${includeSeo ? 'Yes' : 'No'}\n` +
      `• Domain & SSL Setup: ${includeDomain ? 'Yes' : 'No'}\n` +
      `• 30-Day Support Guarantee: Yes\n` +
      `• Estimated Total: ₹${totalPrice.toLocaleString('en-IN')}\n\n` +
      `Can we schedule a quick call to kick off development?`
    );

    window.open(`https://wa.me/919079368240?text=${text}`, '_blank');
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#1c0836]/90 via-[#0f0322]/95 to-[#150529]/95 border-2 border-purple-500/40 p-6 sm:p-10 shadow-[0_0_80px_rgba(168,85,247,0.2)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-pink-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span>Interactive Cost Architect</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-syne font-black text-white">
            Build Your Custom Package
          </h3>
        </div>

        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/40 text-pink-300 font-mono text-xs self-start md:self-auto font-bold shadow-sm">
          100% Real • Zero Hidden Costs
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Platform Type */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-3 font-bold">
              1. Choose Target Platform & Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'web', label: 'Website', sub: 'Responsive Web' },
                { id: 'apk', label: 'Android APK', sub: 'Direct Install' },
                { id: 'playstore', label: 'Play Store', sub: 'Google Store' },
                { id: 'dual', label: 'Dual App', sub: 'Android + iOS' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlatform(item.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                    platform === item.id
                      ? 'bg-gradient-to-br from-pink-500/30 to-purple-600/30 border-pink-500 text-white shadow-[0_0_20px_rgba(255,0,127,0.3)] scale-105'
                      : 'bg-[#0e021a]/80 border-purple-500/20 text-white/60 hover:text-white hover:border-purple-400/40'
                  }`}
                >
                  <span className="block text-xs sm:text-sm font-syne font-bold">{item.label}</span>
                  <span className="block text-[10px] font-mono text-cyan-300 mt-0.5">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Website Type (if Web selected) */}
          {platform === 'web' && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-3 font-bold">
                2. Select Website Complexity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'starter', label: 'Starter', price: '₹14,999', desc: '5 Pages • Personal / Clinic' },
                  { id: 'business', label: 'Business & Coaching', price: '₹19,999', desc: '10 Pages • SEO & Leads' },
                  { id: 'ecommerce', label: 'E-Commerce Store', price: '₹24,999', desc: 'Catalog + WhatsApp Pay' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setWebsiteType(tier.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      websiteType === tier.id
                        ? 'bg-gradient-to-br from-pink-500/30 to-purple-600/30 border-pink-500 text-white shadow-md'
                        : 'bg-[#0e021a]/80 border-purple-500/20 text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="block text-sm font-syne font-bold">{tier.label}</span>
                    <span className="block text-xs font-mono text-pink-400 font-bold mt-0.5">{tier.price}</span>
                    <span className="block text-[11px] text-white/60 mt-1">{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Add-Ons */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-3 font-bold">
              3. Ecosystem & Performance Enhancements
            </label>
            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0e021a]/80 border border-purple-500/20 cursor-pointer hover:border-pink-500/40 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeSeo}
                    onChange={(e) => setIncludeSeo(e.target.checked)}
                    className="w-4 h-4 rounded accent-pink-500"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-white block">
                      Google Top-Rank Local SEO & Schema.org Setup
                    </span>
                    <span className="text-[11px] text-white/60 block font-mono">
                      Rank #1 for your local coaching / business searches
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-pink-400 font-bold whitespace-nowrap">
                  {platform === 'web' ? '+₹2,000' : 'Included'}
                </span>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0e021a]/80 border border-purple-500/20 cursor-pointer hover:border-pink-500/40 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeDomain}
                    onChange={(e) => setIncludeDomain(e.target.checked)}
                    className="w-4 h-4 rounded accent-pink-500"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-white block">
                      Domain (.in / .com) + High Speed SSL CDN Setup
                    </span>
                    <span className="text-[11px] text-white/60 block font-mono">
                      Free setup, Cloudflare security shield & DNS binding
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold whitespace-nowrap">
                  {platform === 'web' ? '+₹1,500' : 'Included'}
                </span>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0e021a]/80 border border-purple-500/20 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeMaintenance}
                    readOnly
                    className="w-4 h-4 rounded accent-emerald-500"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-white block">
                      30 Days Free Dedicated Technical Support
                    </span>
                    <span className="text-[11px] text-white/60 block font-mono">
                      Full warranty on code, bugs, and direct founder assistance
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">FREE</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Box */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#240a45]/90 to-[#120324]/95 border-2 border-pink-500/50 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-black block mb-1">
              Estimated Total Investment
            </span>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl sm:text-5xl font-syne font-black text-white">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-mono text-white/60 font-bold">All-Inclusive</span>
            </div>

            <div className="space-y-2.5 border-t border-b border-white/10 py-4 my-4 text-xs font-mono text-white/80">
              <div className="flex justify-between">
                <span>Architecture Base:</span>
                <span className="text-white font-bold">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Add-ons & Setup:</span>
                <span className="text-white font-bold">₹{addOnPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Warranty & Support:</span>
                <span className="font-bold">30 Days Included</span>
              </div>
              <div className="flex justify-between text-cyan-300">
                <span>Estimated Turnaround:</span>
                <span className="font-bold">{platform === 'dual' ? '10-15 Days' : '5-7 Days'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/60 mb-6">
              <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Direct communication with Founder Tarun Singh</span>
            </div>
          </div>

          <button
            onClick={handleGenerateQuote}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white font-syne font-black text-sm tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,0,127,0.5)] hover:shadow-[0_0_45px_rgba(0,245,200,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Lock In Estimate on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
