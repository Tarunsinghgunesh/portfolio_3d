'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '@/types';
import { GraduationCap, Briefcase, ShoppingBag, School, Smartphone, PlaySquare, Layers, Globe, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'Briefcase': return Briefcase;
      case 'ShoppingBag': return ShoppingBag;
      case 'School': return School;
      case 'Smartphone': return Smartphone;
      case 'PlaySquare': return PlaySquare;
      case 'Layers': return Layers;
      default: return Globe;
    }
  };

  const getGradient = (idx: number) => {
    const gradients = [
      'from-pink-500 to-purple-600',
      'from-purple-500 to-indigo-600',
      'from-cyan-400 to-blue-600',
      'from-amber-400 to-orange-600',
      'from-emerald-400 to-teal-600',
      'from-rose-400 to-pink-600',
      'from-violet-400 to-fuchsia-600',
    ];
    return gradients[idx % gradients.length];
  };

  return (
    <section id="services" className="relative py-12 sm:py-16 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono shadow-sm">
              <Zap className="w-3.5 h-3.5 text-pink-400" />
              <span className="uppercase tracking-widest font-bold">Specialized Digital Capabilities</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-syne font-black text-white leading-tight">
              Services Built for <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                High-Growth Local & Global Brands
              </span>
            </h2>
          </div>

          <p className="text-sm text-white/70 max-w-md font-sans">
            Every build includes mobile-first responsiveness, schema-driven Google SEO for local dominance, ultra-fast CDN speed, and 30-day founder warranty.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl bg-gradient-to-b from-[#18072c]/90 to-[#0e031c]/90 border border-purple-500/30 hover:border-pink-500/60 p-7 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(255,0,127,0.2)] transition-all duration-300"
              >
                {/* Glowing top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${getGradient(index)} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {service.badge && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-400/50 text-amber-300 uppercase tracking-wider">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-syne font-bold text-white group-hover:text-pink-300 transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6 font-sans">
                    {service.fullDesc || service.shortDesc}
                  </p>

                  {/* Feature Bullets */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6 text-xs font-mono text-white/70">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer Price & Action */}
                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 block uppercase font-semibold">Starting Investment</span>
                    <span className="text-lg font-syne font-black text-white">{service.price}</span>
                  </div>

                  <a
                    href={`https://wa.me/919079368240?text=Hi%20Tarun,%20I%20am%20interested%20in%20the%20${encodeURIComponent(service.title)}%20package.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white transition-all duration-300 flex items-center gap-1.5 text-xs font-mono font-bold shadow-md hover:scale-105"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
