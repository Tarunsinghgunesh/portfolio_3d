'use client';

import React from 'react';
import { FounderBio } from '@/types';
import { ContactForm } from '../ui/ContactForm';
import { MessageSquare, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  bio: FounderBio;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ bio }) => {
  return (
    <section id="contact" className="relative py-12 sm:py-16 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest font-semibold">Initiate Project Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-syne font-black text-white leading-tight">
            Ready to Build Your <br />
            <span className="bg-gradient-to-r from-cyan-400 via-accent-teal to-sky-400 bg-clip-text text-transparent">
              Next Flagship Product?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/60 font-sans">
            Get in touch directly with founder Tarun Singh. Quick response within 2 hours with a comprehensive roadmap and transparent quote.
          </p>
        </div>

        {/* Contact Container */}
        <ContactForm bio={bio} />
      </div>
    </section>
  );
};
