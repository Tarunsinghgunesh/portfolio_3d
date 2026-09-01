'use client';

import React from 'react';
import { PricingPlan } from '@/types';
import { PricingCalculator } from '../ui/PricingCalculator';
import { Check, Sparkles, Shield, ArrowRight, Zap, Flame } from 'lucide-react';

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  phone: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ pricingPlans, phone }) => {
  return (
    <section id="pricing" className="relative py-12 sm:py-16 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="uppercase tracking-widest font-bold">100% Fixed & Real Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-syne font-black text-white leading-tight">
            Transparent Packages <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Tailored for Maximum ROI
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 font-sans">
            Every package comes with verified delivery timelines, complete code handover, and direct founder support.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#240a45] via-[#120324] to-[#1c0836] border-2 border-pink-500 shadow-[0_0_50px_rgba(255,0,127,0.25)] scale-[1.02]'
                  : 'bg-gradient-to-b from-[#16062a]/90 to-[#0e031c]/90 border border-purple-500/30 hover:border-pink-500/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-2xl shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider block mb-2">
                  {plan.category === 'web' ? 'Web Ecosystem' : plan.category === 'app' ? 'Mobile App' : 'Dual Flagship'}
                </span>

                <h3 className="text-2xl font-syne font-bold text-white mb-2">
                  {plan.name}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed mb-6 font-sans">
                  {plan.subtitle}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-syne font-black text-white">{plan.priceFormatted}</span>
                    <span className="text-xs font-mono text-white/50">/ one-time</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 mt-1 block font-bold">
                    ⚡ Turnaround: {plan.deliveryDays}
                  </span>
                </div>

                {/* Feature List */}
                <ul className="space-y-3 mb-8 text-xs font-mono text-white/80">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/919079368240?text=Hi%20Tarun,%20I%20am%20ready%20to%20start%20with%20the%20${encodeURIComponent(plan.name)}%20(${plan.priceFormatted})%20package.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-2xl font-syne font-black text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white shadow-lg hover:scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <span>Choose Package</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* ── Interactive Custom Estimator ── */}
        <PricingCalculator phone={phone} />
      </div>
    </section>
  );
};
