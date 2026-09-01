'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, Sparkles, Smartphone, CheckCircle, ShieldCheck, Eye } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [showLiveIframe, setShowLiveIframe] = useState(false);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-navy-950/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-navy-900 border border-cyan-400/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,245,200,0.15)] z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-navy-950/60">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/5 text-white/70">
                Status: {project.status}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-syne font-extrabold text-white mb-3">
                {project.title}
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-[11px] font-mono text-white/50 block uppercase">{m.label}</span>
                    <span className="text-lg font-syne font-bold text-cyan-400 mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Badges */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2.5">
                Engineered With
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl bg-navy-950 border border-cyan-400/20 text-cyan-300 text-xs font-mono font-medium shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Interactive Preview Box or Embed */}
            {project.liveUrl && (
              <div className="border border-white/10 rounded-2xl p-4 bg-navy-950/80">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span>Live Interactive Simulator</span>
                  </div>
                  <button
                    onClick={() => setShowLiveIframe(!showLiveIframe)}
                    className="text-xs font-mono text-cyan-400 hover:underline"
                  >
                    {showLiveIframe ? 'Hide Embedded View' : 'Load Embedded Preview'}
                  </button>
                </div>

                {showLiveIframe ? (
                  <div className="w-full h-96 rounded-xl overflow-hidden border border-cyan-400/30 bg-black">
                    <iframe
                      src={project.liveUrl}
                      title={project.title}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-navy-900/50 border border-white/5 text-center flex flex-col items-center justify-center gap-2">
                    <p className="text-xs text-white/60">
                      Click below to open the live client deployment on a new tab or load embedded preview.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 border-t border-white/10 bg-navy-950/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Verified Production Artifact</span>
            </div>

            <div className="flex items-center gap-3">
              {project.downloadUrl && (
                <a
                  href={project.downloadUrl}
                  download
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4" />
                  <span>Download APK</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs shadow-[0_0_20px_rgba(0,245,200,0.3)] transition-all hover:scale-105"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
