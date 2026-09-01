'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import { SyncBadge } from './SyncBadge';

interface NavbarProps {
  isLiveSynced: boolean;
  lastSyncedAt: string;
  onRefreshData?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLiveSynced, lastSyncedAt, onRefreshData }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '3D Supercar', href: '#exploded' },
    { name: 'Services', href: '#services' },
    { name: 'Live Apps', href: '#projects' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Founder', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080114]/95 backdrop-blur-2xl border-b border-pink-500/30 py-3 shadow-[0_4px_30px_rgba(255,0,127,0.25)]'
          : 'bg-[#080114]/60 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="#" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-[#16062a] border-2 border-pink-500/60 p-1 flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,127,0.3)]">
            <Image
              src="/logo.png"
              alt="TK Web Solutions"
              width={38}
              height={38}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-syne font-black text-white text-base tracking-tight group-hover:text-pink-400 transition-colors">
                Tarun Singh
              </span>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black shadow-sm">
                Founder
              </span>
            </div>
            <span className="text-[10px] text-cyan-300 font-mono font-semibold block">TK Web Solutions</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-mono font-bold text-white/80 hover:text-pink-400 transition-colors relative py-1 group uppercase tracking-wider whitespace-nowrap"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right Action Area */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <SyncBadge isLiveSynced={isLiveSynced} lastSyncedAt={lastSyncedAt} onRefresh={onRefreshData} />

          <a
            href="https://wa.me/919079368240?text=Hi%20Tarun,%20I%20am%20interested%20in%20building%20a%20website%20or%20mobile%20app%20with%20TK%20Web%20Solutions."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-syne font-black text-xs tracking-wider shadow-[0_0_20px_rgba(255,0,127,0.4)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile / Tablet Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-2xl bg-[#16062a] border border-pink-500/40 text-white hover:text-pink-400"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#0a0219]/98 backdrop-blur-2xl border-b border-pink-500/40 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="mb-2">
                <SyncBadge isLiveSynced={isLiveSynced} lastSyncedAt={lastSyncedAt} onRefresh={onRefreshData} />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-white/90 hover:text-pink-400 py-2 border-b border-white/5 font-mono uppercase tracking-wider flex items-center justify-between"
                >
                  {link.name}
                  <ArrowUpRight className="w-4 h-4 text-pink-400" />
                </Link>
              ))}

              <a
                href="https://wa.me/919079368240?text=Hi%20Tarun,%20I%20am%20interested%20in%20building%20a%20website%20or%20mobile%20app%20with%20TK%20Web%20Solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-syne font-black text-sm tracking-wider shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp (+91 90793 68240)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
