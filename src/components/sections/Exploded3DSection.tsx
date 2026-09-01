'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CyberCarCanvas } from '../3d/CyberCarCanvas';
import { Gauge, Flame, Cpu, Layers, ShieldCheck, Smartphone, Globe, Sparkles, Wind } from 'lucide-react';

export const Exploded3DSection: React.FC = () => {
  const racingEngineLayers = [
    {
      id: '01',
      title: 'Full-Stack Next.js 14 Cockpit',
      desc: 'Blazing fast React 19 / Next.js server components with zero layout shifts and instant page responsiveness.',
      icon: Globe,
      color: 'from-pink-500 to-rose-500',
      border: 'border-pink-500/40',
      text: 'text-pink-400',
    },
    {
      id: '02',
      title: 'Quantum Nitro Cloud Core',
      desc: 'Supabase PostgreSQL, Isar NoSQL, and Firebase authentication delivering sub-50ms query speeds.',
      icon: Flame,
      color: 'from-amber-500 to-yellow-500',
      border: 'border-amber-500/40',
      text: 'text-amber-400',
    },
    {
      id: '03',
      title: 'Flutter 60FPS Native Wheels',
      desc: 'Direct APK compilation, Riverpod state architecture, and offline-first database synchronization.',
      icon: Smartphone,
      color: 'from-cyan-400 to-teal-500',
      border: 'border-cyan-400/40',
      text: 'text-cyan-400',
    },
    {
      id: '04',
      title: 'Aerodynamic Downforce SEO',
      desc: 'Structured Google LocalBusiness & Person schemas guaranteeing #1 local search dominance.',
      icon: Wind,
      color: 'from-purple-500 to-indigo-500',
      border: 'border-purple-500/40',
      text: 'text-purple-400',
    },
  ];

  return (
    <section id="exploded" className="relative py-12 sm:py-16 overflow-hidden z-10">
      {/* Background colorful radial lighting */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono shadow-[0_0_20px_rgba(255,0,127,0.2)]">
            <Flame className="w-4 h-4 text-pink-400 fill-current animate-pulse" />
            <span className="uppercase tracking-widest font-bold">3D Cyber Racing & Mechanical Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-syne font-black text-white leading-tight">
            High-Speed Engineering & <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,0,127,0.4)]">
              Exploded Aerodynamics
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
            Scroll down or hit <strong>NITRO BOOST</strong> and adjust the explode slider below. Watch the cyber supercar tear down the neon speedway and expand into its underlying digital architecture.
          </p>
        </div>

        {/* 3D Cyber Car Interactive Canvas */}
        <div className="mb-16">
          <CyberCarCanvas scrollSync={true} />
        </div>

        {/* Architectural Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {racingEngineLayers.map((layer) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-3xl bg-gradient-to-b from-[#16062a]/90 via-[#0d031c]/90 to-[#120422]/90 border ${layer.border} hover:shadow-[0_0_30px_rgba(255,0,127,0.2)] transition-all duration-300 relative group overflow-hidden shadow-xl`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${layer.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`font-mono text-xs font-black ${layer.text} tracking-wider`}>
                    CHAMBER {layer.id}
                  </span>
                </div>

                <h3 className="text-lg font-syne font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                  {layer.title}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {layer.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
