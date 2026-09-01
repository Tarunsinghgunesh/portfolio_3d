'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { FounderBio } from '@/types';

interface FooterProps {
  bio: FounderBio;
}

export const Footer: React.FC<FooterProps> = ({ bio }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-purple-500/30 bg-[#060110]/95 pt-16 pb-12 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#16062a] border-2 border-pink-500/50 p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(255,0,127,0.3)]">
                <Image src="/logo.png" alt="TK Web Solutions" width={38} height={38} className="object-contain" />
              </div>
              <div>
                <span className="font-syne font-black text-white text-lg block">Tarun Singh</span>
                <span className="text-xs font-mono text-pink-400 font-bold block">TK Web Solutions • Bharatpur</span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm font-sans">
              Engineering high-speed web apps, native Android APKs, and cross-platform Flutter codebases with 100% transparency, clean architecture, and cinema-grade interactive 3D aesthetics.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Real Production Codebases</span>
            </div>
          </div>

          {/* Col 3: Fast Navigation */}
          <div>
            <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider mb-4 text-pink-400">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-white/70 font-medium">
              <li><Link href="#exploded" className="hover:text-pink-400 transition-colors">3D Cyber Racing Car</Link></li>
              <li><Link href="#services" className="hover:text-pink-400 transition-colors">Agency Services</Link></li>
              <li><Link href="#projects" className="hover:text-pink-400 transition-colors">Live App Ecosystem</Link></li>
              <li><Link href="#pricing" className="hover:text-pink-400 transition-colors">Cost Calculator</Link></li>
              <li><Link href="#about" className="hover:text-pink-400 transition-colors">Founder Profile</Link></li>
            </ul>
          </div>

          {/* Col 4: Featured Deliveries */}
          <div>
            <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider mb-4 text-cyan-400">
              Live Projects
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-white/70 font-medium">
              <li><a href="https://github.com/Tarunsinghgunesh/Luna-companion-period-sanctuary" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">🌸 Luna Sanctuary (Live Launch)</a></li>
              <li><a href="https://tkwebsolutions.in/app/TKWebSolutions.apk" className="hover:text-cyan-400 transition-colors">📱 TK Web Solutions APK</a></li>
              <li><a href="https://tkwebsolutions.in/app/EduPrime.apk" className="hover:text-cyan-400 transition-colors">🎓 EduPrime Learning App</a></li>
              <li><a href="https://tarunsinghgunesh.github.io/chirag-handlooms-e-commerce-/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">🛍️ Chirag Handlooms Store</a></li>
              <li><a href="https://tarunsinghgunesh.github.io/ACHIEVERSPOINT/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">🏆 Achievers Point Portal</a></li>
            </ul>
          </div>

          {/* Col 5: Verified Hub */}
          <div>
            <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider mb-4 text-amber-400">
              Connect Directly
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-white/70 font-medium">
              <li><a href="https://tkwebsolutions.in/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">tkwebsolutions.in</a></li>
              <li><a href="https://wa.me/919079368240" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">+91 90793 68240</a></li>
              <li><a href="https://github.com/Tarunsinghgunesh" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub: @Tarunsinghgunesh</a></li>
              <li><a href="https://www.instagram.com/tkwebsolutions_official" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Instagram Profile</a></li>
              <li><a href="https://t.me/TKwebsolutions_bot" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Telegram Bot</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 font-medium">
          <div>
            <span>© {new Date().getFullYear()} Tarun Singh — TK Web Solutions. All rights reserved.</span>
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500 hover:to-purple-600 text-white border border-pink-500/40 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
