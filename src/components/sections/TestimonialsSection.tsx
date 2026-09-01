'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '@/types';
import { Star, Quote, CheckCircle2, ShieldCheck } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono">
            <Star className="w-3.5 h-3.5 fill-current text-accent-gold" />
            <span className="uppercase tracking-widest font-semibold">Client Testimonials & Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-syne font-black text-white leading-tight">
            Trusted by Leaders Across <br />
            <span className="bg-gradient-to-r from-cyan-400 to-accent-teal bg-clip-text text-transparent">
              Education, Commerce & Govt
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/60 font-sans">
            Real feedback from institute directors, school principals, business proprietors, and founders who transformed their operations with TK Web Solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-navy-900/80 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Star rating & quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-accent-gold">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-cyan-400/20 group-hover:text-cyan-400/40 transition-colors" />
                </div>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-syne font-bold text-white text-base">
                    {t.clientName}
                  </h4>
                  <span className="text-xs font-mono text-cyan-400 block">
                    {t.role} • {t.orgName}
                  </span>
                  <span className="text-[11px] font-mono text-white/40 block mt-0.5">
                    {t.location}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
