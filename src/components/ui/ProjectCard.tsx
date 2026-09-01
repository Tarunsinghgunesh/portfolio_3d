'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download, ArrowUpRight, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-3xl bg-gradient-to-b from-navy-900/90 to-navy-950/90 border border-white/10 hover:border-cyan-400/50 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(0,245,200,0.12)] transition-all duration-500"
    >
      {/* Background Cyber Mesh Lines */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl group-hover:bg-cyan-400/15 transition-all pointer-events-none" />

      <div>
        {/* Top Header Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
            {project.category}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-white/50">
            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Live' ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-syne font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/60 line-clamp-3 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Highlight Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-5">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono text-white/40 block uppercase">{m.label}</span>
                <span className="text-xs font-syne font-bold text-cyan-400 mt-0.5 block">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-navy-950/80 border border-white/10 text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
        <button
          onClick={() => onOpenDetails(project)}
          className="text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
        >
          <span>Architecture & Demo</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.downloadUrl && (
            <a
              href={project.downloadUrl}
              download
              title="Download APK"
              className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-colors"
            >
              <Download className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View GitHub Repository"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Live Website"
              className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
