'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Cpu, Sparkles, Play, CheckCircle2, Zap, Layers, Smartphone, Flame } from 'lucide-react';

export const FounderCodingStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nextjs' | 'flutter' | 'threejs'>('nextjs');
  const [typedCode, setTypedCode] = useState('');
  const [codeIndex, setCodeIndex] = useState(0);

  const codeSnippets = {
    nextjs: `// Next.js 14 Server Architecture
export async function buildCyberEcosystem() {
  const engine = await initThreeJSRenderer();
  const db = connectSupabaseRealtime({
    cache: 'edge-revalidate',
    speed: '< 30ms'
  });
  return deployToProduction({ seo: 'Google #1 Rank' });
}`,
    flutter: `// Flutter 3.19+ Luna App Sanctuary
class LunaCoreEngine extends StateNotifier<CycleState> {
  final IsarLocalDB _isar = Isar.openEncrypted();
  
  Future<void> syncRealtimeSanctuary() async {
    await _isar.writeTxn(() => cycle.save());
    emit(CycleState.liveVerified());
  }
}`,
    threejs: `// 3D Lamborghini & Ferrari Shader Matrix
const supercarGeometry = new CarbonMonocoque();
const v12TurboEngine = new QuantumNitroCore({
  horsepower: '850 HP',
  rpm: '9,200 RPM',
  explodedLayers: 6
});
renderer.render(supercarGeometry, camera);`,
  };

  // Typing animation effect
  useEffect(() => {
    setTypedCode('');
    let charIdx = 0;
    const fullText = codeSnippets[activeTab];
    const timer = setInterval(() => {
      if (charIdx < fullText.length) {
        setTypedCode(fullText.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(timer);
      }
    }, 22);

    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto rounded-3xl bg-gradient-to-b from-[#20083c]/90 via-[#0e021c]/95 to-[#160529]/95 border-2 border-pink-500/50 backdrop-blur-2xl p-4 sm:p-5 overflow-hidden shadow-[0_0_80px_rgba(255,0,127,0.3)] flex flex-col justify-between group">
      {/* Sci-Fi Corner Brackets */}
      <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-pink-500" />
      <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-pink-500" />

      {/* ── TOP DEVELOPER BAR: Tarun Singh Live Coding ── */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          {/* Real Founder Avatar */}
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-pink-500 shadow-[0_0_15px_rgba(255,0,127,0.5)] shrink-0">
            <Image
              src="/founder.jpg"
              alt="Tarun Singh — Live Coding"
              fill
              className="object-cover object-top"
            />
            {/* Live Green Recording Dot */}
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-syne font-black text-white text-sm">Tarun Singh</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-pink-500 text-white font-bold">
                LIVE DEV
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-300 block">
              Architecting at 60 FPS • Bharatpur
            </span>
          </div>
        </div>

        {/* Live System Stats */}
        <div className="text-right hidden sm:block font-mono text-[10px] text-white/50">
          <span className="text-emerald-400 font-bold flex items-center gap-1 justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            COMPILING
          </span>
          <span>100% Zero-Lag</span>
        </div>
      </div>

      {/* ── MIDDLE CODE & WORKSPACE WINDOW ── */}
      <div className="my-3 flex-1 rounded-2xl bg-[#090114]/95 border border-purple-500/30 p-3.5 flex flex-col justify-between overflow-hidden shadow-inner relative">
        {/* Terminal Tab Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-mono text-white/50 ml-2 font-bold">
              {activeTab === 'nextjs' ? 'Architecture.tsx' : activeTab === 'flutter' ? 'LunaSanctuary.dart' : 'SupercarShader.glsl'}
            </span>
          </div>

          {/* Tab Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('nextjs')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                activeTab === 'nextjs' ? 'bg-pink-500 text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              Next.js
            </button>
            <button
              onClick={() => setActiveTab('flutter')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                activeTab === 'flutter' ? 'bg-cyan-500 text-black' : 'text-white/50 hover:text-white'
              }`}
            >
              Flutter
            </button>
            <button
              onClick={() => setActiveTab('threejs')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                activeTab === 'threejs' ? 'bg-amber-400 text-black' : 'text-white/50 hover:text-white'
              }`}
            >
              3D V12
            </button>
          </div>
        </div>

        {/* Typing Terminal Code Stream */}
        <div className="font-mono text-[11px] sm:text-xs text-cyan-300 leading-relaxed overflow-hidden whitespace-pre-wrap">
          {typedCode}
          <span className="inline-block w-2 h-4 bg-pink-400 animate-pulse ml-0.5 align-middle" />
        </div>

        {/* Interactive Run Status Pill */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/50">
          <div className="flex items-center gap-1.5 text-pink-400 font-bold">
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-current" />
            <span>Active Build: {activeTab.toUpperCase()} High-Speed Kernel</span>
          </div>
          <span className="text-emerald-400 font-bold">✓ 0 Errors</span>
        </div>
      </div>

      {/* ── BOTTOM LIVE DELIVERIES QUICK BAR ── */}
      <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
        <div className="p-2 rounded-xl bg-black/60 border border-purple-500/20 text-center">
          <span className="text-white/50 block">Built</span>
          <span className="text-white font-black text-xs">9 Live Apps</span>
        </div>
        <div className="p-2 rounded-xl bg-black/60 border border-purple-500/20 text-center">
          <span className="text-white/50 block">Luna Launch</span>
          <span className="text-pink-400 font-black text-xs">Live Today</span>
        </div>
        <div className="p-2 rounded-xl bg-black/60 border border-purple-500/20 text-center">
          <span className="text-white/50 block">Supercar Engine</span>
          <span className="text-cyan-400 font-black text-xs">3D WebGL</span>
        </div>
      </div>
    </div>
  );
};
