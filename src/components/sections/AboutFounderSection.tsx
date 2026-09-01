'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FounderBio } from '@/types';
import { 
  Sparkles, 
  MapPin, 
  GraduationCap, 
  Code2, 
  Cpu, 
  Brain, 
  Rocket, 
  ExternalLink,
  ChevronDown,
  Building2,
  Smartphone,
  Globe2,
  Search,
  Palette,
  Layers,
  HelpCircle,
  Quote
} from 'lucide-react';
import { InstagramIcon, TelegramIcon, GithubIcon } from '../ui/BrandIcons';

interface AboutFounderSectionProps {
  bio: FounderBio;
}

export const AboutFounderSection: React.FC<AboutFounderSectionProps> = ({ bio }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const identityCards = [
    {
      icon: '🎓',
      title: 'Education',
      desc: 'BBA — Digital Marketing',
      highlight: 'Manipal University Jaipur (Pursuing)',
    },
    {
      icon: '💻',
      title: 'Business',
      desc: 'Founder & Lead Developer',
      highlight: 'TK Web Solutions',
    },
    {
      icon: '🚀',
      title: 'Building',
      desc: 'Independent Products',
      highlight: 'LUNA (100% Free) & EduPrime',
    },
    {
      icon: '📍',
      title: 'Based In',
      desc: 'Bharatpur',
      highlight: 'Rajasthan, India',
    },
  ];

  const capabilities = [
    {
      icon: <Globe2 className="w-5 h-5 text-cyan-400" />,
      title: 'Web Engineering',
      desc: 'High-speed, SEO-ready business websites built with Next.js & Three.js with zero template bloat. 5–7 day delivery.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      title: 'Android & Flutter Apps',
      desc: 'Native Flutter & Android Studio applications with offline Isar databases, direct APK downloads, and push alerts.',
    },
    {
      icon: <Brain className="w-5 h-5 text-pink-400" />,
      title: 'AI & Machine Learning (LM/ML)',
      desc: 'Intelligent AI model integration, LLM-powered business chatbots, predictive analytics, and automated workflows.',
    },
    {
      icon: <Search className="w-5 h-5 text-amber-400" />,
      title: 'Digital Marketing & SEO',
      desc: 'Local SEO, Google Maps rank dominance, keyword mapping, conversion funnels, and structured Schema.org data.',
    },
    {
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      title: 'UI/UX & Product Design',
      desc: 'User-centered interface design, cinema-grade 3D WebGL visuals, mobile-first layouts, and empathetic user flows.',
    },
    {
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      title: 'Business Digitalization',
      desc: 'Transforming traditional institutes and stores into automated 24/7 lead-generating online powerhouses.',
    },
  ];

  const faqs = [
    {
      q: 'Who is Tarun Singh?',
      a: 'Tarun Singh is a developer, product builder, digital marketing student, and the founder of TK Web Solutions. He is currently pursuing BBA in Digital Marketing at Manipal University Jaipur and builds websites, mobile applications, and digital products from Bharatpur, Rajasthan.',
    },
    {
      q: 'What does Tarun Singh do?',
      a: 'Tarun specializes in modern website development, Android and Flutter application engineering, AI/ML systems, Google Local SEO, and building independent software products like LUNA.',
    },
    {
      q: 'What is TK Web Solutions?',
      a: 'TK Web Solutions is an independent digital studio founded by Tarun Singh that designs and builds high-performance websites, Android apps, and digital systems for businesses, coaching institutes, and schools across India.',
    },
    {
      q: 'What is Tarun Singh studying and which university does he attend?',
      a: 'Tarun Singh is currently pursuing a Bachelor of Business Administration (BBA) in Digital Marketing at Manipal University Jaipur.',
    },
    {
      q: 'What is LUNA and is it free?',
      a: 'LUNA is a privacy-first menstrual sanctuary and companion Android application created by Tarun Singh. It is 100% free forever with zero ads, zero subscriptions, and offline Isar database security.',
    },
    {
      q: 'Where is Tarun Singh based?',
      a: 'Tarun Singh is based in Bharatpur, Rajasthan, India.',
    },
  ];

  return (
    <section id="about" className="relative py-14 sm:py-20 overflow-hidden z-10">
      {/* Radiant atmospheric background glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ── 4 QUICK IDENTITY CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {identityCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-3xl bg-[#18072c]/85 border border-purple-500/30 hover:border-pink-500/50 transition-all hover:scale-[1.02] shadow-lg group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{card.icon}</div>
              <div className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold">{card.title}</div>
              <div className="text-sm font-syne font-bold text-white mt-0.5">{card.desc}</div>
              <div className="text-xs font-sans text-cyan-300/90 font-medium mt-1">{card.highlight}</div>
            </motion.div>
          ))}
        </div>

        {/* ── FOUNDER MAIN BIOGRAPHY GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Portrait & Verified Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="relative mx-auto max-w-[420px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#240a45] to-[#0f0322] border-2 border-pink-500/50 p-3 shadow-[0_0_80px_rgba(255,0,127,0.25)] group">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black">
                <Image
                  src="/founder.jpg"
                  alt="Tarun Singh — Founder, Developer and Digital Marketing Student"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0219] via-transparent to-transparent opacity-90" />

                {/* Bottom Overlay Pill on Photo */}
                <div className="absolute bottom-3 left-3 right-3 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-pink-500/40 space-y-1">
                  <span className="text-[10px] font-mono text-pink-400 block uppercase font-black tracking-wider">
                    Founder • Developer • Product Builder
                  </span>
                  <span className="text-xl font-syne font-black text-white block">
                    Tarun Singh
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bharatpur, Rajasthan, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact & Profile Strip */}
            <div className="max-w-[420px] mx-auto p-4 rounded-2xl bg-[#18072c]/90 border border-purple-500/30 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/70">Official Studio:</span>
                <a href="https://tkwebsolutions.in/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-cyan-300 font-bold flex items-center gap-1">
                  <span>tkwebsolutions.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/70">Founder Phone:</span>
                <a href="tel:+919079368240" className="text-white font-bold hover:text-cyan-300">
                  +91 90793 68240
                </a>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/70">Direct Email:</span>
                <span className="text-cyan-300 font-bold">tkwebsolution1301@gmail.com</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-4">
                <a href="https://www.instagram.com/tkwebsolutions_official" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-pink-500/20 text-white hover:text-pink-400 transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a href="https://t.me/TKwebsolutions_bot" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-white hover:text-cyan-400 transition-colors">
                  <TelegramIcon className="w-4 h-4" />
                </a>
                <a href="https://github.com/Tarunsinghgunesh" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-purple-500/20 text-white hover:text-purple-400 transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Narrative & Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span className="uppercase tracking-widest font-bold">Founder Philosophy & Background</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-syne font-black text-white leading-tight">
              A Little About <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Tarun Singh</span>
            </h2>

            {/* University & Degree Badge */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#18072c]/90 border border-purple-500/30 text-xs sm:text-sm font-mono text-white/90">
              <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0" />
              <span><strong>BBA in Digital Marketing</strong> • Manipal University Jaipur (Pursuing)</span>
            </div>

            <div className="space-y-4 text-white/80 font-sans leading-relaxed text-sm sm:text-base">
              <p>
                I'm <strong className="text-white font-bold">Tarun Singh</strong> — a self-directed web & mobile architect, digital marketing student, and the founder of <strong className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-bold">TK Web Solutions</strong>.
              </p>
              <p>
                Rather than relying on theoretical bootcamps, I learned software engineering by building real-world digital solutions for coaching institutes, schools, retail shops, and non-profits across Bharatpur and Rajasthan.
              </p>
              <p>
                Currently pursuing my <strong>BBA in Digital Marketing at Manipal University Jaipur</strong>, I combine deep technical code architecture (Next.js, Three.js, Flutter, AI/ML) with search engine visibility, user psychology, and scalable business fundamentals.
              </p>
            </div>

            {/* Inspiring Founder Quote from tarun-singh.html */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-950/60 via-purple-950/60 to-indigo-950/60 border-l-4 border-pink-500 text-pink-200 font-syne font-semibold text-sm sm:text-base shadow-lg relative">
              <Quote className="w-5 h-5 text-pink-400 mb-1 opacity-70" />
              "No matter how small your business is, you deserve a credible, high-speed digital home on the web. I make that possible."
            </div>

            {/* Direct Link to Official Profile on tkwebsolutions.in */}
            <div className="pt-2">
              <a
                href="https://tkwebsolutions.in/tarun-singh.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-syne font-bold text-xs tracking-wider shadow-md hover:scale-105 transition-all"
              >
                <span>View Official Biography on tkwebsolutions.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── WHAT I DO: 6 CORE CAPABILITIES GRID ── */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-4xl font-syne font-black text-white">
              What I <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">Do</span>
            </h3>
            <p className="text-xs sm:text-sm font-sans text-white/70">
              End-to-end capabilities spanning web engineering, mobile development, AI integration, and growth marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-3xl bg-[#18072c]/80 border border-purple-500/30 hover:border-pink-500/50 transition-all hover:scale-[1.02] shadow-lg group space-y-2.5"
              >
                <div className="p-3 rounded-2xl bg-black/50 border border-white/10 w-fit group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-base font-syne font-bold text-white">{item.title}</h4>
                <p className="text-xs font-sans text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FREQUENTLY ASKED QUESTIONS (Google AI Search Optimized) ── */}
        <div className="space-y-6 pt-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Google & AI Search Grounding</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-syne font-black text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs font-sans text-white/70">
              Verified answers for users, search engines, and AI systems.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-[#18072c]/80 border border-purple-500/30 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-white/5 transition-colors"
                  >
                    <span className="font-syne font-bold text-sm sm:text-base text-white">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-pink-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-white/80 font-sans leading-relaxed border-t border-white/5 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
