'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ExplodedPartsModel } from './ExplodedPartsModel';
import { Layers, Rotate3D, Sliders, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExplodedDeviceCanvasProps {
  scrollSync?: boolean;
}

export const ExplodedDeviceCanvas: React.FC<ExplodedDeviceCanvasProps> = ({ scrollSync = true }) => {
  const [explosionProgress, setExplosionProgress] = useState(0.65);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP ScrollTrigger binding to scroll explosion
  useEffect(() => {
    if (!scrollSync || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        onUpdate: (self) => {
          // Map scroll progress to explosion range (0.1 to 1.0)
          setExplosionProgress(0.15 + self.progress * 0.85);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [scrollSync, isMounted]);

  if (!isMounted) {
    return (
      <div className="w-full h-[520px] rounded-3xl bg-navy-900/60 border border-white/10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-cyan-400">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest font-mono">Initializing 3D Mechanical Core...</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[560px] md:h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-navy-900/90 via-navy-950 to-navy-900/90 border border-cyan-400/20 shadow-[0_0_50px_rgba(0,245,200,0.08)] group">
      {/* ── TOP HUD CONTROLS ── */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-navy-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-400/30 text-xs text-white/80 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
          <span className="font-mono font-semibold tracking-wider text-cyan-400">3D EXPLODED ARCHITECTURE</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-2 rounded-xl backdrop-blur-md border text-xs transition-all duration-300 flex items-center gap-1.5 ${
              isAutoRotate
                ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(0,245,200,0.2)]'
                : 'bg-navy-900/70 border-white/10 text-white/50 hover:text-white'
            }`}
            title="Toggle Auto Orbit"
          >
            <Rotate3D className="w-4 h-4" />
            <span className="hidden sm:inline font-mono">Orbit: {isAutoRotate ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* ── 3D CANVAS ── */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 1.5, 7.5]} fov={45} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#e0f2fe" />
          <pointLight position={[-4, -3, -4]} intensity={2.0} color="#00f5c8" />
          <pointLight position={[4, -2, 3]} intensity={1.8} color="#f59e0b" />
          <pointLight position={[0, 4, 0]} intensity={2.2} color="#38bdf8" />

          <Suspense fallback={null}>
            <ExplodedPartsModel progress={explosionProgress} autoRotate={isAutoRotate} />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={4}
            maxDistance={12}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>
      </div>

      {/* ── BOTTOM INTERACTIVE SCRUBBER HUD ── */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-navy-900/85 backdrop-blur-xl p-3.5 rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-xs font-mono text-white/70 whitespace-nowrap">
            Explode Factor: <strong className="text-cyan-300 font-bold">{Math.round(explosionProgress * 100)}%</strong>
          </span>
        </div>

        {/* Range Slider */}
        <div className="flex items-center gap-3 w-full sm:w-64">
          <span className="text-[10px] font-mono text-white/40">COMPACT</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explosionProgress}
            onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
          />
          <span className="text-[10px] font-mono text-white/40">EXPANDED</span>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <button
            onClick={() => setExplosionProgress(0)}
            className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5 transition-all"
          >
            Assemble
          </button>
          <button
            onClick={() => setExplosionProgress(0.5)}
            className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5 transition-all"
          >
            Half
          </button>
          <button
            onClick={() => setExplosionProgress(1.0)}
            className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 transition-all font-semibold"
          >
            Full Explode
          </button>
        </div>
      </div>
    </div>
  );
};
