'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FounderCodingStudio } from '../ui/FounderCodingStudio';
import { Flame, MessageSquare, Download, Sparkles, Rocket, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { FounderBio } from '@/types';

interface HeroSectionProps {
  bio: FounderBio;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ bio }) => {
  return (
    <section className="relative min-h-screen pt-36 sm:pt-44 pb-16 flex flex-col justify-between overflow-hidden z-10">
      {/* Dynamic colorful glowing radiant lighting */}
      <div className="absolute top-20 left-10 w-[550px] h-[550px] bg-gradient-to-tr from-pink-500/25 to-purple-600/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Bios */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Colorful Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono shadow-[0_0_25px_rgba(255,0,127,0.25)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500" />
              </span>
              <span className="font-bold tracking-wider uppercase text-white">Built by Tarun Singh • Bharatpur, Rajasthan</span>
            </div>

            {/* Slogan */}
            <div className="text-xs sm:text-sm font-mono text-cyan-300 tracking-wider">
              — <span className="text-white font-bold">From Dreams....</span> to <em className="text-pink-400 font-semibold not-italic bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent">Digital Reality</em> —
            </div>

            {/* Main Inspiring Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-syne font-black text-white leading-[1.08] tracking-tight">
              Digital Experiences, <br />
              Built to <span className="bg-gradient-to-r from-pink-500 via-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,0,127,0.4)]">Perform.</span>
            </h1>

            {/* Sub-paragraph with Authentic Agency Identity & AI/ML */}
            <p className="text-base sm:text-lg text-white/80 max-w-xl font-normal leading-relaxed font-sans">
              <strong className="text-white font-bold">TK Web Solutions</strong> is an independent digital studio founded by <strong className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-bold">Tarun Singh</strong>. We architect next-generation websites, native Android APKs, cinema-grade 3D WebGL experiences, and AI/ML-driven digital products for ambitious businesses, coaching institutes, and schools across India.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#exploded"
                className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-syne font-black text-sm shadow-[0_0_35px_rgba(255,0,127,0.5)] hover:shadow-[0_0_50px_rgba(0,245,200,0.7)] hover:scale-105 transition-all duration-300"
              >
                <Flame className="w-4 h-4 fill-current text-yellow-300 animate-pulse" />
                <span>Explore 3D Supercar Engine</span>
              </a>

              <a
                href="https://wa.me/919079368240?text=Hi%20TK%20Web%20Solutions!%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[#1a0730]/90 hover:bg-[#250a45] border border-pink-500/40 text-white font-syne font-bold text-sm transition-all hover:scale-105 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp</span>
              </a>

              <a
                href="https://tkwebsolutions.in/app/TKWebSolutions.apk"
                download
                className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-mono transition-all hover:scale-105"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Studio APK</span>
              </a>
            </div>

            {/* Key Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div className="p-3.5 rounded-2xl bg-[#18072e]/80 border border-purple-500/30">
                <span className="text-2xl sm:text-3xl font-syne font-black text-white block">9</span>
                <span className="text-[11px] font-mono text-pink-400 uppercase tracking-wider font-bold">Live Apps & Sites</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#18072e]/80 border border-purple-500/30">
                <span className="text-2xl sm:text-3xl font-syne font-black text-cyan-400 block">5–7 Days</span>
                <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-bold">Fast Turnaround</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#18072e]/80 border border-purple-500/30">
                <span className="text-2xl sm:text-3xl font-syne font-black text-amber-400 block">100%</span>
                <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider font-bold">Real & Verified</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Founder Tarun Singh Live Coding Studio Workstation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <FounderCodingStudio />
          </motion.div>
        </div>
      </div>

      {/* ── Colorful Marquee Ticker ── */}
      <div className="w-full border-y border-pink-500/30 bg-gradient-to-r from-purple-950/90 via-black/90 to-pink-950/90 backdrop-blur-md py-3.5 mt-8 overflow-hidden shadow-lg">
        <div className="flex animate-marquee whitespace-nowrap gap-8 text-xs font-mono text-white/80 uppercase tracking-widest font-bold">
          {[
            '🌸 Luna Companion Sanctuary — Launched 1 Sep 2026 at 11:11 AM IST',
            '🏎️ Italian V12 Supercar 3D WebGL Engine',
            '⚡ Next.js 14+ Full-Stack Architecture',
            '🤖 AI & Machine Learning Integration (LM/ML)',
            '📱 Android Studio Native APKs',
            '🔥 Flutter 3.19+ Cross-Platform',
            '🛡️ Isar NoSQL 100% Private Offline Database',
            '🌐 Supabase Realtime Postgres',
            '🎯 Google Schema.org Top-Ranking SEO',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-pink-400 font-black">★</span>
              <span className="text-white hover:text-cyan-300 transition-colors">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
