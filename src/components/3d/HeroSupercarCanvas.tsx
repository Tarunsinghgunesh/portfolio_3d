'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { LamborghiniFerrariModel } from './LamborghiniFerrariModel';
import { Sparkles, Zap, Sun, Shield } from 'lucide-react';

export const HeroSupercarCanvas: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('#ff1744'); // Ferrari Rosso Corsa
  const [isHeadlightsOn, setIsHeadlightsOn] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const colorPalette = [
    { name: 'Rosso Red', hex: '#ff1744' },
    { name: 'Giallo Gold', hex: '#fbbf24' },
    { name: 'Cyber Cyan', hex: '#00f5c8' },
    { name: 'Hyper Purple', hex: '#a855f7' },
    { name: 'Stealth Black', hex: '#0f172a' },
  ];

  if (!isMounted) {
    return (
      <div className="w-full h-full min-h-[360px] md:min-h-[460px] flex items-center justify-center bg-black/40 rounded-3xl">
        <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[360px] md:min-h-[460px] relative pointer-events-auto flex flex-col justify-between">
      {/* ── 3D CANVAS ── */}
      <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[3.2, 1.8, 4.2]} fov={45} />
          <ambientLight intensity={1.0} />
          <directionalLight position={[8, 12, 8]} intensity={2.5} color="#ffffff" />
          <pointLight position={[-5, 3, -4]} intensity={4.5} color={selectedColor} />
          <pointLight position={[5, 4, 5]} intensity={3.5} color="#ffffff" />
          <pointLight position={[0, -2, 0]} intensity={2.5} color="#00f5c8" />

          <Suspense fallback={null}>
            <LamborghiniFerrariModel
              color={selectedColor}
              autoRotate={true}
              isHeadlightsOn={isHeadlightsOn}
              speed={15}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minPolarAngle={Math.PI / 6}
          />
        </Canvas>
      </div>

      {/* ── TOP BADGE ── */}
      <div className="relative z-10 flex items-center justify-between p-3 pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-pink-500/40 text-[11px] font-mono text-pink-300 font-bold flex items-center gap-1.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>V12 Supercar Architecture</span>
        </div>

        <button
          onClick={() => setIsHeadlightsOn(!isHeadlightsOn)}
          className={`pointer-events-auto p-2 rounded-xl backdrop-blur-md border text-xs transition-all ${
            isHeadlightsOn
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,245,200,0.4)]'
              : 'bg-black/60 border-white/10 text-white/50'
          }`}
          title="Toggle Headlights"
        >
          <Sun className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── BOTTOM COLOR SWITCHER HUD ── */}
      <div className="relative z-10 p-3 flex items-center justify-between gap-2 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 m-2 pointer-events-auto">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-white/60 font-bold uppercase mr-1">Paint:</span>
          {colorPalette.map((c) => (
            <button
              key={c.hex}
              onClick={() => setSelectedColor(c.hex)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedColor === c.hex ? 'scale-125 border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>

        <span className="text-[10px] font-mono text-cyan-400 font-bold hidden sm:inline">
          Drag to Orbit 360°
        </span>
      </div>
    </div>
  );
};
