'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectModal } from '../ui/ProjectModal';
import { Sparkles, Layers, Flame, Rocket, ExternalLink, CheckCircle2, Globe, Heart, Shield, Clock } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import confetti from 'canvas-confetti';

interface PortfolioSectionProps {
  projects: Project[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Flutter', 'Android APK', 'E-Commerce', 'Coaching', 'School', 'Govt'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const lunaProject = projects.find((p) => p.id === 'luna-sanctuary');

  const triggerLaunchCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#00f5c8', '#a855f7', '#f59e0b', '#38bdf8', '#ffffff'],
    });
  };

  return (
    <section id="projects" className="relative py-12 sm:py-16 overflow-hidden z-10">
      {/* Dynamic colorful glowing background orbs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono shadow-[0_0_20px_rgba(255,0,127,0.2)]">
            <Rocket className="w-4 h-4 text-pink-400" />
            <span className="uppercase tracking-widest font-bold">100% Real Live Production Platforms</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-syne font-black text-white leading-tight">
            Verified Live Projects & <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Mobile Applications
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 font-sans">
            Every platform below is 100% live and deployed by Tarun Singh. Click any project to open the real production website or APK.
          </p>
        </div>

        {/* ── SPECIAL LUNA APP OFFICIAL LAUNCH CELEBRATION SPOTLIGHT ── */}
        {lunaProject && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-pink-950/90 via-purple-950/95 to-indigo-950/90 border-2 border-pink-500 shadow-[0_0_70px_rgba(236,72,153,0.3)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3.5 max-w-2xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-black bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg animate-pulse flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>LAUNCHED 1 SEP 2026 • 11:11 AM IST</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-cyan-300 border border-cyan-400/30">
                    Flutter 3.19+ Cross-Platform
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    100% Free Forever
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-syne font-black text-white flex items-center gap-2">
                    <span>🌸 {lunaProject.title}</span>
                  </h3>
                  <p className="text-xs font-mono text-pink-300 italic mt-1">
                    "For You. With You. Always." — Privacy-First Sanctuary
                  </p>
                </div>

                <p className="text-sm text-white/85 leading-relaxed font-sans">
                  {lunaProject.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {lunaProject.techStack.map((tech) => (
                    <span key={tech} className="text-xs font-mono px-3 py-1 rounded-xl bg-black/60 border border-pink-400/30 text-pink-300 font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <a
                  href="https://luna-website-flame.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white font-syne font-black text-xs tracking-wider shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open Official LUNA App Website →</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={triggerLaunchCelebration}
                    className="flex-1 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-syne font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 text-pink-400 fill-current" />
                    <span>Celebrate Launch 🎉</span>
                  </button>

                  <a
                    href="https://github.com/Tarunsinghgunesh/Luna-companion-period-sanctuary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-105"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-2xl text-xs font-mono font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white shadow-[0_0_25px_rgba(255,0,127,0.5)] scale-105'
                  : 'bg-[#150727]/80 text-white/70 hover:text-white border border-purple-500/30 hover:border-pink-400/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
