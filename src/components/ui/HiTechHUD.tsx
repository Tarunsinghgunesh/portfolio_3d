'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Cpu, ShieldCheck, Zap, Radio, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const HiTechHUD: React.FC = () => {
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(24);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateStats = () => {
      setFps(Math.floor(59 + Math.random() * 2));
      setLatency(Math.floor(20 + Math.random() * 8));
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0]);
    };

    const interval = setInterval(updateStats, 1500);
    updateStats();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden lg:flex items-center gap-3 bg-[#080114]/90 border border-pink-500/40 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-[0_0_25px_rgba(255,0,127,0.3)] text-xs font-mono">
      {/* Live System Pulse */}
      <div className="flex items-center gap-2 pr-3 border-r border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-white font-bold">SYSTEM ONLINE</span>
      </div>

      {/* FPS & Latency */}
      <div className="flex items-center gap-3 pr-3 border-r border-white/10 text-white/70">
        <span className="flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <strong className="text-cyan-300 font-bold">{fps} FPS</strong>
        </span>
        <span className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <strong className="text-yellow-300 font-bold">{latency}ms</strong>
        </span>
      </div>

      {/* Clock & Encryption */}
      <div className="flex items-center gap-2 pr-3 border-r border-white/10 text-white/60">
        <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
        <span className="text-pink-300 font-semibold">{timeStr || 'LIVE'}</span>
      </div>

      {/* Sound FX Toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="text-white/60 hover:text-cyan-300 transition-colors p-1"
        title="Toggle Audio Feedback"
      >
        {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </div>
  );
};
